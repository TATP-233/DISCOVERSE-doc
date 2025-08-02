---
sidebar_position: 2
---

# Environment Setup

This tutorial details how to configure the DISCOVERSE simulation environment, including various settings, performance optimization, and troubleshooting.

## 🎯 Learning Objectives

- Understand the DISCOVERSE environment configuration system
- Master different rendering modes and settings
- Learn performance optimization tips
- Configure multi-GPU and parallel simulation

## 🔧 Basic Environment Configuration

### Create a Basic Environment

```python
import discoverse as dv

# The simplest environment creation
env = dv.make_env("airbot_play")

# Environment creation with parameters
env = dv.make_env(
    robot_name="airbot_play",           # Robot type
    scene_name="table_top",            # Scene name
    obs_mode="rgb",                    # Observation mode
    control_mode="pd_joint_pos",       # Control mode
    render_mode="human"                # Render mode
)
```

### Environment Configuration Parameters Explained

| Parameter      | Type | Default         | Description                                      |
|---------------|------|----------------|--------------------------------------------------|
| `robot_name`  | str  | "airbot_play"  | Robot model name                                 |
| `scene_name`  | str  | "table_top"    | Simulation scene name                            |
| `obs_mode`    | str  | "state"        | Observation mode: `state`, `rgb`, `rgbd`, `pointcloud` |
| `control_mode`| str  | "pd_joint_pos" | Control mode                                     |
| `render_mode` | str  | "human"        | Render mode: `human`, `rgb_array`, `none`        |
