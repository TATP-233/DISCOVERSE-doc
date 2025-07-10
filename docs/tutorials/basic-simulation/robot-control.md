# 机器人控制

本教程将深入介绍DISCOVERSE中的机器人控制系统，包括不同的控制模式、运动学计算、轨迹规划和实时控制。

## 🎯 学习目标

- 掌握DISCOVERSE的所有控制模式
- 理解正向和反向运动学
- 学习轨迹规划和平滑控制
- 实现复杂的机器人操作任务

## 🎮 控制模式详解

### 1. 关节位置控制 (pd_joint_pos)

最基础的控制模式，直接指定目标关节角度：

```python
import discoverse as dv
import numpy as np

env = dv.make_env("airbot_play", control_mode="pd_joint_pos")
obs = env.reset()

# 获取当前关节位置
current_qpos = obs["qpos"]  # 当前关节角度
print(f"当前关节位置: {current_qpos}")

# 设置目标关节位置
target_qpos = np.array([0.0, -0.5, 0.0, 1.57, 0.0, 1.0, 0.0])

# 执行控制
obs, reward, done, info = env.step(target_qpos)
env.render()
```

### 2. 关节增量控制 (pd_joint_delta_pos)

通过增量方式控制关节，适合精细操作：

```python
env = dv.make_env("airbot_play", control_mode="pd_joint_delta_pos")
obs = env.reset()

# 平滑移动到目标位置
target = np.array([0.0, -0.5, 0.0, 1.57, 0.0, 1.0, 0.0])
current = obs["qpos"]

for step in range(100):
    # 计算增量
    delta = (target - current) * 0.1  # 10%的步长
    
    # 执行增量控制
    obs, reward, done, info = env.step(delta)
    current = obs["qpos"]
    
    # 检查是否到达目标
    if np.linalg.norm(target - current) < 0.01:
        print(f"在第{step}步到达目标")
        break
    
    env.render()
```

### 3. 末端执行器控制 (pd_ee_pose)

直接控制机器人末端执行器的位姿：

```python
env = dv.make_env("airbot_play", control_mode="pd_ee_pose")
obs = env.reset()

# 获取当前末端执行器位姿
current_ee_pose = obs["ee_pose"]  # [x, y, z, qx, qy, qz, qw]
print(f"当前末端位姿: {current_ee_pose}")

# 设置目标位姿 (位置 + 四元数)
target_position = [0.5, 0.2, 0.3]  # x, y, z
target_quaternion = [0.0, 0.0, 0.0, 1.0]  # qx, qy, qz, qw (无旋转)
target_pose = target_position + target_quaternion

# 执行控制
obs, reward, done, info = env.step(target_pose)
env.render()
```

### 4. 速度控制 (pd_joint_vel)

控制关节速度：

```python
env = dv.make_env("airbot_play", control_mode="pd_joint_vel")
obs = env.reset()

# 设置关节速度 (rad/s)
joint_velocities = np.array([0.1, -0.2, 0.0, 0.3, 0.0, -0.1, 0.0])

for step in range(100):
    obs, reward, done, info = env.step(joint_velocities)
    
    # 可以动态调整速度
    if step == 50:
        joint_velocities *= -1  # 反向运动
    
    env.render()
```

## 🔧 运动学计算

### 正向运动学 (Forward Kinematics)

从关节角度计算末端执行器位姿：

```python
import discoverse as dv

env = dv.make_env("airbot_play")
robot = env.robot  # 获取机器人对象

# 给定关节角度
joint_angles = np.array([0.0, -0.5, 0.0, 1.57, 0.0, 1.0, 0.0])

# 计算正向运动学
ee_pose = robot.forward_kinematics(joint_angles)
print(f"末端位置: {ee_pose[:3]}")
print(f"末端方向 (四元数): {ee_pose[3:]}")

# 也可以计算雅可比矩阵
jacobian = robot.compute_jacobian(joint_angles)
print(f"雅可比矩阵形状: {jacobian.shape}")  # (6, 7) for 7-DOF arm
```

### 反向运动学 (Inverse Kinematics)

从目标末端位姿计算关节角度：

