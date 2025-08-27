---
sidebar_position: 2
---

# Quick Start

This guide will help you run your first DISCOVERSE simulation example in just a few minutes and experience the core features of the framework.

## Verify Installation

First, make sure DISCOVERSE is installed correctly:

```bash
python scripts/check_installation.py
```

If you see all core checks passed, the installation is successful.

## First Robot Simulation

### Launch a Basic Robot Environment

DISCOVERSE supports multiple robot platforms. Let's start with the simplest one:

```bash
# Launch Airbot Play robotic arm
python discoverse/robots_env/airbot_play_base.py
```

This will start a basic Airbot Play robotic arm simulation environment. You should see a 3D simulation window displaying the robot arm model.

### Run an Operation Task

Now let's run an automated operation task:

```bash
# Run the coffee cup placement task
python discoverse/examples/tasks_airbot_play/place_coffeecup.py
```

You will see the robotic arm automatically execute the pick and place actions for the coffee cup. This demonstrates DISCOVERSE's automated data generation capabilities.

## Interactive Control

While the simulation is running, you can use the following keyboard shortcuts for interaction:

### Basic Controls
- **'h'** - Show help menu
- **'r'** - Reset simulation state  
- **'F5'** - Reload MJCF scene
- **'p'** - Print robot status information

### View Controls
- **'[' / ']'** - Switch camera views
- **'Esc'** - Toggle free camera mode
- **Left mouse drag** - Rotate view
- **Right mouse drag** - Pan view
- **Mouse wheel** - Zoom view

### Rendering Toggle
- **'Ctrl+g'** - Toggle Gaussian rendering (requires gaussian-rendering module)
- **'Ctrl+d'** - Toggle depth visualization

## More Robot Platforms

### Dual-Arm Mobile Robot (MMK2)

```bash
# Launch MMK2 dual-arm robot
python discoverse/robots_env/mmk2_base.py

# Run kiwi picking task
python discoverse/examples/tasks_mmk2/kiwi_pick.py
```

### Dexterous Hand Simulation

```bash
# Launch LeapHand tactile hand
python discoverse/examples/robots/leap_hand_env.py
```

## Inverse Kinematics Demo

DISCOVERSE provides interactive inverse kinematics functionality:

```bash
# Airbot Play inverse kinematics
python discoverse/examples/mocap_ik/mocap_ik_airbot_play.py

# Specify specific scene
python discoverse/examples/mocap_ik/mocap_ik_airbot_play.py --mjcf mjcf/tasks_airbot_play/stack_block.xml

# MMK2 inverse kinematics
python discoverse/examples/mocap_ik/mocap_ik_mmk2.py --mjcf mjcf/tasks_mmk2/pan_pick.xml
```

## More Application Examples

### SLAM Tasks

If you have installed the 3DGS rendering module, you can experience high-fidelity active SLAM:

:::note Prerequisites
Requires installation of the gaussian-rendering module and downloading corresponding .ply model files. Please refer to the [Installation Guide](./installation.md#high-fidelity-rendering-setup-optional).
:::

```bash
python discoverse/examples/active_slam/dummy_robot.py
```

This example showcases the simulator's high-fidelity 3D environment.

### Multi-Agent Collaboration

```bash
python discoverse/examples/skyrover_on_rm2car/skyrover_and_rm2car.py
```

Watch a demonstration of drone and ground robot collaboration.

## Data Collection Workflow

One of DISCOVERSE's core advantages is automated data collection with 100x efficiency improvement over real-world collection:

### 1. Run Data Collection Tasks
```bash
# Automatically generate robotic arm operation data
python discoverse/examples/tasks_airbot_play/block_bridge_place.py

# Generate dual-arm collaboration data  
python discoverse/examples/tasks_mmk2/coffeecup_plate.py
```

### 2. View Generated Data
Data is typically saved in the `data/` directory, including:
- Robot state trajectories
- Sensor data (RGB, depth, point clouds, etc.)
- Action sequences
- Task labels

## Next Steps

Now that you've successfully run your first simulation, you can explore further:

1. **[Basic Concepts](./basic-concepts.md)** - Understand DISCOVERSE's architecture and core concepts
2. **[Basic Simulation Tutorial](../tutorials/basic-simulation/overview.md)** - Learn how to create custom simulation scenes
3. **[Sensor Tutorial](../tutorials/sensors/overview.md)** - Configure and use various sensors
4. **[Imitation Learning Tutorial](../tutorials/imitation-learning/overview.md)** - Train your first robot policy

## Getting Help

If you encounter issues:
- Check terminal output for error messages
- Review the [Troubleshooting Documentation](./troubleshooting.md)
- Search for similar problems in [GitHub Issues](https://github.com/TATP-233/DISCOVERSE/issues)
- Join our community discussions
