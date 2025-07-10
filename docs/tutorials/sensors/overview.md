# 传感器概览

DISCOVERSE提供了丰富的传感器支持，包括RGB相机、深度相机、立体相机等。本教程将带您了解如何在DISCOVERSE中配置和使用各种传感器。

## 🎯 学习目标

- 了解DISCOVERSE支持的传感器类型
- 掌握传感器配置方法
- 学习获取传感器数据的API
- 理解立体视觉和深度感知

## 📷 支持的传感器类型

### RGB相机
提供彩色图像观察，支持多相机配置：

```python
# 配置RGB相机 (需要明确设置，默认为None)
config.obs_rgb_cam_id = [0, 1, 2]  # 相机ID列表

# 获取RGB图像
rgb_image = sim.getRgbImg(cam_id=0)  # 返回 (H, W, 3) numpy数组
```

### 深度相机
获取场景的深度信息：

```python
# 配置深度相机
config.obs_depth_cam_id = [0, 1]  # 深度相机ID列表

# 获取深度图像
depth_image = sim.getDepthImg(cam_id=0)  # 返回 (H, W) numpy数组
```

### 立体相机系统
DISCOVERSE支持高精度的立体相机模拟，用于深度感知和3D重建：

- **双目相机配置**: 模拟真实的双目相机系统
- **视差计算**: 自动计算左右图像的视差
- **深度恢复**: 从视差信息恢复3D深度
- **相机标定**: 支持内参和外参标定

## 🔧 相机配置

### 基本相机参数

在MuJoCo XML文件中定义相机参数：

```xml
<camera name="eye_side" pos="0.5 0.5 0.8" xyaxes="0 1 0 0 0 1" fovy="75"/>
<camera name="eye_front" pos="0.0 0.8 0.6" xyaxes="1 0 0 0 0 1" fovy="60"/>
```

### 渲染设置

配置图像分辨率和质量：

```python
config.render_set = {
    "fps": 20,
    "width": 1920,   # 图像宽度
    "height": 1080,  # 图像高度
}
```

### 立体相机参数

对于立体相机，可以配置基线距离和视场角：

```python
# 在camera_view.py中配置立体相机
parser.add_argument("--camera-distance", type=float, default=0.1, 
                   help="双目相机基线距离")
parser.add_argument("--fovy", type=float, default=75.0, 
                   help="相机垂直视场角")
```

## 📊 传感器数据获取

### RGB图像
```python
# 获取指定相机的RGB图像
rgb_img = sim.getRgbImg(cam_id=0)
print(f"RGB图像形状: {rgb_img.shape}")  # (H, W, 3)
print(f"数据类型: {rgb_img.dtype}")     # uint8
print(f"值范围: [0, 255]")
```

### 深度图像
```python
# 获取深度图像
depth_img = sim.getDepthImg(cam_id=0)
print(f"深度图像形状: {depth_img.shape}")  # (H, W)
print(f"深度范围: {depth_img.min():.3f} - {depth_img.max():.3f}")
```

### 点云数据
```python
# 从深度图像生成点云 - 需要先调用getObservation()
points, colors = sim.getPointCloud(cam_id=0, N_gap=5)
print(f"点云包含 {points.shape[0]} 个点")  # (N, 3)
print(f"颜色数据: {colors.shape}")        # (N, 3) RGB值在[0,1]范围

# 可视化点云(需要open3d)
import open3d as o3d
pcd = o3d.geometry.PointCloud()
pcd.points = o3d.utility.Vector3dVector(points)
pcd.colors = o3d.utility.Vector3dVector(colors)  # 添加颜色信息
o3d.visualization.draw_geometries([pcd])
```

### 相机位姿
```python
# 获取相机的位姿信息
cam_pose = sim.getCameraPose(cam_id=0)
print(f"相机位置: {cam_pose[:3]}")     # [x, y, z]
print(f"相机朝向: {cam_pose[3:]}")     # 四元数 [qw, qx, qy, qz]
```

## 👁️ 立体视觉详解

立体视觉是DISCOVERSE的重要功能，基于双目相机系统实现深度感知。

### 立体视觉原理

1. **双目成像**: 两个相机从不同角度拍摄同一场景
2. **特征匹配**: 在左右图像中找到对应点
3. **视差计算**: 计算对应点的位置差异
4. **深度恢复**: 利用三角测量原理计算3D坐标

### 使用立体相机工具

DISCOVERSE提供了专门的立体相机工具：

```bash
cd discoverse/examples/active_slam
python camera_view.py --gsply /path/to/scene.ply --show-gui
```

### 交互控制

立体相机工具(`camera_view.py`)支持丰富的交互操作：

**移动控制**:
- `W/S`: 前进/后退
- `A/D`: 左移/右移  
- `Q/E`: 上升/下降
- `Shift`: 按住加速移动

**视角控制**:
- 鼠标左键拖拽: 旋转相机视角 
- `ESC`: 切换到自由相机模式
- `]`/`[`: 切换预定义相机视角

**视角管理功能** (camera_view.py特有):
- `Space`: 保存当前相机视角到内存
- `I`: 导出所有保存的视角为JSON文件
- `H`: 显示帮助信息
- `P`: 打印当前状态信息
- `R`: 重置仿真状态

**渲染控制**:
- `Ctrl+G`: 切换高斯渲染显示
- `Ctrl+D`: 切换深度图显示

### 相机路径插值

支持平滑的相机轨迹生成：

```bash
# 保存关键帧后，生成插值轨迹
python camera_view.py --gsply scene.ply \
  --camera-pose-path camera_list.json \
  --num-interpolate 100
```

插值功能特点：
- **位置插值**: 使用三次样条插值确保平滑运动
- **旋转插值**: 使用球面线性插值(SLERP)处理姿态
- **数据导出**: 自动保存RGB图像、深度图像和相机外参

## 🔧 高级配置

### 高斯渲染集成

立体相机完全支持高斯渲染：

```python
config.use_gaussian_renderer = True
config.gs_model_dict = {
    "background": "scene/lab3/point_cloud.ply",
    "object1": "object/cup.ply",
    "object2": "object/apple.ply"
}
```

### 多相机同步

支持多相机同步采集：

```python
# 同时获取多个相机的图像
rgb_images = []
depth_images = []

for cam_id in config.obs_rgb_cam_id:
    rgb_images.append(sim.getRgbImg(cam_id))
    depth_images.append(sim.getDepthImg(cam_id))
```

## 🎯 下一步

选择您感兴趣的传感器类型深入学习：

👉 [立体相机详细指南](/docs/tutorials/sensors/stereo-camera)

或者继续其他教程：
- [模仿学习](/docs/tutorials/imitation-learning/overview) 