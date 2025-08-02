---
sidebar_position: 1
---

# Imitation Learning Overview

DISCOVERSE provides a complete imitation learning workflow, supporting end-to-end training from data collection to policy deployment. This chapter introduces four mainstream imitation learning algorithms integrated in the framework.

## ðŸŽ¯ Supported Algorithms

Currently, DISCOVERSE supports the following four imitation learning algorithms:

### 1. **ACT** (Action Chunking with Transformers)
- **Data format**: HDF5
- **Use case**: Complex manipulation tasks requiring long sequence planning

### 2. **DP** (Diffusion Policy)
- **Data format**: Zarr
- **Use case**: Multimodal action distributions, complex manipulation skills

### 3. **RDT** (Robotics Diffusion Transformer)
- **Data format**: HDF5
- **Use case**: Multi-task learning, general robot skills

### 4. **OpenPI** (Open-source Policy Interface)
- **Data format**: HDF5
- **Use case**: Rapid prototyping, few-shot learning

## ðŸ”„ Workflow

The complete imitation learning workflow includes the following steps:

### 1. Data Generation
Automatically generate demonstration data, 100x more efficient than the real world

### 2. Data Format Conversion
Convert to the required format for each algorithm:
- **ACT/RDT/OpenPI**: Raw data â†?HDF5
- **DP**: Raw data â†?Zarr
