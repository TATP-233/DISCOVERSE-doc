---
sidebar_position: 6
---

# 故障排除指南

本指南帮助您解决安装和使用 DISCOVERSE 时的常见问题。问题按类别组织，便于快速定位。

## 目录

- [安装问题](#安装问题)
  - [CUDA 和 PyTorch](#cuda-和-pytorch)
  - [依赖库](#依赖库)
  - [子模块](#子模块)
- [运行时问题](#运行时问题)
  - [图形和显示](#图形和显示)
  - [视频录制](#视频录制)
  - [服务器部署](#服务器部署)

---

## 安装问题

### CUDA 和 PyTorch

#### 1. CUDA/PyTorch 版本不匹配

**问题**: `diff-gaussian-rasterization` 安装失败，出现 PyTorch 和 CUDA 版本不匹配的错误信息。

**解决方案**: 为您的 CUDA 安装匹配的 PyTorch 版本：

```bash
# 对于 CUDA 11.8
pip install torch==2.2.1 torchvision==0.17.1 --index-url https://download.pytorch.org/whl/cu118
```

> **提示**: 使用 `nvcc --version` 或 `nvidia-smi` 检查您的 CUDA 版本

#### 2. 缺少 GLM 头文件

**问题**: 编译错误，缺少 `glm/glm.hpp` 头文件。

```
fatal error: glm/glm.hpp: no such file or directory
```

**解决方案**: 安装 GLM 库并更新包含路径：

```bash
# 使用 conda（推荐）
conda install -c conda-forge glm
export CPATH=$CONDA_PREFIX/include:$CPATH

# 然后重新安装 diff-gaussian-rasterization
pip install submodules/diff-gaussian-rasterization
```

### 依赖库

#### 1. Taichi 安装失败

**问题**: Taichi 安装失败或导入错误。

**解决方案**: 安装特定版本的 Taichi：

```bash
pip install taichi==1.6.0
```

#### 2. PyQt5 安装问题

**问题**: PyQt5 安装失败或 GUI 组件无法工作。

**解决方案**: 先安装系统包：

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install python3-pyqt5 python3-pyqt5-dev

# 然后通过 pip 安装
pip install PyQt5>=5.15.0
```

### 子模块

#### 1. 子模块未初始化

**问题**: 缺少子模块内容或子模块导入错误。

**解决方案**: 使用以下方法之一初始化子模块：

```bash
# 方法 1: 按需初始化（推荐）
python scripts/setup_submodules.py --list              # 检查状态
python scripts/setup_submodules.py --module lidar act  # 初始化特定模块
python scripts/setup_submodules.py --all               # 初始化所有模块

# 方法 2: 传统 Git 方法
git submodule update --init --recursive
```

---

## 运行时问题

### 图形和显示

DISCOVERSE 中的图形渲染问题通常分为三类，每类都有不同的根本原因和解决方案。

#### 1. GLX 配置错误

**问题**: GLFW/OpenGL 初始化失败，出现 GLX 错误：

```
GLFWError: (65542) b'GLX: No GLXFBConfigs returned'
GLFWError: (65545) b'GLX: Failed to find a suitable GLXFBConfig'
```

**根本原因**: X11/GLX 配置问题，通常由以下原因导致：
- 双 GPU 系统（Intel + NVIDIA）驱动冲突
- 缺少或配置错误的 X11 显示服务器
- 不兼容的 GLX 扩展

**解决方案**:

1. **对于有 NVIDIA GPU 的系统**: 检查并配置图形驱动模式（双 GPU 系统）：
   ```bash
   # 检查 EGL 供应商：
   eglinfo | grep "EGL vendor"
   
   # 如果输出包含：
   libEGL warning: egl: failed to create dri2 screen
   表示 Intel 和 NVIDIA 驱动之间存在冲突。
   
   # 检查当前驱动模式
   prime-select query
   
   # 如果输出是 `on-demand`，切换到 `nvidia` 模式，然后重启或重新登录！
   sudo prime-select nvidia
   
   # 强制使用 NVIDIA
   export __NV_PRIME_RENDER_OFFLOAD=1
   export __GLX_VENDOR_LIBRARY_NAME=nvidia
   
   # 切换后重启系统
   sudo reboot
   ```
   
2. **对于没有 NVIDIA GPU 的系统**（conda 环境）:
   
   **根本原因**: conda 环境中的 libstdc++ 版本过低，导致 GLX 兼容性问题。
   
   **解决方案 1** - 在 conda 环境中安装新版 libstdc++：
   ```bash
   conda install -c conda-forge libstdcxx-ng
   ```

   **解决方案 2** - 使用系统 libstdc++ 库：
   ```bash
   export LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libstdc++.so.6
   ```
   
3. **验证 GLX 支持**:
   ```bash
   glxinfo | grep "direct rendering"
   glxgears  # 测试基本 GLX 功能
   ```

#### 2. EGL 初始化错误

**问题**: EGL 后端初始化失败，特别是在虚拟/容器化环境中：

```
libEGL warning: MESA-LOADER: failed to open virtio_gpu: /usr/lib/dri/virtio_gpu_dri.so: cannot open shared object file
libEGL warning: MESA-LOADER: failed to open swrast: /usr/lib/dri/swrast_dri.so: cannot open shared object file
GLFWError: (65542) b'EGL: Failed to initialize EGL: EGL is not or could not be initialized'
libGL error: failed to load driver: iris
libGL error: failed to load driver: swrast
```

**根本原因**: 缺少或不兼容的 Mesa 驱动，特别是在：
- 虚拟机（VirtIO GPU 驱动问题）
- 没有适当 GPU 直通的 Docker 容器
- 驱动安装不完整的 ARM 系统
- 有冲突 OpenGL 库的 Conda 环境

**解决方案**:

1. **安装 Mesa 驱动**:
   ```bash
   # Ubuntu/Debian
   sudo apt-get update
   sudo apt-get install mesa-utils libegl1-mesa-dev libgl1-mesa-glx libgles2-mesa-dev
   
   # 对于虚拟环境，也安装
   sudo apt-get install mesa-vulkan-drivers mesa-va-drivers
   ```

2. **对于 conda 环境冲突**（类似 GLX 问题）:
   
   **根本原因**: Conda 的 OpenGL 库和 libstdc++ 版本与系统 Mesa 驱动冲突。
   
   **解决方案 1** - 修复 libstdc++ 冲突（推荐）：
   ```bash
   # 步骤 1: 在 conda 环境中安装最新 gcc
   conda install libgcc
   
   # 步骤 2: 检查重复的 libstdc++ 文件
   sudo find / -wholename "*conda*/**/libstdc++.so*"
   
   # 步骤 3: 从 conda 环境中删除冲突的 libstdc++ 文件
   # 将 'your_env_name' 替换为您的实际环境名称
   rm $CONDA_PREFIX/lib/libstdc++*
   
   # 替代方案: 如果看到重复项，删除特定的旧版本
   # rm $CONDA_PREFIX/lib/libstdc++.so.6.0.21  # 示例旧版本
   ```
   
   > **警告**: 删除 libstdc++ 文件后，您可能偶尔会在 Python 程序终止时看到 `free(): invalid pointer` 消息。这通常是无害的，但表明存在库冲突。

3. **对于 VirtIO GPU 问题**:
   ```bash
   # 安装 VirtIO GPU 驱动
   sudo apt-get install xserver-xorg-video-qxl
   
   # 或回退到软件渲染
   export LIBGL_ALWAYS_SOFTWARE=1
   ```

4. **配置 EGL 进行无头渲染**:
   ```bash
   export MUJOCO_GL=egl
   export PYOPENGL_PLATFORM=egl
   ```

#### 3. MuJoCo 特定渲染问题

**问题**: 尽管图形驱动正常工作，MuJoCo 环境仍无法正确渲染。

**根本原因**: MuJoCo 的特定渲染后端要求和与系统 OpenGL 配置的冲突。

**解决方案**:

1. **设置 MuJoCo 渲染后端**:
   ```bash
   # 对于无头服务器
   export MUJOCO_GL=egl
   
   # 对于有显示问题的桌面环境
   export MUJOCO_GL=glfw
   
   # 对于软件渲染（后备方案）
   export MUJOCO_GL=osmesa
   ```

2. **验证 MuJoCo 安装**:
   ```bash
   python -c "import mujoco; mujoco.MjModel.from_xml_string('<mujoco/>')"
   ```

### 视频录制

#### 1. FFmpeg 视频编码错误

**问题**: 任务执行期间视频录制失败，出现 FFmpeg 参数错误：

```
BrokenPipeError: [Errno 32] 断开的管道

RuntimeError: Error writing 'data/coffeecup_place/000/cam_0.mp4': Unrecognized option 'qp'.
Error splitting the argument list: Option not found
```

**根本原因**: 当 `mediapy` 库尝试使用 FFmpeg 写入 MP4 视频文件时，使用了不兼容或无法识别的编码参数。问题通常源于：
- 不支持 'qp'（质量参数）选项的过时 FFmpeg 版本
- 冲突的 FFmpeg 安装（系统 vs conda）
- FFmpeg 构建中缺少编解码器库

**解决方案**:

1. **更新 FFmpeg 到最新版本**:
   ```bash
   # 对于 conda 环境（推荐）
   conda install -c conda-forge ffmpeg
   
   # 对于系统范围安装（Ubuntu/Debian）
   sudo apt update
   sudo apt install ffmpeg
   
   # 验证安装
   ffmpeg -version
   ```

2. **对于 conda 环境冲突**:
   ```bash
   # 删除现有 FFmpeg 安装
   conda remove ffmpeg
   
   # 安装具有完整编解码器支持的最新 FFmpeg
   conda install -c conda-forge ffmpeg=6.0
   
   # 验证编解码器可用
   ffmpeg -codecs | grep h264
   ```

### 服务器部署

#### 1. 无头服务器设置

**问题**: 在没有显示器的服务器上运行 DISCOVERSE。

**解决方案**: 配置 MuJoCo 进行无头渲染：

```bash
export MUJOCO_GL=egl
```

将此添加到您的 shell 配置文件（`.bashrc`、`.zshrc`）以永久生效：

```bash
echo "export MUJOCO_GL=egl" >> ~/.bashrc
source ~/.bashrc
```

---

## 获取帮助

如果您的问题在此处未涵盖：

1. **搜索 GitHub Issues**: 检查[现有问题](https://github.com/TATP-233/DISCOVERSE/issues)是否有类似问题
2. **创建新 Issue**: 提供详细的错误信息和系统信息
3. **社区支持**: 加入我们的微信社区获得实时帮助
4. **文档**: 查看 `/doc` 目录获取详细指南

### 问题报告模板

报告问题时，请包含：

```
**系统信息:**
- 操作系统: (例如，Ubuntu 22.04)
- Python 版本: 
- CUDA 版本: 
- GPU 型号: 

**错误信息:**
[在此粘贴完整错误跟踪]

**重现步骤:**
1. 
2. 
3. 

**预期行为:**
[应该发生什么]

**附加信息:**
[任何其他相关信息]
```

---

> **注意**: 此故障排除指南会持续维护。如果您找到了此处未列出问题的解决方案，请考虑贡献以帮助其他用户。
