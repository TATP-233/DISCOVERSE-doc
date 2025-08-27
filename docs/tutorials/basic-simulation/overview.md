---
sidebar_position: 1
---

# Basic Simulation Overview

Welcome to the DISCOVERSE Basic Simulation Tutorial! This tutorial will guide you through creating and running robot simulations in DISCOVERSE. DISCOVERSE is a high-fidelity robot simulation platform based on the MuJoCo physics engine and supports 3D Gaussian Splatting rendering technology.

## 🎯 Learning Objectives

After completing this tutorial, you will be able to:

- Understand the configuration system and basic architecture of DISCOVERSE
- Create and configure robot simulation environments
- Use real robot models (such as AirbotPlay, MMK2)
- Configure sensors and rendering options
- Run basic robot operation tasks

## 📋 Prerequisites

Before you begin, please make sure you have:

- ✅ Completed the [Installation Guide](/docs/get-started/installation)
- ✅ Run the [Quick Start](/docs/get-started/quick-start)
- ✅ Read the [Basic Concepts](/docs/get-started/basic-concepts)

## 🏗️ DISCOVERSE Architecture

DISCOVERSE is built on the following core technologies:

### MuJoCo Physics Engine
- High-precision rigid body dynamics simulation
- Supports contact and friction simulation
- Real-time physics computation

### 3D Gaussian Splatting Rendering
- High-fidelity scene rendering
- Supports realistic visual effects
- Switchable with traditional MuJoCo renderer

### Robot Model Support
- **AirbotPlay**: 7-DOF robotic arm, suitable for tabletop manipulation tasks
- **MMK2**: Dual-arm mobile robot, supporting complex collaboration tasks
- **LeapHand**: 16-DOF dexterous hand, enabling fine manipulation

### Sensor System
- **RGB Cameras**: Multi-view visual information
- **Depth Cameras**: 3D perception capability
- **LiDAR**: High-precision point cloud data
- **IMU**: Inertial measurement units
- **Tactile Sensors**: Force and touch feedback

## 📁 Project Structure

Understanding DISCOVERSE's directory structure helps you quickly locate required files:

```
DISCOVERSE/
├── discoverse/                    # Core simulation framework
│   ├── envs/                     # Environment definitions
│   ├── robots/                   # Robot model interfaces
│   ├── sensors/                  # Sensor implementations
│   └── utils/                    # Utility functions
├── mjcf/                         # MuJoCo scene description files
│   ├── robots/                   # Robot MJCF files
│   ├── objects/                  # Object models
│   └── tasks/                    # Task scene files
├── models/                       # 3D models and assets
│   ├── meshes/                   # Mesh files (.obj, .stl)
│   ├── 3dgs/                     # 3D Gaussian Splatting models
│   └── textures/                 # Texture files
├── examples/                     # Example scripts
│   ├── robots/                   # Basic robot examples
│   ├── tasks_airbot_play/       # AirbotPlay task examples
│   ├── tasks_mmk2/              # MMK2 task examples
│   └── mocap_ik/                # Inverse kinematics examples
├── scripts/                      # Utility scripts
└── data/                        # Generated data storage
```

## 🔧 Core Configuration System

DISCOVERSE uses a unified configuration system to manage simulation parameters:

### BaseConfig Class
The core configuration class contains all simulation settings:

```python
from discoverse.envs import BaseConfig

# Create basic configuration
cfg = BaseConfig()

# Core simulation parameters
cfg.mjcf_file_path = "mjcf/robots/airbot_play.xml"  # Scene file
cfg.timestep = 0.002                                # Physics timestep
cfg.decimation = 10                                 # Control decimation
cfg.sync = True                                     # Real-time sync
cfg.headless = False                                # Show GUI

# Rendering configuration
cfg.render_set = {
    "fps": 30,        # Frame rate
    "width": 640,     # Image width
    "height": 480     # Image height
}

# Sensor configuration
cfg.obs_rgb_cam_id = [0, 1]      # RGB camera IDs
cfg.obs_depth_cam_id = [0]       # Depth camera IDs

# High-fidelity rendering (optional)
cfg.use_gaussian_renderer = False
```

### Configuration Options Explained

#### Basic Simulation Parameters
- **`mjcf_file_path`**: Path to MuJoCo scene file (.xml or .mjb)
- **`timestep`**: Physics simulation time step (typically 0.001-0.002 seconds)
- **`decimation`**: Control frequency reduction factor (actual control rate = 1/(timestep × decimation))
- **`sync`**: Enable real-time synchronization (useful for teleoperation)
- **`headless`**: Run without GUI (useful for data generation or server deployment)

#### Rendering Parameters
- **`render_set`**: Dictionary containing rendering settings
  - `fps`: Target frame rate for visualization
  - `width`/`height`: Rendered image dimensions

#### Sensor Configuration
- **`obs_rgb_cam_id`**: List of RGB camera IDs to use for observations
- **`obs_depth_cam_id`**: List of depth camera IDs to use for observations

#### Advanced Features
- **`use_gaussian_renderer`**: Enable 3D Gaussian Splatting for high-fidelity rendering
- **`rb_link_list`**: Robot body names (for 3DGS rendering)
- **`obj_list`**: Interactive object names (for 3DGS rendering)
- **`gs_model_dict`**: Mapping from body names to 3DGS model paths

