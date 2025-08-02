# 基础仿真概览

欢迎来到DISCOVERSE基础仿真教程！本教程将带您了解如何在DISCOVERSE中创建和运行机器人仿真。DISCOVERSE是一个基于MuJoCo物理引擎的高保真机器人仿真平台，支持高斯渲染(3D Gaussian Splatting)技术。

## 🎯 学习目标

完成本教程后，您将能够：

- 理解DISCOVERSE的配置系统和基本架构
- 创建和配置机器人仿真环境
- 使用真实的机器人模型(如AirbotPlay、MMK2)
- 配置传感器和渲染选项
- 运行基本的机器人操作任务

## 📋 前置要求

在开始之前，请确保您已经：

- ✅ 完成了[安装指南](/docs/get-started/installation)
- ✅ 运行了[第一个示例](/docs/get-started/quick-start)
- ✅ 阅读了[基本概念](/docs/get-started/basic-concepts)

## 🏗️ DISCOVERSE架构

DISCOVERSE建立在以下核心技术之上：

### MuJoCo物理引擎
- 高精度的刚体动力学仿真
- 支持接触和摩擦模拟
- 实时物理计算

### 3D高斯渲染(Gaussian Splatting)
- 高保真场景渲染
- 支持真实感视觉效果
- 可切换传统MuJoCo渲染器

### 机器人模型支持
- **AirbotPlay**: 7自由度机械臂
- **MMK2**: 双臂移动机器人
- **LeapHand**: 灵巧手
- **自定义机器人**: 支持URDF/MJCF格式

## 🔧 配置系统

DISCOVERSE使用`BaseConfig`类进行配置管理：

```python
from discoverse.utils import BaseConfig

# 创建配置
config = BaseConfig()

# 基本设置
config.mjcf_file_path = "mjcf/airbot_play_floor.xml"  # 场景文件
config.timestep = 0.005          # 物理仿真时间步长 (200Hz)
config.decimation = 2            # 控制频率下采样 (BaseConfig默认值)
config.sync = True               # 实时同步
config.headless = False          # 是否无头模式

# 渲染设置
config.render_set = {
    "fps": 24,                   # 渲染帧率 (BaseConfig默认值)
    "width": 1280,               # 图像宽度 (BaseConfig默认值)
    "height": 720,               # 图像高度 (BaseConfig默认值)
}

# 传感器设置
config.obs_rgb_cam_id = None     # RGB相机ID (默认为None，需要设置具体ID列表)
config.obs_depth_cam_id = None   # 深度相机ID (默认为None，需要设置具体ID列表)

# 高斯渲染设置
config.use_gaussian_renderer = True
config.gs_model_dict = {
    "background": "scene/lab3/point_cloud.ply",
    "object": "object/apple.ply"
}
```

## 🚀 快速开始示例

让我们基于真实的AirbotPlay任务来创建一个简单的仿真：

```python
import mujoco
import numpy as np
from discoverse.robots_env.airbot_play_base import AirbotPlayCfg
from discoverse.task_base import AirbotPlayTaskBase

# 继承任务基类
class MySimulation(AirbotPlayTaskBase):
    def __init__(self, config: AirbotPlayCfg):
        super().__init__(config)
    
    def check_success(self):
        # 定义成功条件
        return False
    
    def domain_randomization(self):
        # 域随机化(可选)
        pass

# 创建配置
cfg = AirbotPlayCfg()
cfg.mjcf_file_path = "mjcf/airbot_play_floor.xml"
cfg.timestep = 0.005  # 真实默认值
cfg.decimation = 4    # AirbotPlayCfg中的默认值
cfg.sync = True
cfg.headless = False
cfg.render_set = {
    "fps": 30,        # 真实默认值
    "width": 1280,    # 真实默认值  
    "height": 720     # 真实默认值
}

# 创建仿真实例
sim = MySimulation(cfg)

# 基本控制循环
action = np.zeros(7)  # 7自由度控制
while sim.running:
    # 执行动作 - step返回: obs, privileged_obs, reward, terminated, info
    obs, privileged_obs, reward, terminated, info = sim.step(action)
    
    # 获取关节位置
    joint_positions = sim.mj_data.qpos[:7]
    
    # 简单控制逻辑
    action[:] = joint_positions + 0.01 * np.sin(sim.mj_data.time)
    
    # 检查重置信号
    if sim.reset_sig:
        sim.reset_sig = False
        sim.reset()
```

