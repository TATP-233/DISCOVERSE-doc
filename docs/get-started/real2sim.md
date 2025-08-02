---
sidebar_position: 4
---

# Real2Sim Asset Generation

DISCOVERSE integrates real-world acquired data, 3D AIGC, and existing 3D assets (including formats such as 3DGS (.ply), meshes (.obj/.stl), and MJCF physics models (.xml)) in a unified manner, supporting their use as interactive scene nodes (objects and robots) or background nodes (scenes). We adopt [3DGS](https://github.com/graphdeco-inria/gaussian-splatting) as the unified visual representation and integrate laser scanning, state-of-the-art generative models, and physics-based relighting to enhance the geometric and appearance fidelity of reconstructed radiance fields.

## Installation Instructions
This project has been tested on Ubuntu 18.04+.

**Setting up the Python environment for DiffusionLight (Step 3) and Mesh2GS (Step 5):**
```bash
conda create -n mesh2gs python=3.10
conda activate mesh2gs
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118 # replace your cuda version
```
Please manually install other dependencies described in `requirements.txt`.

**To set up the Python environment for TRELLIS (Step 1)**, we recommend following the [official guide](https://github.com/microsoft/TRELLIS) to create a *new*, *separate* environment to avoid conflicts.

**Additionally, please install [Blender](https://www.blender.org/) (recommended version: 3.1.2) for Step 4.** We strongly recommend running the related scripts (`blender_renderer/glb_render.py` and `blender_renderer/obj_render.py`) in the `Scripting` panel of the Blender executable. We do *not* recommend using the [Blender Python API (bpy)](https://docs.blender.org/api/current/info_advanced_blender_as_bpy.html) due to potential version mismatch issues.

## Step 1: Image-to-3D Generation using [TRELLIS](https://github.com/microsoft/TRELLIS)
*Generate high-quality textured meshes from a single RGB image for use as object-level interactive scene nodes.*

**First, capture an RGB image of the target object.** The object should be centered in the image and should not be too small (covering more than 50% of pixels). Note that the object does *not need* to be photographed in the simulation scene; we just need to keep the background as *clean* as possible (for instance segmentation) and ensure the ambient lighting is white, uniform, and bright.

**Then, use state-of-the-art image-to-3D generation methods to reconstruct textured meshes from the captured RGB images.**

- [TRELLIS](https://github.com/microsoft/TRELLIS) is the latest, open-source, state-of-the-art 3D generative model that can generate high-quality textured meshes, 3DGS, or radiance fields. We recommend setting up a new environment for TRELLIS and following the [official guide](https://github.com/microsoft/TRELLIS) to run the image-to-3D generation pipeline. It's recommended to save textured meshes in `.glb` format for compatibility with subsequent lighting estimation, Blender relighting, and Mesh2GS steps. **Note: For quick setup, if you do *not need* to align object appearance with the background, you can directly generate 3DGS (`.ply`) assets for DISCOVERSE and skip steps 3~5.**

- For higher quality 3D generation results, we recommend using commercial software such as [Deemos Rodin](https://hyper3d.ai/) ([CLAY](https://arxiv.org/abs/2406.13897)), [Meshy](https://www.meshy.ai/), [TRIPO](https://www.tripo3d.ai/), etc. They all offer free trials.

## Step 2: 3D Scene Reconstruction
*Reconstruct background nodes as 3DGS scenes using scanners or multi-view RGB images.*

We recommend using the [LixelKity K1 scanner](https://www.xgrids.cn/lixelk1) and [Lixel CyberColor](https://www.xgrids.cn/lcc) to generate high-quality 3DGS scenes for use as background nodes. Without a scanner, you can also use the [original 3DGS](https://github.com/graphdeco-inria/gaussian-splatting) for scene reconstruction.

## Step 3: Lighting Estimation using [DiffusionLight](https://github.com/DiffusionLight/DiffusionLight)
*Estimate HDR environment lighting maps from a single RGB image to prepare for Step 4 (aligning object appearance with background nodes).*

**Note:** If you do *not need* to align object appearance with the background, you can directly download any `.exr` format HDR environment map from [PolyHeaven](https://polyhaven.com/hdris), skip the following process, and proceed directly to Step 4.

### Pre-trained Weights for Huggingface Models

**First, prepare input images.** Capture an RGB image for each target background and resize the image to **1024x1024**. For this, we recommend *cropping* the image to include as much background information as possible. Alternatively, you can achieve this dimension by *padding black borders* around the image.

Place all processed images in a folder and set the absolute path of that folder as `YourInputPath`, while specifying `YourOutputPath` as the folder to save results. Then run the following commands:

```bash
cd DiffusionLight

python inpaint.py --dataset YourInputPath --output_dir YourOutputPath

python ball2envmap.py --ball_dir YourOutputPath/square --envmap_dir YourOutputPath/envmap

python exposure2hdr.py --input_dir YourOutputPath/envmap --output_dir YourOutputPath/hdr
```
The final `.exr` results (saved in `YourOutputPath/hdr/`) will be used for subsequent Blender PBR rendering.

## Step 4: Physics-Based Relighting using Blender
*Render target object meshes into multi-view images by uniformly sampling cameras on a sphere and using Blender (bpy) combined with custom HDR environment maps (simulating distant lighting effects) for (pre-)physics-based relighting, for use in 3DGS optimization.*

Please note that this is *not* true PBR functionality; it simply bakes lighting effects into the SH appearance of 3DGS to simulate the color tone of background scenes.

### Prepare `.exr` HDR Environment Maps
Organize all HDR images to be used for (pre-)PBR into one folder, for example:
```
YourHDRPath                          
├── hdr_name_0.exr
├── hdr_name_1.exr
├── hdr_name_2.exr
...
└── hdr_name_n.exr
```

### Render 3D Mesh Assets

#### For `.glb` Assets (e.g., Objaverse / Rodin Assets)
We strongly recommend using 3D mesh assets in `.glb` format similar to [objaverse](https://github.com/allenai/objaverse-xl). All `.glb` assets to be converted should be placed in the same folder, for example:
```
YourInputPath                          
├── model_or_part_name_0.glb
├── model_or_part_name_1.glb
├── model_or_part_name_2.glb
...
└── model_or_part_name_n.glb
```

Then, paste and run the `blender_renderer/glb_render.py` script in the **`Scripting` panel of the Blender executable** with the following parameters:
```bash
--root_in_path YourInputPath 
--root_hdr_path YourHDRPath 
--root_out_path YourOutputPath
```

The rendering results will be saved in `YourOutputPath`, where each folder (named `{hdr_name_i}_{model_or_part_name_i}`) corresponds to the rendering results of a 3D model under certain lighting conditions, containing RGB images, depth maps, camera parameters, and `.obj` geometry files of that model.

If the rendering quality is unsatisfactory, you can optimize by adjusting the following parameters:

- `lit_strength`: Environment lighting intensity; higher values result in brighter rendering.
- `lens`: Camera focal length. If the object is too small in the rendering (too many pixels are wasted in the image), try increasing this value. Conversely, if only part of the object is shown in the rendering, try decreasing this value.

#### For `.obj` Assets (e.g., Robot Models)
If you're working with `.obj` format assets, such as robot models, each model typically contains multiple textures and material maps. It's recommended to organize each model's data into separate folders as follows:
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
Robot models developed by DISCOVER LAB, including MMK2, AirBot, DJI, RM2, etc., can be obtained through this [link](https://pan.baidu.com/s/1BW0GoDFmd0mPz9QItuJs7A) (extraction code: 94po).

Then, paste and run the `blender_renderer/obj_render.py` script in the **`Scripting` panel of the Blender executable** with the following parameters:
```bash
--root_in_path YourInputPath 
--root_hdr_path YourHDRPath 
--root_out_path YourOutputPath
```

This script uses the same parameters as `blender_renderer/glb_render.py`.

Convert the camera parameters generated by Blender rendering to the format required by COLMAP by running:
```bash
cd blender_renderer
python models2colmap.py --root_path YourOutputPath
```
Ensure that when running `obj_render.py` / `glb_render.py` and `models2colmap.py`, the **camera intrinsics (i.e., `--resolution`, `--lens`, `--sensor_size`) remain strictly consistent**.

## Step 5: Mesh2GS
*Convert textured meshes to 3DGS.*

Run Mesh2GS for each 3D asset individually:
```bash
cd LitMesh2GS
python train.py -s YourOutputPath/model_or_part_name_i -m YourOutputPath/model_or_part_name_i/mesh2gs --data_device cuda --densify_grad_threshold 0.0002 -r 1
```
The 3DGS results converted from each 3D asset will be saved in a new folder `mesh2gs` under `YourOutputPath/model_or_part_name_i`.

Since 3DGS is inherently memory-inefficient, we recommend roughly controlling the number of generated 3DGS points by specifying `--densification_interval`. The larger this value, the sparser the generated 3DGS scene and the less memory required.
