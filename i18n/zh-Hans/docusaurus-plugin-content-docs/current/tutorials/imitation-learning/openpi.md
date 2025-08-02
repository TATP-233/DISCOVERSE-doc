---
sidebar_position: 6
---

# OpenPI (Open-source Policy Interface)

OpenPI 是一种基于预训练模型的策略微调方法，利用预训练模型实现快速原型开发和少样本学习。

## 📊 数据格式转换

### 转换命令

将仿真采集的原始数据格式转换为pi0算法中用到的HDF5格式：

```bash
cd DISCOVERSE
python3 policies/act/data_process/raw_to_hdf5.py -md mujoco -dir data -tn ${task_name} -vn ${video_names}
```

#### 转换示例

```bash
python3 policies/act/data_process/raw_to_hdf5.py -md mujoco -dir data -tn block_place -vn cam_0 cam_1
```

### 数据移动

将hdf5文件移动到pi0需要的地址：

```bash
mv data/hdf5/${task_name} policies/openpi/training_data
cd policies/openpi/training_data/
scp instructions/${task_name}.json ${task_name}/instructions.json
cd ..
```

### 数据目录结构

将多个任务的数据都放在training_data，Pi0会在一个模型中训练多个任务，目录结构为：

```bash
training_data/  
├── instructions
│   ├── ${task_1}.json
│   ├── ${task_2}.json
│   ├── ...
├── ${task_1}
|   ├── instructions.json  
|   ├── episode_0.hdf5  
|   ├── episode_1.hdf5  
|   ├── ...  
|
├── ${task_2}
|   ├── instructions.json  
|   ├── episode_0.hdf5  
|   ├── episode_1.hdf5  
|   ├── ...  
├──...
```

## 🎓 模型训练

### 环境安装

```bash
conda create -n pi python=3.11.0
conda activate pi
cd DISCOVERSE
pip install -r requirements.txt
pip install -e .
cd policies/openpi/packages/openpi-client/
pip install -e .
cd ../..
pip install -e .
cd ../../submodules/lerobot
pip install -e .
```

### 配置文件

在`policies/openpi/src/openpi/training/config.py`中有一个名为`_CONFIGS`的字典。你可以修改预设的PI0配置项：
- `pi0_base_aloha_robotwin_lora`
- `pi0_fast_aloha_robotwin_lora`
- `pi0_base_aloha_robotwin_full`
- `pi0_fast_aloha_robotwin_full`

如果你的GPU显存不足，可以设置`fsdp_devices`，相关配置可参考`policies/openpi/src/openpi/training/config.py`。

当你需要更换机器人，或更改机器人的观测和动作时，可以修改`policies/openpi/src/openpi/training/config.py`中`_CONFIGS`下的`RepackTransform`。

### 设置缓存目录

如果你的 `~/.cache` 路径下磁盘空间不足，请使用以下命令将缓存目录设置为有足够空间的其他路径：

```bash
export HF_LEROBOT_HOME=/path/to/your/cache
```

#### 示例

```bash
mkdir -p ~/openpi_cache
export HF_LEROBOT_HOME=~/openpi_cache
```

### 处理数据

```bash
bash generate.sh ./training_data training_data
```

```bash
python3 scripts/compute_norm_stats.py --config-name ${train_config_name}
```

#### 示例

```bash
python3 scripts/compute_norm_stats.py --config-name pi0_base_aloha_full
```

### 训练微调

```bash
export HF_LEROBOT_HOME=/path/to/your/cache
```

#### 示例

```bash
export HF_LEROBOT_HOME=~/openpi_cache
```

```bash
bash finetune.sh ${train_config_name} ${model_name}
```

#### 示例

```bash
bash finetune.sh pi0_base_aloha_full model_a
```

## 🚀 策略推理

### 推理命令

```bash
bash eval.sh ${task_name} ${train_config_name} ${model_name} ${checkpoint}
```

#### 推理示例

```bash
bash eval.sh block_place pi0_base_aloha_full model_a 9999
``` 