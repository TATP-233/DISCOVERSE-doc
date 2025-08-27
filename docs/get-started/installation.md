---
id: installation
sidebar_position: 1
---

# Installation Guide

DISCOVERSE is a unified, modular open-source 3DGS robot simulation framework supporting the Real2Sim2Real learning workflow. This guide will help you install and configure DISCOVERSE on your system.

## System Requirements

### Minimum Requirements
- **Python 3.8+**
- **Operating System**: Linux (Ubuntu 18.04+), macOS, or Windows 10+
- **Memory**: At least 8GB RAM

### Recommended Configuration
- **Python 3.10**
- **CUDA 11.8+** (for 3DGS rendering)
- **NVIDIA GPU** (8GB+ VRAM recommended)
- **Git LFS** (for model file management)

## Quick Installation

### 1. Clone the Repository

```bash
git clone https://github.com/TATP-233/DISCOVERSE.git
cd DISCOVERSE
```

:::tip Recommendation
It is recommended to download submodules as needed, rather than using the `--recursive` flag to fetch all at once. This saves time and storage.
:::

### 2. Create a Virtual Environment

```bash
conda create -n discoverse python=3.10
conda activate discoverse
```

### 3. Choose Installation Method

Select the appropriate installation method based on your use case:

#### Basic Installation (Recommended for Beginners)
```bash
pip install -e .
```
**Includes**: MuJoCo, OpenCV, NumPy and other basic dependencies

#### LiDAR SLAM Research
```bash
pip install -e ".[lidar,visualization]"
```
- **Features**: High-performance LiDAR simulation with Taichi GPU acceleration
- **Dependencies**: `taichi>=1.6.0`
- **Applications**: Mobile robot SLAM, LiDAR sensor simulation, point cloud processing

#### Robotic Arm Imitation Learning
```bash
pip install -e ".[act_full]"
```
- **Features**: Imitation learning, robot skill training, policy optimization
- **Dependencies**: `torch`, `einops`, `h5py`, `transformers`, `wandb`
- **Algorithms**: Other algorithms available with `[dp_full]` or `[rdt_full]`

#### High-Fidelity Visual Simulation
```bash
pip install -e ".[gaussian-rendering]"
```
- **Features**: Realistic 3D scene rendering with real-time lighting
- **Dependencies**: `torch>=2.0.0`, `torchvision>=0.14.0`, `plyfile`, `PyGlm`
- **Applications**: High-fidelity visual simulation, 3D scene reconstruction, Real2Sim workflow

#### Full Features (Not Recommended)
```bash
pip install -e ".[full]"
```

### 4. Download Submodules

```bash
# Automatically detect and download required submodules
python scripts/setup_submodules.py

# Manually specify modules
python scripts/setup_submodules.py --module lidar act

# Download all submodules (suitable for Docker environments)
python scripts/setup_submodules.py --all
```

### 5. Verify Installation

```bash
# Basic check
python scripts/check_installation.py

# Detailed information
python scripts/check_installation.py --verbose
```

## Git LFS Setup

DISCOVERSE model files are managed through Git LFS:

### Linux Systems
```bash
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
sudo apt-get install git-lfs
git lfs install
git lfs pull
```

### macOS Systems
```bash
brew install git-lfs
git lfs install
git lfs pull
```

## Module Feature Comparison

| Module | Installation Command | Feature Description | Use Cases |
|--------|---------------------|-------------------|-----------|
| **Basic** | `pip install -e .` | Core simulation features | Learning, basic development |
| **LiDAR** | `.[lidar]` | High-performance LiDAR simulation | SLAM, navigation research |
| **Rendering** | `.[gaussian-rendering]` | 3D Gaussian Splatting rendering | Visual simulation, Real2Sim |
| **GUI** | `.[xml-editor]` | Visual scene editing | Scene design, model debugging |
| **ACT** | `.[act]` | Imitation learning algorithm | Robot skill learning |
| **Diffusion Policy** | `.[diffusion-policy]` | Diffusion model policy | Complex policy learning |
| **RDT** | `.[rdt]` | Large model policy | General robot skills |
| **Hardware Integration** | `.[hardware]` | RealSense+ROS | Real robot control |

## Docker Installation

If you prefer using Docker environment:

```bash
# Download pre-built image
# Baidu Cloud: https://pan.baidu.com/s/1mLC3Hz-m78Y6qFhurwb8VQ?pwd=xmp9

# Or build from source
git clone https://github.com/TATP-233/DISCOVERSE.git
cd DISCOVERSE
python scripts/setup_submodules.py --all
docker build -t discoverse:latest .

# Run with GPU support
docker run -it --rm --gpus all \
    -e DISPLAY=$DISPLAY \
    -v /tmp/.X11-unix:/tmp/.X11-unix \
    -v $(pwd):/workspace \
    discoverse:latest
```

## High-Fidelity Rendering Setup (Optional)

If you need 3DGS high-fidelity rendering features:

### 1. CUDA Installation
Install CUDA 11.8+ from [NVIDIA website](https://developer.nvidia.com/cuda-toolkit-archive), choosing the version compatible with your graphics driver.

### 2. Build 3DGS Dependencies
```bash
pip install -e ".[gaussian-rendering]"

cd submodules/diff-gaussian-rasterization/

# Apply patches
sed -i 's/(p_view.z <= 0.2f)/(p_view.z <= 0.01f)/' cuda_rasterizer/auxiliary.h
sed -i '361s/D += depths\[collected_id\[j\]\] \* alpha \* T;/if (depths[collected_id[j]] < 50.0f)\n        D += depths[collected_id[j]] * alpha * T;/' cuda_rasterizer/forward.cu

cd ../..
pip install submodules/diff-gaussian-rasterization
```

### 3. Download 3DGS Models

- [Baidu Cloud](https://pan.baidu.com/s/1y4NdHDU7alCEmjC1ebtR8Q?pwd=bkca)
- [Tsinghua Cloud](https://cloud.tsinghua.edu.cn/d/0b92cdaeb58e414d85cc/)

Place model files in the `models/3dgs` directory.

## Troubleshooting

If you encounter installation issues, please refer to:

1. **Dependency Conflicts**: Try creating a new virtual environment
2. **CUDA Issues**: Verify GPU driver and CUDA version compatibility
3. **Git LFS Issues**: Check network connection and LFS configuration
4. **Permission Issues**: Use `sudo` on Linux/macOS or adjust file permissions

For more detailed troubleshooting information, please refer to the project's troubleshooting documentation.

## Next Steps

After installation, you can:
- View the [Quick Start Guide](./quick-start.md) to run your first example
