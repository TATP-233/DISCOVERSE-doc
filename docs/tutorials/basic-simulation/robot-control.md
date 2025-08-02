---
sidebar_position: 3
---

# Robot Control

This tutorial provides an in-depth introduction to the robot control system in DISCOVERSE, including different control modes, kinematics, trajectory planning, and real-time control.

## 🎯 Learning Objectives

- Master all control modes in DISCOVERSE
- Understand forward and inverse kinematics
- Learn trajectory planning and smooth control
- Implement complex robot operation tasks

## 🎮 Control Modes Explained

### 1. Joint Position Control (pd_joint_pos)

The most basic control mode, directly specifying target joint angles:

```python
import discoverse as dv
import numpy as np

env = dv.make_env("airbot_play", control_mode="pd_joint_pos")
obs = env.reset()

# Get current joint positions
current_qpos = obs["qpos"]  # Current joint angles
print(f"Current joint positions: {current_qpos}")

# Set target joint positions
target_qpos = np.array([0.0, -0.5, 0.0, 1.57, 0.0, 1.0, 0.0])

# Execute control
obs, reward, done, info = env.step(target_qpos)
env.render()
```

### 2. Joint Delta Position Control (pd_joint_delta_pos)

Control joints incrementally, suitable for fine operations:
