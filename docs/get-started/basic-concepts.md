---
sidebar_position: 3
---

# Basic Concepts

This document introduces the core concepts and architecture of the DISCOVERSE framework, helping you understand this unified, modular 3DGS robot simulation platform in depth.

## What is DISCOVERSE?

DISCOVERSE (**Efficient Robot Simulation in Complex High-Fidelity Environments**) is an open-source robot simulation framework based on 3D Gaussian Splatting (3DGS), designed for the Real2Sim2Real learning workflow.

### Core Principles

- **Unified**: One framework supports multiple robots, sensors, and learning algorithms
- **Modular**: Flexible component design, supporting on-demand combination
- **High Fidelity**: Realistic visual simulation based on 3DGS
- **Practical**: Sim2Real transfer for real-world applications

## Key Features Explained

### 🎯 High-Fidelity Real2Sim Generation

The unique advantage of DISCOVERSE is its ability to generate high-fidelity digital twins from real-world scenes:

#### Layered Scene Reconstruction
- **Background Environment Reconstruction**: Use 3DGS technology to reconstruct static environments
- **Interactive Object Modeling**: Independently model operable objects
- **Physical Property Mapping**: Infer physical parameters from visual appearance

#### Advanced Sensor Integration
- **LiDAR Scanning**: Integrate LiDAR for precise geometry capture
- **Multi-view Cameras**: Support RGB, depth, infrared, and other modalities
- **IMU Data**: Include inertial measurement unit data

#### AI-driven 3D Generation
- **Neural Rendering**: Scene reconstruction based on NeRF and 3DGS
- **Generative Models**: Use state-of-the-art AI models to enhance scene diversity
- **Auto Annotation**: AI-assisted semantic segmentation and object recognition
