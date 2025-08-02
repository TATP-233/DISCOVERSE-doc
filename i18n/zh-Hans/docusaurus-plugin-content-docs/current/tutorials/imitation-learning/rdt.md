---
sidebar_position: 5
---

# RDT (Robotics Diffusion Transformer)

RDT (Robotics Diffusion Transformer) 是一种结合扩散模型和Transformer的大模型方法，支持多任务统一建模，具有强大的泛化能力。

## 📊 数据格式转换

### 转换命令

将仿真采集的原始数据格式转换为RDT算法中用到的HDF5格式：

```bash
python3 policies/act/data_process/raw_to_hdf5.py -md mujoco -dir data -tn ${task_name} -vn ${video_names}
```

#### 转换示例

```bash
# 示例转换
python3 policies/act/data_process/raw_to_hdf5.py -md mujoco -dir data -tn block_place -vn cam_0 cam_1
```

### 数据移动

将hdf5文件移动到RDT需要的地址：

```bash
mv data/hdf5/${task_name} policies/RDT/training_data
```

#### 示例

```bash
mv data/hdf5/block_place policies/RDT/training_data
```

### 数据目录结构

将多个任务的数据都放在training_data，RDT会在一个模型中训练多个任务，目录结构为：

```bash
training_data
├── instructions
│   ├── ${task_1}.json
│   ├── ${task_2}.json
│   ├── ...
├── ${task_1}
│   ├── instructions
│   │   ├── lang_embed_0.pt
│   │   ├── ...
│   ├── episode_0.hdf5
│   ├── episode_1.hdf5
│   ├── ...
├── ${task_2}
│   ├── instructions
│   │   ├── lang_embed_0.pt
│   │   ├── ...
│   ├── episode_0.hdf5
│   ├── episode_1.hdf5
│   ├── ...
├── ...
```

## 🎓 模型训练

### GPU要求

训练至少需要25G内存（batch size = 4），推理需要0.5G内存

### 环境安装

```bash
conda create -n rdt python=3.10.0
conda activate rdt
cd DISCOVERSE
pip install -r requirements.txt
pip install -e .
pip install torch==2.1.0 torchvision==0.16.0 packaging==24.0 ninja 
pip install flash-attn==2.7.2.post1 --no-build-isolation
```

如果安装flash-attn失败，可以从官方下载对应的.whl安装: https://github.com/Dao-AILab/flash-attention/releases

```bash
# 安装flash_attn-*.whl:
pip install flash_attn-*.whl
```

```bash
cd DISCOVERSE/policies/RDT
pip install -r requirements.txt
pip install huggingface_hub==0.25.2
```

### 下载模型

```bash
cd DISCOVERSE/policies/RDT
mkdir -p weights/RDT && cd weights/RDT
huggingface-cli download google/t5-v1_1-xxl --local-dir t5-v1_1-xxl
huggingface-cli download google/siglip-so400m-patch14-384 --local-dir siglip-so400m-patch14-384
huggingface-cli download robotics-diffusion-transformer/rdt-1b --local-dir rdt-1b
```

### 生成language embedding

```bash
cd DISCOVERSE
python3 policies/RDT/scripts/encode_lang_batch_once.py ${task_name} ${gpu_id}
```

#### 示例

```bash
python3 policies/RDT/scripts/encode_lang_batch_once.py block_place 0
```

### 配置文件

复制policies/RDT/model_config/model_name.yml，并重命名model_name

### 训练微调

```bash
cd DISCOVERSE/policies/RDT
python3 scripts/encode_lang_batch_once.py {task_name} {gpu_id}
```

#### 示例

```bash
python3 scripts/encode_lang_batch_once.py block_place 0
```

## 🚀 策略推理

### 推理命令

```bash
cd DISCOVERSE/policies/RDT
bash eval.sh {robot} {task_name} {model_name} {ckpt_id}
```

#### 推理示例

```bash
bash eval.sh airbot block_place model_name 20000
``` 