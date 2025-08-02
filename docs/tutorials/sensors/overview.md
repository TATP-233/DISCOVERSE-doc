---
sidebar_position: 1
---

# Sensors Overview

DISCOVERSE provides rich sensor support, including RGB cameras, depth cameras, stereo cameras, and more. This tutorial will guide you through configuring and using various sensors in DISCOVERSE.

## 🎯 Learning Objectives

- Understand the types of sensors supported by DISCOVERSE
- Master sensor configuration methods
- Learn the API for acquiring sensor data
- Understand stereo vision and depth perception

## 📷 Supported Sensor Types

### RGB Camera
Provides color image observation and supports multi-camera configuration:

```python
# Configure RGB camera (must be set explicitly, default is None)
config.obs_rgb_cam_id = [0, 1, 2]  # List of camera IDs

# Get RGB image
rgb_image = sim.getRgbImg(cam_id=0)  # Returns (H, W, 3) numpy array
```

### Depth Camera
Obtain depth information of the scene:

```python
# Configure depth camera
config.obs_depth_cam_id = [0, 1]  # List of depth camera IDs

# Get depth image
depth_image = sim.getDepthImg(cam_id=0)  # Returns (H, W) numpy array
```

### Stereo Camera System
DISCOVERSE supports high-precision stereo camera simulation for depth perception and 3D reconstruction:

- **Binocular camera configuration**: Simulate real stereo camera systems
- **Disparity calculation**: Automatically compute disparity between left and right images
