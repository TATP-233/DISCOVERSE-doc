# 环境设置

本教程将详细介绍如何配置DISCOVERSE仿真环境，包括各种设置选项、性能优化和故障排除。

## 🎯 学习目标

- 理解DISCOVERSE环境配置系统
- 掌握不同的渲染模式和设置
- 学习性能优化技巧
- 配置多GPU和并行仿真

## 🔧 基础环境配置

### 创建基础环境

```python
import discoverse as dv

# 最简单的环境创建
env = dv.make_env("airbot_play")

# 带参数的环境创建
env = dv.make_env(
    robot_name="airbot_play",           # 机器人类型
    scene_name="table_top",             # 场景名称
    obs_mode="rgb",                     # 观察模式
    control_mode="pd_joint_pos",        # 控制模式
    render_mode="human"                 # 渲染模式
)
```

### 环境配置参数详解

| 参数 | 类型 | 默认值 | 说明 |
|------|------|-------|------|
| `robot_name` | str | `"airbot_play"` | 机器人模型名称 |
| `scene_name` | str | `"table_top"` | 仿真场景名称 |
| `obs_mode` | str | `"state"` | 观察模式: `state`, `rgb`, `rgbd`, `pointcloud` |
| `control_mode` | str | `"pd_joint_pos"` | 控制模式 |
| `render_mode` | str | `"human"` | 渲染模式: `human`, `rgb_array`, `none` |
| `render_width` | int | `512` | 渲染图像宽度 |
| `render_height` | int | `512` | 渲染图像高度 |

## 📊 观察模式配置

### 状态观察 (state)
获取机器人的关节状态和传感器数据：

```python
env = dv.make_env("airbot_play", obs_mode="state")
obs = env.reset()

print("观察空间包含:")
for key, value in obs.items():
    print(f"  {key}: {value.shape if hasattr(value, 'shape') else type(value)}")

# 输出示例:
# qpos: (7,)          # 关节位置
# qvel: (7,)          # 关节速度  
# ee_pose: (7,)       # 末端执行器位姿
# gripper_qpos: (2,)  # 夹爪位置
```

### RGB观察模式
获取RGB图像观察：

```python
env = dv.make_env(
    "airbot_play", 
    obs_mode="rgb",
    render_width=256,
    render_height=256
)

obs = env.reset()
rgb_image = obs["image"]  # Shape: (256, 256, 3)

# 可视化图像
import matplotlib.pyplot as plt
plt.imshow(rgb_image)
plt.title("机器人视角")
plt.show()
```

### 深度观察模式 (rgbd)
同时获取RGB和深度信息：

```python
env = dv.make_env("airbot_play", obs_mode="rgbd")
obs = env.reset()

rgb_image = obs["image"]     # RGB图像
depth_image = obs["depth"]   # 深度图像

print(f"RGB shape: {rgb_image.shape}")      # (H, W, 3)
print(f"Depth shape: {depth_image.shape}")  # (H, W, 1)
print(f"深度范围: {depth_image.min():.3f} - {depth_image.max():.3f}")
```

### 点云观察模式
获取3D点云数据：

```python
env = dv.make_env("airbot_play", obs_mode="pointcloud")
obs = env.reset()

pointcloud = obs["pointcloud"]  # Shape: (N, 3) or (N, 6) with colors
print(f"点云包含 {pointcloud.shape[0]} 个点")

# 可视化点云
import open3d as o3d
pcd = o3d.geometry.PointCloud()
pcd.points = o3d.utility.Vector3dVector(pointcloud[:, :3])
o3d.visualization.draw_geometries([pcd])
```

## 🎮 控制模式配置

### 关节位置控制
直接控制关节目标位置：

```python
env = dv.make_env("airbot_play", control_mode="pd_joint_pos")

# 动作空间是关节角度
action = [0.0, -0.5, 0.0, 1.0, 0.0, 0.5, 0.0]  # 7个关节角度
obs, reward, done, info = env.step(action)
```

### 关节增量控制
控制关节位置的增量变化：

```python
env = dv.make_env("airbot_play", control_mode="pd_joint_delta_pos")

# 动作空间是关节角度增量
delta_action = [0.01, 0.0, -0.01, 0.0, 0.0, 0.0, 0.0]  # 小的增量
obs, reward, done, info = env.step(delta_action)
```

### 末端执行器控制
直接控制末端执行器的位姿：

```python
env = dv.make_env("airbot_play", control_mode="pd_ee_pose")

# 动作空间: [x, y, z, qx, qy, qz, qw] (位置 + 四元数)
target_pose = [0.5, 0.0, 0.3, 0.0, 0.0, 0.0, 1.0]
obs, reward, done, info = env.step(target_pose)
```

## 🖥️ 渲染配置

### 人工渲染模式
实时显示仿真窗口：

```python
env = dv.make_env("airbot_play", render_mode="human")

for i in range(100):
    action = env.action_space.sample()
    obs, reward, done, info = env.step(action)
    env.render()  # 显示仿真窗口
    
    if done:
        env.reset()
```

### 图像数组模式
将渲染结果作为numpy数组返回：

```python
env = dv.make_env(
    "airbot_play", 
    render_mode="rgb_array",
    render_width=512,
    render_height=512
)

for i in range(100):
    action = env.action_space.sample()
    obs, reward, done, info = env.step(action)
    
    # 获取渲染图像
    image = env.render()  # 返回 (512, 512, 3) 数组
    
    # 保存图像
    if i % 10 == 0:
        from PIL import Image
        Image.fromarray(image).save(f"frame_{i:03d}.png")
```

### 无渲染模式
最高性能，不进行任何渲染：

