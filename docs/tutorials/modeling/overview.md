---
sidebar_position: 1
---

# Modeling Overview

# 3D Modeling and Editing Tools

DISCOVERSE provides a comprehensive suite of 3D modeling and editing tools to help users create, convert, and edit 3D models in simulation environments. These tools cover the entire workflow from mesh conversion to scene editing, and advanced 3D Gaussian Splatting model processing.

## Tool Overview

### 1. Mesh2MJCF Converter
Converts standard 3D mesh files (OBJ, STL, etc.) into MJCF format required by the MuJoCo physics engine. This is a key tool for building simulation environments, supporting:
- Multiple mesh formats input
- Automatic generation of physical properties
- Consistency between visual and physical models

### 2. XML Editor
A graphical tool based on PyQt5 and OpenGL for creating and editing MuJoCo scene description files. It offers an intuitive visual editing experience:
- Real-time 3D preview
- Drag-and-drop scene construction
- Real-time property editing
- Hierarchical structure management

### 3. 3D Gaussian Splatting Editor
A specialized tool for processing the latest 3D Gaussian Splatting models, supporting high-fidelity scene representation and rendering:
- Gaussian function parameter adjustment
- Geometric transformation operations
- Spherical harmonics processing
- Consistent view-dependent effects

## Application Scenarios

These modeling tools play an important role in the DISCOVERSE simulation system:

- **Rapid Prototyping**: Quickly build simulation scenes using the XML Editor
- **Asset Conversion**: Convert existing 3D models to simulation formats
- **Scene Optimization**: Enhance rendering quality with 3D Gaussian Splatting technology
- **Customized Development**: Adjust model parameters according to specific requirements

## Recommended Workflow

1. **Scene Planning**: Use the XML Editor for initial scene design
2. **Model Conversion**: Convert external 3D assets with Mesh2MJCF
3. **Fine-tuning**: Optimize parameters using various tools
4. **Rendering Enhancement**: Apply 3D Gaussian Splatting for improved visual effects

Choose the tools that best fit your project needs and refer to the detailed usage guides to start your 3D modeling work.
