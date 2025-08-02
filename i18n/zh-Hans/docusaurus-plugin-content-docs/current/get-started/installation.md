---
id: installation
sidebar_position: 1
---

# 安装指南

DISCOVERSE是一个统一、模块化的开源3DGS机器人仿真框架，支持Real2Sim2Real学习流程。本指南将帮助您在系统中安装和配置DISCOVERSE。

## 系统要求

### 最低要求
- **Python 3.8+**
- **操作系统**: Linux (Ubuntu 18.04+) / macOS / Windows 10+
- **内存**: 至少8GB RAM

### 推荐配置
- **Python 3.10**
- **CUDA 11.8+** (用于3DGS渲染)
- **NVIDIA GPU** (显存推荐8GB+)
- **Git LFS** (用于模型文件管理)

## 快速安装

### 1. 克隆仓库

```bash
git clone https://github.com/TATP-233/DISCOVERSE.git
cd DISCOVERSE
```

:::tip 建议
推荐按需下载submodules，避免使用`--recursive`参数一次性下载所有子模块，这样可以节省时间和存储空间。
:::

### 2. 创建虚拟环境

```bash
conda create -n discoverse python=3.10
conda activate discoverse
```

### 3. 选择安装方式

根据您的使用场景选择合适的安装方式：

#### 基础安装（推荐新手）
```bash
pip install -e .
```
**包含**: MuJoCo、OpenCV、NumPy等基础依赖

#### 激光雷达SLAM研究
```bash
pip install -e ".[lidar,visualization]"
```
- **功能**: 高性能LiDAR仿真，基于Taichi GPU加速
- **依赖**: `taichi>=1.6.0`
- **适用**: 移动机器人SLAM、激光雷达传感器仿真、点云处理

#### 机械臂模仿学习
```bash
pip install -e ".[act_full]"
```
- **功能**: 模仿学习、机器人技能训练、策略优化
- **依赖**: `torch`, `einops`, `h5py`, `transformers`, `wandb`
- **算法**: 其他算法可选择`[dp_full]`或`[rdt_full]`

#### 高保真视觉仿真
```bash
pip install -e ".[gaussian-rendering]"
```
- **功能**: 逼真的3D场景渲染，支持实时光照
- **依赖**: `torch>=2.0.0`, `torchvision>=0.14.0`, `plyfile`, `PyGlm`
- **适用**: 高保真视觉仿真、3D场景重建、Real2Sim流程

#### 完整功能（不推荐）
```bash
pip install -e ".[full]"
```

### 4. 下载子模块

```bash
# 自动检测并下载需要的子模块
python scripts/setup_submodules.py

# 手动指定模块
python scripts/setup_submodules.py --module lidar act

# 下载所有子模块（适用于Docker环境）
python scripts/setup_submodules.py --all
```

### 5. 验证安装

```bash
# 基础检查
python scripts/check_installation.py

# 详细信息
python scripts/check_installation.py --verbose
```

## Git LFS设置

DISCOVERSE的模型文件通过Git LFS进行版本管理：

### Linux系统
```bash
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
sudo apt-get install git-lfs
git lfs install
git lfs pull
```

### macOS系统
```bash
brew install git-lfs
git lfs install
git lfs pull
```

## 模块功能对照表

| 模块 | 安装命令 | 功能描述 | 适用场景 |
|------|----------|----------|----------|
| **基础** | `pip install -e .` | 核心仿真功能 | 学习、基础开发 |
| **激光雷达** | `.[lidar]` | 高性能LiDAR仿真 | SLAM、导航研究 |
| **渲染** | `.[gaussian-rendering]` | 3D高斯散射渲染 | 视觉仿真、Real2Sim |
| **GUI** | `.[xml-editor]` | 可视化场景编辑 | 场景设计、模型调试 |
| **ACT** | `.[act]` | 模仿学习算法 | 机器人技能学习 |
| **扩散策略** | `.[diffusion-policy]` | 扩散模型策略 | 复杂策略学习 |
| **RDT** | `.[rdt]` | 大模型策略 | 通用机器人技能 |
| **硬件集成** | `.[hardware]` | RealSense+ROS | 真实机器人控制 |

## Docker安装

如果您希望使用Docker环境：

```bash
# 下载预构建镜像
# 百度网盘：https://pan.baidu.com/s/1mLC3Hz-m78Y6qFhurwb8VQ?pwd=xmp9

# 或从源码构建
git clone https://github.com/TATP-233/DISCOVERSE.git
cd DISCOVERSE
python scripts/setup_submodules.py --all
docker build -t discoverse:latest .

# 使用GPU支持运行
docker run -it --rm --gpus all \
    -e DISPLAY=$DISPLAY \
    -v /tmp/.X11-unix:/tmp/.X11-unix \
    -v $(pwd):/workspace \
    discoverse:latest
```

## 高保真渲染设置（可选）

如果您需要3DGS高保真渲染功能：

### 1. CUDA安装
从[NVIDIA官网](https://developer.nvidia.com/cuda-toolkit-archive)安装CUDA 11.8+，根据显卡驱动选择对应版本。

### 2. 构建3DGS依赖
```bash
pip install -e ".[gaussian-rendering]"

cd submodules/diff-gaussian-rasterization/

# 应用补丁
sed -i 's/(p_view.z <= 0.2f)/(p_view.z <= 0.01f)/' cuda_rasterizer/auxiliary.h
sed -i '361s/D += depths\[collected_id\[j\]\] \* alpha \* T;/if (depths[collected_id[j]] < 50.0f)\n        D += depths[collected_id[j]] * alpha * T;/' cuda_rasterizer/forward.cu

cd ../..
pip install submodules/diff-gaussian-rasterization
```

### 3. 下载3DGS模型

- [百度网盘](https://pan.baidu.com/s/1y4NdHDU7alCEmjC1ebtR8Q?pwd=bkca)
- [清华云盘](https://cloud.tsinghua.edu.cn/d/0b92cdaeb58e414d85cc/)

将模型文件放置在`models/3dgs`目录下。

## 故障排除

如果遇到安装问题，请参考：

1. **依赖冲突**: 尝试创建新的虚拟环境
2. **CUDA问题**: 确认GPU驱动和CUDA版本兼容性
3. **Git LFS问题**: 检查网络连接和LFS配置
4. **权限问题**: 在Linux/macOS上使用`sudo`或调整文件权限

更多详细的故障排除信息，请参考项目的troubleshooting文档。

## 下一步

安装完成后，您可以：
- 查看[快速开始指南](./quick-start.md)运行第一个示例