```python
# 目标末端位姿
target_position = [0.5, 0.0, 0.3]
target_orientation = [0.0, 0.0, 0.0, 1.0]  # 四元数
target_pose = np.array(target_position + target_orientation)

# 计算反向运动学
ik_solution = robot.inverse_kinematics(
    target_pose,
    initial_guess=joint_angles,  # 初始猜测
    tolerance=1e-4,              # 求解精度
    max_iterations=100           # 最大迭代次数
)

if ik_solution is not None:
    print(f"IK解: {ik_solution}")
    
    # 验证解的正确性
    computed_pose = robot.forward_kinematics(ik_solution)
    error = np.linalg.norm(computed_pose - target_pose)
    print(f"位姿误差: {error:.6f}")
else:
    print("未找到IK解")
```

### 多解处理

IK问题可能有多个解，DISCOVERSE提供了处理方法：

```python
# 获取所有可能的IK解
all_solutions = robot.inverse_kinematics_all(
    target_pose,
    tolerance=1e-4
)

print(f"找到 {len(all_solutions)} 个解")

# 选择最接近当前关节角度的解
current_angles = obs["qpos"]
best_solution = None
min_distance = float('inf')

for solution in all_solutions:
    distance = np.linalg.norm(solution - current_angles)
    if distance < min_distance:
        min_distance = distance
        best_solution = solution

print(f"最优解: {best_solution}")
```

## 📈 轨迹规划

### 关节空间轨迹

在关节空间中规划平滑轨迹：

```python
def plan_joint_trajectory(start_angles, end_angles, duration, freq=50):
    """规划关节空间轨迹"""
    num_steps = int(duration * freq)
    trajectory = []
    
    for i in range(num_steps + 1):
        t = i / num_steps
        # 使用三次多项式插值
        s = 3 * t**2 - 2 * t**3  # S曲线
        angles = start_angles + s * (end_angles - start_angles)
        trajectory.append(angles)
    
    return np.array(trajectory)

# 规划轨迹
start = obs["qpos"]
goal = np.array([0.0, -0.5, 0.0, 1.57, 0.0, 1.0, 0.0])
trajectory = plan_joint_trajectory(start, goal, duration=3.0)

# 执行轨迹
env = dv.make_env("airbot_play", control_mode="pd_joint_pos")
obs = env.reset()

for waypoint in trajectory:
    obs, reward, done, info = env.step(waypoint)
    env.render()
    
    if done:
        break
```

### 笛卡尔空间轨迹

在笛卡尔空间中规划直线轨迹：

```python
def plan_cartesian_trajectory(start_pose, end_pose, duration, freq=50):
    """规划笛卡尔空间直线轨迹"""
    num_steps = int(duration * freq)
    trajectory = []
    
    start_pos, start_quat = start_pose[:3], start_pose[3:]
    end_pos, end_quat = end_pose[:3], end_pose[3:]
    
    for i in range(num_steps + 1):
        t = i / num_steps
        
        # 位置线性插值
        pos = start_pos + t * (end_pos - start_pos)
        
        # 四元数球面线性插值 (SLERP)
        quat = slerp(start_quat, end_quat, t)
        
        pose = np.concatenate([pos, quat])
        trajectory.append(pose)
    
    return np.array(trajectory)

def slerp(q1, q2, t):
    """四元数球面线性插值"""
    q1, q2 = np.array(q1), np.array(q2)
    
    # 确保选择最短路径
    if np.dot(q1, q2) < 0:
        q2 = -q2
    
    dot = np.clip(np.dot(q1, q2), -1.0, 1.0)
    omega = np.arccos(np.abs(dot))
    
    if np.sin(omega) < 1e-6:
        return q1  # 四元数几乎相同
    
    return (np.sin((1-t)*omega) * q1 + np.sin(t*omega) * q2) / np.sin(omega)

# 执行笛卡尔轨迹
env = dv.make_env("airbot_play", control_mode="pd_ee_pose")
obs = env.reset()

start_pose = obs["ee_pose"]
end_pose = np.array([0.5, 0.2, 0.4, 0.0, 0.0, 0.0, 1.0])
cart_trajectory = plan_cartesian_trajectory(start_pose, end_pose, duration=2.0)

for waypoint in cart_trajectory:
    obs, reward, done, info = env.step(waypoint)
    env.render()
```

## 🎯 高级控制技术

### 阻抗控制

实现基于力的柔顺控制：