## 📊 观察空间

DISCOVERSE提供丰富的观察数据：

### RGB图像观察
```python
# 获取RGB图像
rgb_image = sim.getRgbImg(cam_id=0)  # 返回 (H, W, 3) numpy数组
```

### 深度图像观察
```python
# 获取深度图像
depth_image = sim.getDepthImg(cam_id=0)  # 返回 (H, W) numpy数组
```

### 点云数据
```python
# 获取点云 - 注意需要先调用getObservation()
points, colors = sim.getPointCloud(cam_id=0, N_gap=5)  # 返回点云和颜色
print(f"点云形状: {points.shape}")   # (N, 3) 
print(f"颜色形状: {colors.shape}")   # (N, 3) RGB值在[0,1]范围
```

### 物体位姿
```python
# 获取物体位姿
object_pose = sim.object_pose("object_name")  # 返回位置和四元数
```

## 🎮 交互控制

DISCOVERSE支持键盘和鼠标交互：

### 基本控制
- `H`: 显示帮助信息
- `P`: 打印当前状态信息
- `R`: 重置仿真状态
- `ESC`: 切换到自由相机模式
- `]` / `[`: 切换相机视角

### 相机控制
- 鼠标左键拖拽: 旋转视角
- 鼠标右键拖拽: 平移视角
- 鼠标滚轮: 缩放

### 高斯渲染控制
- `Ctrl+G`: 切换高斯渲染显示
- `Ctrl+D`: 切换深度图显示

## 🎯 真实任务示例

DISCOVERSE提供了多个预定义的任务示例：

### AirbotPlay任务
- `pick_jujube.py`: 拾取枣子
- `place_block.py`: 放置积木
- `cover_cup.py`: 盖杯子
- `close_laptop.py`: 关闭笔记本电脑

### MMK2任务
- `box_pick.py`: 拾取盒子
- `cabinet_door_open.py`: 打开柜门
- `drawer_open.py`: 拉开抽屉

### 运行现有任务
```bash
cd discoverse/examples/tasks_airbot_play
python pick_jujube.py --use_gs  # 使用高斯渲染
```

## 📁 项目结构

DISCOVERSE的主要组件：

```
discoverse/
├── envs/           # 仿真环境核心
├── robots/         # 机器人模型和运动学
├── robots_env/     # 机器人环境基类
├── task_base/      # 任务基类
├── utils/          # 工具函数
├── examples/       # 示例任务
└── gaussian_renderer/  # 高斯渲染器
```

## 🔧 性能优化

### 提升仿真速度
```python
# 禁用可视化以提速
cfg.headless = True
cfg.sync = False

# 降低渲染分辨率
cfg.render_set = {
    "fps": 15,        # 降低渲染帧率
    "width": 320,     # 降低分辨率
    "height": 240
}

# 调整物理参数  
cfg.timestep = 0.01   # 降低物理频率 (100Hz)
```

## 📚 相关资源

- [环境设置详细指南](/docs/tutorials/basic-simulation/environment-setup)
- [机器人控制教程](/docs/tutorials/basic-simulation/robot-control)
- [立体相机使用指南](/docs/sensors/stereo-camera)
- [故障排除指南](/docs/troubleshooting)

## 🎯 下一步

准备好了吗？让我们开始第一个教程：

👉 [环境设置](/docs/tutorials/basic-simulation/environment-setup)

如果遇到问题，请查看[故障排除指南](/docs/troubleshooting)或在[GitHub Issues](https://github.com/TATP-233/DISCOVERSE/issues)中寻求帮助。 