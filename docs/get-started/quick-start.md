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