```python
def impedance_control(target_pose, current_pose, current_vel, 
                     stiffness=1000, damping=50):
    """阻抗控制器"""
    # 位置误差
    pos_error = target_pose[:3] - current_pose[:3]
    
    # 方向误差 (简化为角度误差)
    orient_error = orientation_error(target_pose[3:], current_pose[3:])
    
    # 合并位置和方向误差
    pose_error = np.concatenate([pos_error, orient_error])
    
    # 计算期望力/力矩
    desired_wrench = stiffness * pose_error - damping * current_vel
    
    return desired_wrench

def orientation_error(target_quat, current_quat):
    """计算四元数方向误差"""
    # 转换为旋转矩阵
    target_rot = quaternion_to_rotation_matrix(target_quat)
    current_rot = quaternion_to_rotation_matrix(current_quat)
    
    # 误差旋转矩阵
    error_rot = target_rot @ current_rot.T
    
    # 转换为轴角表示
    return rotation_matrix_to_axis_angle(error_rot)

# 使用阻抗控制
env = dv.make_env("airbot_play", control_mode="pd_ee_pose")
obs = env.reset()

target_pose = np.array([0.5, 0.0, 0.3, 0.0, 0.0, 0.0, 1.0])

for step in range(200):
    current_pose = obs["ee_pose"]
    current_vel = obs["ee_vel"]  # 如果可用
    
    # 计算阻抗控制
    wrench = impedance_control(target_pose, current_pose, current_vel)
    
    # 这里需要转换为关节空间控制
    # 实际实现中会使用雅可比矩阵转换
    
    obs, reward, done, info = env.step(target_pose)
    env.render()
```

### 力控制

实现基于力反馈的控制：

```python
def force_control(target_force, current_force, dt=0.02):
    """简单的力控制器"""
    force_error = target_force - current_force
    
    # PID控制
    kp, ki, kd = 0.1, 0.01, 0.05
    
    # 这里应该维护积分和微分项的历史
    integral_term = 0  # 需要累积
    derivative_term = 0  # 需要计算变化率
    
    control_output = (kp * force_error + 
                     ki * integral_term + 
                     kd * derivative_term)
    
    return control_output

# 在有力传感器的环境中使用
env = dv.make_env("airbot_play_force_sensor")
obs = env.reset()

target_force = np.array([0, 0, -10])  # 向下10N的力

for step in range(100):
    if "force_sensor" in obs:
        current_force = obs["force_sensor"]
        force_cmd = force_control(target_force, current_force)
        
        # 将力指令转换为位置指令
        # 实际实现需要更复杂的转换
        
    obs, reward, done, info = env.step(action)
    env.render()
```

## 🔄 控制循环优化

### PID参数调优

```python
class PIDController:
    def __init__(self, kp, ki, kd, dt=0.02):
        self.kp, self.ki, self.kd = kp, ki, kd
        self.dt = dt
        self.integral = 0
        self.previous_error = 0
    
    def update(self, error):
        # 比例项
        proportional = self.kp * error
        
        # 积分项
        self.integral += error * self.dt
        integral = self.ki * self.integral
        
        # 微分项
        derivative = self.kd * (error - self.previous_error) / self.dt
        self.previous_error = error
        
        # PID输出
        output = proportional + integral + derivative
        return output
    
    def reset(self):
        self.integral = 0
        self.previous_error = 0

# 为每个关节创建PID控制器
joint_controllers = [
    PIDController(kp=100, ki=1, kd=10) for _ in range(7)
]

env = dv.make_env("airbot_play", control_mode="pd_joint_vel")
obs = env.reset()

target_positions = np.array([0.0, -0.5, 0.0, 1.57, 0.0, 1.0, 0.0])

for step in range(200):
    current_positions = obs["qpos"]
    joint_velocities = []
    
    for i, controller in enumerate(joint_controllers):
        error = target_positions[i] - current_positions[i]
        velocity = controller.update(error)
        joint_velocities.append(velocity)
    
    obs, reward, done, info = env.step(np.array(joint_velocities))
    env.render()
```

### 安全限制