## 🤖 Robot Platforms Overview

### AirbotPlay
A 7-DOF robotic arm perfect for learning and tabletop manipulation:

**Specifications:**
- 7 degrees of freedom
- Parallel gripper
- Reach: ~65cm
- Payload: 1kg

**Use Cases:**
- Pick and place tasks
- Object manipulation
- Basic learning algorithms

**Example Configuration:**
```python
cfg.mjcf_file_path = "mjcf/robots/airbot_play.xml"
```

### MMK2 Dual-Arm Mobile Robot
A sophisticated dual-arm mobile platform for complex tasks:

**Specifications:**
- Dual 7-DOF arms
- Mobile base with omnidirectional wheels
- Stereo cameras
- Lift mechanism

**Use Cases:**
- Multi-object manipulation
- Mobile manipulation
- Collaboration tasks

**Example Configuration:**
```python
cfg.mjcf_file_path = "mjcf/robots/mmk2.xml"
```

### LeapHand
A 16-DOF dexterous hand for fine manipulation:

**Specifications:**
- 16 degrees of freedom
- 4 fingers with tactile sensing
- High dexterity for complex grasping

**Use Cases:**
- Dexterous manipulation
- In-hand manipulation
- Object reorientation

## 📊 Simulation Workflow

A typical simulation workflow in DISCOVERSE follows these steps:

1. **Environment Setup**: Configure robot, scene, and sensors
2. **Initialization**: Load models and initialize physics
3. **Control Loop**: Execute actions and collect observations
4. **Data Collection**: Save trajectories and sensor data
5. **Analysis**: Process and analyze results

### Basic Simulation Loop

```python
import discoverse

# 1. Create environment
env = discoverse.make("AirbotPlayManipulation")

# 2. Reset environment
obs = env.reset()

# 3. Run simulation loop
for step in range(1000):
    # Generate action (random or from policy)
    action = env.action_space.sample()
    
    # Execute action
    obs, reward, done, info = env.step(action)
    
    # Check if episode finished
    if done:
        obs = env.reset()

env.close()
```

## 🎮 Interactive Features

DISCOVERSE provides rich interactive features for development and debugging:

### Keyboard Controls
- **Basic Controls**: Help (h), Reset (r), Reload scene (F5)
- **View Controls**: Camera switching ([/]), Free camera (Esc)
- **Rendering**: Toggle Gaussian rendering (Ctrl+g), Depth view (Ctrl+d)

### Mouse Controls
- **Left Drag**: Rotate camera view
- **Right Drag**: Pan camera view
- **Scroll Wheel**: Zoom in/out

### Real-time Debugging
- **Print States**: Press 'p' to print robot joint states and poses
- **Visual Markers**: Add visual markers for debugging kinematics
- **Sensor Visualization**: Real-time display of camera and LiDAR data

## 📈 Performance Considerations

### Simulation Speed
- **Physics Timestep**: Smaller timesteps increase accuracy but reduce speed
- **Decimation**: Higher decimation reduces control frequency but improves performance
- **Headless Mode**: Disable GUI for faster data generation

### Memory Usage
- **3DGS Models**: Can be memory-intensive; adjust quality settings as needed
- **Sensor Data**: Large images/point clouds can consume significant memory
- **Batch Processing**: Process data in batches for large datasets

### GPU Acceleration
- **3DGS Rendering**: Requires CUDA-capable GPU
- **LiDAR Simulation**: Benefits from GPU acceleration with Taichi
- **Parallel Environments**: Multiple environments can share GPU resources

## 🔍 Debugging Tips

### Common Issues
1. **Scene Loading Errors**: Check MJCF file paths and model references
2. **Rendering Problems**: Verify GPU drivers and CUDA installation
3. **Physics Instability**: Adjust timestep and contact parameters
4. **Performance Issues**: Profile bottlenecks and optimize accordingly

### Diagnostic Tools
- **`check_installation.py`**: Verify system setup
- **Verbose Logging**: Enable detailed logging for debugging
- **Visual Debugging**: Use wireframe and collision visualization
- **Profiling**: Monitor CPU/GPU usage and memory consumption

## 📚 Learning Path

To master DISCOVERSE basic simulation, we recommend following this learning path:

1. **[Environment Setup](./environment-setup.md)** - Configure your first simulation environment
2. **[Robot Control](./robot-control.md)** - Learn robot control interfaces and kinematics
3. **[Sensor Integration](../sensors/overview.md)** - Add sensors and process data
4. **[Task Design](../tasks/overview.md)** - Create custom manipulation tasks
5. **[Advanced Features](../advanced/overview.md)** - Explore 3DGS rendering and advanced capabilities

## 🎯 What's Next?

After completing this overview, you're ready to:

- Set up your first custom simulation environment
- Learn detailed robot control mechanisms
- Integrate sensors for perception tasks
- Explore advanced rendering capabilities

Let's start with [Environment Setup](./environment-setup.md) to begin your hands-on journey with DISCOVERSE!

---

*This tutorial provides a comprehensive foundation for robot simulation in DISCOVERSE. Each subsequent section will dive deeper into specific aspects of the framework.*
