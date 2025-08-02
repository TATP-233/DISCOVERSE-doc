---
sidebar_position: 1
---

# 模仿学习概览

DISCOVERSE提供了完整的模仿学习工作流，支持从数据收集到策略部署的端到端训练。本章将介绍框架中集成的四种主流模仿学习算法。

## 🎯 支持的算法

DISCOVERSE目前支持以下四种模仿学习算法：

### 1. **ACT** (Action Chunking with Transformers)
- **数据格式**: HDF5
- **适用场景**: 复杂操作任务，需要长序列动作规划

### 2. **DP** (Diffusion Policy) 
- **数据格式**: Zarr
- **适用场景**: 多模态动作分布，复杂操作技能

### 3. **RDT** (Robotics Diffusion Transformer)
- **数据格式**: HDF5
- **适用场景**: 多任务学习，通用机器人技能

### 4. **OpenPI** (Open-source Policy Interface)
- **数据格式**: HDF5
- **适用场景**: 快速原型开发，少样本学习

## 🔄 工作流程

模仿学习的完整流程包括以下步骤：

### 1. 数据生成
自动生成演示数据，比真实世界效率提升100倍

### 2. 数据格式转换
根据不同算法转换为相应格式：
- **ACT/RDT/OpenPI**: 原始数据 → HDF5
- **DP**: 原始数据 → Zarr

### 3. 模型训练
使用各算法的训练脚本进行策略学习

### 4. 策略推理
在仿真或真实机器人上部署训练好的策略

## 📚 章节导航

- **[数据生成](./data-generation.md)**: 学习如何自动收集演示数据
- **[ACT算法](./act.md)**: 基于Transformer的动作分块学习
- **[Diffusion Policy](./dp.md)**: 扩散模型策略学习
- **[RDT算法](./rdt.md)**: 大模型多任务学习
- **[OpenPI算法](./openpi.md)**: 基于预训练模型的快速微调

开始您的模仿学习之旅，从[数据生成](./data-generation.md)开始！ 