```python
class SafetyWrapper:
    def __init__(self, env, joint_limits, velocity_limits, acceleration_limits):
        self.env = env
        self.joint_limits = joint_limits  # [(min, max), ...]
        self.velocity_limits = velocity_limits
        self.acceleration_limits = acceleration_limits
        self.previous_action = None
        self.previous_time = None
    
    def step(self, action):
        # 关节位置限制
        for i, (min_pos, max_pos) in enumerate(self.joint_limits):
            action[i] = np.clip(action[i], min_pos, max_pos)
        
        # 速度限制
        if self.previous_action is not None:
            dt = 0.02  # 假设20ms控制周期
            velocity = (action - self.previous_action) / dt
            
            for i, max_vel in enumerate(self.velocity_limits):
                if abs(velocity[i]) > max_vel:
                    # 限制速度
                    sign = np.sign(velocity[i])
                    action[i] = self.previous_action[i] + sign * max_vel * dt
        
        self.previous_action = action.copy()
        return self.env.step(action)
    
    def reset(self):
        self.previous_action = None
        return self.env.reset()

# 使用安全包装器
base_env = dv.make_env("airbot_play", control_mode="pd_joint_pos")
safe_env = SafetyWrapper(
    base_env,
    joint_limits=[(-3.14, 3.14)] * 7,  # 关节角度限制
    velocity_limits=[2.0] * 7,         # 速度限制 (rad/s)
    acceleration_limits=[10.0] * 7     # 加速度限制 (rad/s²)
)
```

## 📊 控制性能评估

### 轨迹跟踪精度

```python
def evaluate_tracking_performance(target_trajectory, actual_trajectory):
    """评估轨迹跟踪性能"""
    # 位置误差
    position_errors = np.linalg.norm(
        target_trajectory - actual_trajectory, axis=1
    )
    
    # 统计指标
    mae = np.mean(position_errors)  # 平均绝对误差
    rmse = np.sqrt(np.mean(position_errors**2))  # 均方根误差
    max_error = np.max(position_errors)  # 最大误差
    
    return {
        'MAE': mae,
        'RMSE': rmse,
        'Max Error': max_error,
        'Error Std': np.std(position_errors)
    }

# 性能测试
target_traj = plan_joint_trajectory(start, goal, duration=3.0)
actual_traj = []

env = dv.make_env("airbot_play", control_mode="pd_joint_pos")
obs = env.reset()

for waypoint in target_traj:
    obs, reward, done, info = env.step(waypoint)
    actual_traj.append(obs["qpos"])

actual_traj = np.array(actual_traj)
performance = evaluate_tracking_performance(target_traj, actual_traj)

print("轨迹跟踪性能:")
for metric, value in performance.items():
    print(f"  {metric}: {value:.4f}")
```

## 🎯 实际应用示例

### 拾取物体任务

```python
def pick_object_demo():
    """演示拾取物体的完整控制流程"""
    env = dv.make_env("airbot_play_pick_task", control_mode="pd_ee_pose")
    obs = env.reset()
    
    # 1. 移动到物体上方
    object_pos = obs["object_pose"][:3]
    pre_grasp_pose = object_pos + [0, 0, 0.1]  # 上方10cm
    pre_grasp_pose = np.concatenate([pre_grasp_pose, [0, 0, 0, 1]])
    
    print("移动到预抓取位置...")
    for _ in range(50):
        obs, reward, done, info = env.step(pre_grasp_pose)
        env.render()
    
    # 2. 下降到抓取位置
    grasp_pose = object_pos + [0, 0, 0.02]  # 略高于物体
    grasp_pose = np.concatenate([grasp_pose, [0, 0, 0, 1]])
    
    print("下降到抓取位置...")
    for _ in range(30):
        obs, reward, done, info = env.step(grasp_pose)
        env.render()
    
    # 3. 闭合夹爪
    print("闭合夹爪...")
    # 这里需要夹爪控制接口
    
    # 4. 提升物体
    lift_pose = grasp_pose.copy()
    lift_pose[2] += 0.2  # 提升20cm
    
    print("提升物体...")
    for _ in range(50):
        obs, reward, done, info = env.step(lift_pose)
        env.render()
    
    print("拾取任务完成!")

# 运行演示
pick_object_demo()
```

## 🎯 下一步

现在您已经掌握了机器人控制的基础，接下来可以学习：

👉 [传感器配置](/docs/tutorials/sensors/overview)

或者探索更高级的主题：
- [模仿学习](/docs/tutorials/imitation-learning/overview)
- [强化学习](/docs/tutorials/reinforcement-learning/overview)
- [Real2Sim管道](/docs/advanced/real2sim/overview) 