```python
env = dv.make_env("airbot_play", render_mode="none")
# 适用于大量并行训练，显著提升速度
```

## ⚡ 性能优化

### GPU加速渲染

```python
import discoverse as dv

# 启用GPU渲染
env = dv.make_env(
    "airbot_play",
    render_mode="rgb_array",
    device="cuda:0",    # 指定GPU设备
    use_gpu_render=True # 启用GPU渲染
)

# 检查GPU可用性
if env.is_gpu_available():
    print("GPU渲染已启用")
else:
    print("回退到CPU渲染")
```

### 并行环境

```python
# 创建并行环境向量
envs = dv.make_vec_env(
    "airbot_play",
    num_envs=8,         # 并行环境数量
    obs_mode="rgb",
    render_mode="none"  # 并行时通常不渲染
)

# 并行执行
obs = envs.reset()
for step in range(1000):
    actions = [envs.action_space.sample() for _ in range(8)]
    obs, rewards, dones, infos = envs.step(actions)
    
    # 自动重置完成的环境
    for i, done in enumerate(dones):
        if done:
            print(f"环境 {i} 完成任务")

envs.close()
```

### 内存优化

```python
# 优化内存使用
env = dv.make_env(
    "airbot_play",
    obs_mode="rgb",
    render_width=128,      # 降低渲染分辨率
    render_height=128,
    max_episode_steps=200, # 限制episode长度
    frame_skip=4,          # 跳帧以提升速度
    disable_env_checker=True # 在生产环境中禁用检查
)
```

## 📁 配置文件管理

### YAML配置文件
创建可重用的配置文件：

```yaml
# config/airbot_training.yaml
robot_name: "airbot_play"
scene_name: "table_top"
obs_mode: "rgbd"
control_mode: "pd_joint_pos"
render_mode: "none"

# 渲染设置
render_width: 256
render_height: 256

# 性能设置
device: "cuda:0"
num_parallel: 16
frame_skip: 2

# 任务设置
max_episode_steps: 500
reward_type: "dense"
```

```python
# 使用配置文件
import yaml

with open("config/airbot_training.yaml", "r") as f:
    config = yaml.safe_load(f)

env = dv.make_env(**config)
```

### 环境变量配置

```bash
# 设置环境变量
export DISCOVERSE_GPU_ID=0
export DISCOVERSE_RENDER_WIDTH=512
export DISCOVERSE_RENDER_HEIGHT=512
export DISCOVERSE_NUM_THREADS=8
```

```python
import os
import discoverse as dv

# 自动读取环境变量
env = dv.make_env(
    "airbot_play",
    device=f"cuda:{os.getenv('DISCOVERSE_GPU_ID', '0')}",
    render_width=int(os.getenv('DISCOVERSE_RENDER_WIDTH', '512')),
    render_height=int(os.getenv('DISCOVERSE_RENDER_HEIGHT', '512'))
)
```

## 🔍 调试和监控

### 环境信息检查

```python
env = dv.make_env("airbot_play")

# 打印环境信息
print("=== 环境信息 ===")
print(f"观察空间: {env.observation_space}")
print(f"动作空间: {env.action_space}")
print(f"奖励范围: {env.reward_range}")
print(f"最大episode步数: {env.max_episode_steps}")

# 检查规格
print("\n=== 环境规格 ===")
print(f"机器人DOF: {env.robot_dof}")
print(f"控制频率: {env.control_freq} Hz")
print(f"物理仿真频率: {env.sim_freq} Hz")
```

### 性能监控

```python
import time
import numpy as np

env = dv.make_env("airbot_play", render_mode="none")

# 性能基准测试
num_steps = 1000
start_time = time.time()

obs = env.reset()
for step in range(num_steps):
    action = env.action_space.sample()
    obs, reward, done, info = env.step(action)
    
    if done:
        obs = env.reset()

end_time = time.time()
fps = num_steps / (end_time - start_time)
print(f"仿真性能: {fps:.1f} FPS")
```

## ❗ 常见问题排除

### GPU内存不足

```python
# 方案1: 降低渲染分辨率
env = dv.make_env(
    "airbot_play",
    render_width=128,
    render_height=128
)

# 方案2: 减少并行环境数量
envs = dv.make_vec_env("airbot_play", num_envs=4)  # 而不是16

# 方案3: 使用CPU渲染
env = dv.make_env("airbot_play", device="cpu")
```

### 仿真速度慢

```python
# 禁用实时渲染
env = dv.make_env("airbot_play", render_mode="none")

# 增加跳帧
env = dv.make_env("airbot_play", frame_skip=4)

# 简化物理设置
env = dv.make_env(
    "airbot_play",
    physics_config={
        "timestep": 0.01,      # 增加时间步长
        "iterations": 50,      # 减少求解器迭代
        "tolerance": 1e-4      # 放宽求解器精度
    }
)
```

### 观察空间错误

```python
# 检查观察空间
env = dv.make_env("airbot_play", obs_mode="rgb")
obs = env.reset()

if "image" not in obs:
    print("错误: RGB模式下应该包含'image'键")
    print(f"实际观察键: {list(obs.keys())}")

# 验证图像格式
if "image" in obs:
    image = obs["image"]
    print(f"图像形状: {image.shape}")
    print(f"数据类型: {image.dtype}")
    print(f"值范围: [{image.min()}, {image.max()}]")
```

## 🎯 下一步

现在您已经掌握了环境设置的基础，接下来学习：

👉 [机器人控制](/docs/tutorials/basic-simulation/robot-control)

或者深入了解特定主题：
- [传感器配置](/docs/tutorials/sensors/overview)
- [性能优化](/docs/tutorials/advanced/performance-optimization)
- [故障排除](/docs/tutorials/advanced/troubleshooting) 