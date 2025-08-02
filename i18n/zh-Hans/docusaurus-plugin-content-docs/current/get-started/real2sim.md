---
sidebar_position: 4
---

# Real2Sim资产生成

DISCOVERSE 将真实世界的采集数据、3D AIGC 和现有的 3D 资产（格式包括 3DGS (.ply)、网格 (.obj/.stl)、MJCF 物理模型 (.xml)）统一整合，支持作为交互式场景节点（对象和机器人）或背景节点（场景）使用。我们采用 [3DGS](https://github.com/graphdeco-inria/gaussian-splatting) 作为统一的视觉表示，并整合激光扫描、最先进的生成模型以及基于物理的重光照，以增强重建辐射场的几何和外观保真度。

## 安装说明
本项目在 Ubuntu 18.04+ 上测试通过。

**设置 DiffusionLight（第 3 步）和 Mesh2GS（第 5 步）的 Python 环境：**
```bash
conda create -n mesh2gs python=3.10
conda activate mesh2gs
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118 # replace your cuda version
```
请手动安装`requirements.txt`中描述的其他依赖项。

**要设置 TRELLIS 的 Python 环境（步骤 1）**，我们建议按照[官方指南](https://github.com/microsoft/TRELLIS)创建一个*新的*、*独立的*环境，以避免冲突。

**此外，请安装 [Blender](https://www.blender.org/)（推荐版本：3.1.2）以用于步骤 4。** 我们强烈建议在 Blender 可执行程序的 `Scripting` 面板中运行相关脚本（`blender_renderer/glb_render.py` 和 `blender_renderer/obj_render.py`）。我们*不*推荐使用 [Blender Python API (bpy)](https://docs.blender.org/api/current/info_advanced_blender_as_bpy.html)，因为可能会出现版本不匹配的问题。

## 步骤 1：使用 [TRELLIS](https://github.com/microsoft/TRELLIS) 进行图像到 3D 的生成
*将单张 RGB 图像生成高质量纹理网格，并作为对象级交互式场景节点使用。*

**首先，采集一张目标物体的 RGB 图像。** 物体应位于图像中央，且不应过小（覆盖面积大于 50% 像素）。注意，该物体*不需要*在模拟场景中被拍摄，我们只需要尽可能保持背景*干净*（便于实例分割），并使环境光为白色、均匀且明亮。

**然后，使用最先进的图像到 3D 生成方法，从采集的 RGB 图像中重建纹理网格。**

- [TRELLIS](https://github.com/microsoft/TRELLIS) 是最新的、开源的、最先进的 3D 生成模型，可以生成高质量的纹理网格、3DGS 或辐射场。我们建议为 TRELLIS 设置一个新的环境，并按照[官方指南](https://github.com/microsoft/TRELLIS)运行图像到 3D 的生成流程。建议将纹理网格以 `.glb` 格式保存，以兼容后续的光照估计、Blender 重光照和 Mesh2GS 步骤。**注意：为了快速设置，如果您*不需要*对齐物体与背景的外观，可直接生成用于 DISCOVERSE 的 3DGS (`.ply`) 资产，跳过步骤 3~5。**

- 若希望获得更高质量的 3D 生成结果，推荐使用一些商业软件，如 [Deemos Rodin](https://hyper3d.ai/)（[CLAY](https://arxiv.org/abs/2406.13897)）、[Meshy](https://www.meshy.ai/)、[TRIPO](https://www.tripo3d.ai/) 等。它们都提供免费试用。

## 步骤 2：3D 场景重建
*使用扫描仪或多视角 RGB 图像重建背景节点为 3DGS 场。*

我们推荐使用 [LixelKity K1 扫描仪](https://www.xgrids.cn/lixelk1) 和 [Lixel CyberColor](https://www.xgrids.cn/lcc) 来生成高质量的 3DGS 场，用作背景节点。在没有扫描仪的情况下，也可以使用[原始 3DGS](https://github.com/graphdeco-inria/gaussian-splatting)进行场景重建。

## 步骤 3：使用 [DiffusionLight](https://github.com/DiffusionLight/DiffusionLight) 进行光照估计
*从单张 RGB 图像估计 HDR 环境光图，为第 4 步（即物体外观与背景节点对齐）做准备。*

**注意：**如果您*不需要*对齐物体与背景的外观，可以直接从 [PolyHeaven](https://polyhaven.com/hdris) 下载任意 `.exr` 格式的 HDR 环境图，跳过以下流程，直接进入步骤 4。

### Huggingface 模型的预训练权重


**首先，准备输入图像。** 为每个目标背景采集一张 RGB 图像，并将图像尺寸调整为 **1024x1024**。为此，我们建议*裁剪*图像以包含尽可能多的背景信息。或者，也可以通过在图像周围*填充黑边*来达到该尺寸。

将所有处理后的图像放入一个文件夹中，并将该文件夹的绝对路径设为 `YourInputPath`，同时指定 `YourOutputPath` 作为保存结果的文件夹。然后运行以下命令：
```bash
cd DiffusionLight

python inpaint.py --dataset YourInputPath --output_dir YourOutputPath

python ball2envmap.py --ball_dir YourOutputPath/square --envmap_dir YourOutputPath/envmap

python exposure2hdr.py --input_dir YourOutputPath/envmap --output_dir YourOutputPath/hdr
```
最终的 `.exr` 结果（保存在 `YourOutputPath/hdr/` 中）将用于后续的 Blender PBR 渲染。


## 步骤 4：使用 Blender 进行基于物理的重光照（Physically-Based Relighting）
*通过在球面上均匀采样相机，并使用 Blender（bpy）结合自定义 HDR 环境图（模拟远程光照效果）进行（预）基于物理的重光照，将目标物体的网格渲染为多视角图像，以用于 3DGS 优化。*

请注意，这并*不是*真正意义上的 PBR 功能，它只是将光照效果烘焙到 3DGS 的 SH 外观中，从而模拟背景场景的色调。

### 准备 `.exr` HDR 环境图
将用于（预）PBR 的所有 HDR 图像整理到一个文件夹中，例如：
```
YourHDRPath                          
├── hdr_name_0.exr
├── hdr_name_1.exr
├── hdr_name_2.exr
...
└── hdr_name_n.exr
```


### 渲染 3D 网格资产

#### 对于 `.glb` 资产（例如 Objaverse / Rodin 资产）
我们强烈推荐使用类似于 [objaverse](https://github.com/allenai/objaverse-xl) 的 `.glb` 格式的 3D 网格资产。所有待转换的 `.glb` 资产应集中放置在同一文件夹中，例如：
```
YourInputPath                          
├── model_or_part_name_0.glb
├── model_or_part_name_1.glb
├── model_or_part_name_2.glb
...
└── model_or_part_name_n.glb
```

然后，在 **Blender 可执行程序的 `Scripting` 面板** 中粘贴并运行 `blender_renderer/glb_render.py` 脚本，并传入以下参数：
```bash
--root_in_path YourInputPath 
--root_hdr_path YourHDRPath 
--root_out_path YourOutputPath
```
<!-- ```bash
python blender_renderer/glb_render.py --root_in_path YourInputPath --root_hdr_path YourHDRPath --root_out_path YourOutputPath
``` -->
渲染结果将保存在 `YourOutputPath` 中，其中的每个文件夹（命名为 \{hdr_name_i\}_\{model_or_part_name_i\}）对应一个 3D 模型在某个光照条件下的渲染结果，并包含该模型的 RGB 图像、深度图、相机参数以及 `.obj` 几何文件。

如果渲染效果不理想，可以通过调整以下参数来优化：

- `lit_strength`：环境光照强度，数值越大渲染越亮。
- `lens`：相机的焦距。如果渲染中物体过小，即图像中有太多像素被浪费，可以尝试增大该值。反之，如果渲染中仅显示了物体的一部分，则尝试减小该值。
#### 对于 `.obj` 资产（例如机器人模型）
如果您处理的是 `.obj` 格式的资产，例如机器人模型，每个模型通常会包含多个纹理和材质贴图，建议将每个模型的数据分别组织到独立的文件夹中，格式如下：
```
YourInputPath                          
├── model_or_part_name_0
│   └── ...                
├── model_or_part_name_1            
│   ├── obj_name_1.obj       
│   ├── mtl_name_1.mtl       
│   ├── tex_name_1.png       
│   └── ...                
├── model_or_part_name_2
...
└── model_or_part_name_n
```
由 DISCOVER LAB 开发的机器人模型，包括 MMK2、AirBot、DJI、RM2 等，可以通过此 [链接](https://pan.baidu.com/s/1BW0GoDFmd0mPz9QItuJs7A) 获取（提取码：94po）。

然后，在 **Blender 可执行程序的 `Scripting` 面板** 中粘贴并运行 `blender_renderer/obj_render.py` 脚本，并传入以下参数：
```bash
--root_in_path YourInputPath 
--root_hdr_path YourHDRPath 
--root_out_path YourOutputPath
```
<!-- Then, render by:
```bash
python blender_renderer/obj_render.py --root_in_path YourInputPath --root_hdr_path YourHDRPath --root_out_path YourOutputPath
``` -->
该脚本的参数与 `blender_renderer/glb_render.py` 相同。
将 Blender 渲染生成的相机参数转换为 COLMAP 所需格式，运行以下命令：
```bash
cd blender_renderer
python models2colmap.py --root_path YourOutputPath
```
请确保在运行 `obj_render.py` / `glb_render.py` 和 `models2colmap.py` 时，**相机内参（即 `--resolution`、`--lens`、`--sensor_size`）严格保持一致**。

## 步骤 5：Mesh2GS
*将纹理网格转换为 3DGS。*

对每个 3D 资产逐个运行 Mesh2GS：
```bash
cd LitMesh2GS
python train.py -s YourOutputPath/model_or_part_name_i -m YourOutputPath/model_or_part_name_i/mesh2gs --data_device cuda --densify_grad_threshold 0.0002 -r 1
```
每个 3D 资产转换得到的 3DGS 结果将保存在 `YourOutputPath/model_or_part_name_i` 下的新文件夹 `mesh2gs` 中。

由于 3DGS 本质上内存效率较低，我们建议通过指定 `--densification_interval` 来大致控制生成的 3DGS 点的数量。该值越大，生成的 3DGS 场越稀疏，所需内存越少。
