---
sidebar_position: 4
---

# Diffusion Policy

Diffusion Policy是一种基于扩散模型的模仿学习算法。

本仓库中 dp 和 Diffusion-Policy 两个模块均实现了 Diffusion Policy 算法，但它们来自不同的代码库，可能在工程结构或具体实现细节上有所差异。

## 📊 数据格式转换

### 依赖安装

```bash
pip install -r policies/dp/requirements.txt
```

### 转换命令

将原始仿真数据转换为Diffusion Policy算法所需的Zarr格式：

```bash
python3 policies/dp/raw2zarr.py -dir data -tn <task_name>
```

- `-dir`: 数据存放的根目录，默认为data
- `-tn`: 任务名，程序将根据任务名从data目录中寻找相同名称的数据集文件夹

转换后的数据存放于`discoverse/data/zarr`文件夹中。

# dp

## 🎓 模型训练

### 训练配置

参考的训练配置文件位于`policies/dp/configs/block_place.yaml`中，其中主要参数解释如下：
- `task_path`: 推理时，程序会加载其中的`SimNode`类和实例`cfg`来创建仿真环境
- `max_episode_steps`: 推理时动作执行总步数
- `obs_keys`: 模型输入的obs名称，若有多个视角的图像，则在`image`后加上对应`cam_id`
- `shape_meta`: 输入obs的形状及类型，注意img的尺寸需要和生成的图像尺寸一致
- `action_dim`: 动作维度
- `obs_steps`: 输入`obs`时间步长
- `action_steps`: 输出`action`时间步长

训练特定任务时，可以复制一份配置文件并重命名为任务名，作为该任务特定的配置文件。

### 数据集位置

仿真采集的数据默认位于discoverse仓库根目录的data文件夹中，而训练时默认从policies/dp/data/zarr中寻找数据。因此，建议使用软连接的方式将前者链接到后者，命令如下（注意修改命令中的路径，并且需要绝对路径）：

```bash
ln -sf /absolute/path/to/discoverse/data /absolute/path/to/discoverse/policies/dp/data
```

### 训练命令

```bash
python3 policies/train.py dp --config-path=configs --config-name=block_place mode=train
```

其中:
- `--config-path`: 配置文件所在路径
- `--config-name`: 配置文件名
- `mode`: 指定训练或是推理

### 训练结果

训练结果保存在`policies/dp/logs`目录下。

## 🚀 策略推理

### 推理配置

推理配置文件与训练配置文件相同

### 推理命令

```bash
python3 policies/infer.py dp --config-path=configs --config-name=block_place mode=eval model_path=path/to/model
```

其中:
- `--config-path`: 配置文件所在路径
- `--config-name`: 配置文件名
- `mode`: 指定训练或是推理
- `model_path`: 模型权重路径

### 真机推理

```bash
python3 policies/dp/infer_real.py --config-path=configs --config-name=block_place
```

其中:
- `--config-path`: 配置文件所在路径
- `--config-name`: 配置文件名
- 需要注意，真机推理的`config.yaml`相较于`sim`中的`config.yaml`，需要增加`global_camid`和`wrist_camid`，分别指向对应的相机编号



# Diffusion-Policy

#### 安装依赖

```bash
cd policies/Diffusion-Policy
pip install -e .
cd ../..
pip install zarr==2.12.0 wandb ipdb gpustat dm_control omegaconf hydra-core==1.2.0 dill==0.3.5.1 einops==0.4.1 diffusers==0.11.1 numba==0.56.4 moviepy imageio av matplotlib termcolor
```

#### 数据集位置

```bash
cd DISCOVERSE
mkdir -p policies/Diffusion-Policy/data/
mv data/zarr/block_place.zarr policies/Diffusion-Policy/data/
```

#### 训练命令

```bash
cd policies/Diffusion-Policy
bash train.sh ${robot} ${task_name} ${gpu_id}
```

示例：
```bash
bash train.sh airbot block_place 0
bash train.sh mmk2 mmk2_pick_kiwi 0
```

配置文件: policies/Diffusion-Policy/diffusion_policy/config

#### 推理

```bash
python3 eval.py "$task_name" "$checkpoint" "$gpu_id"
```

示例：
```bash
bash eval.sh block_place note_1000 0
```

### 注意事项

1. 建议在 MMK2 任务中使用 96×72 大小的图像，并在数据生成时采用该尺寸。MMK2 的 Diffusion Policy 配置文件中，图像大小默认为 96×72，可以根据需要进行调整。
2. 配置文件中的 checkpoint_note 用于在 ckpt 文件名后附加额外的信息。通过修改该变量，可以为不同的任务配置保存具有区分度的 ckpt 文件名。 