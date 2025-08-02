---
sidebar_position: 1
---

# 数据生成概览

## 概述

数据生成是DISCOVERSE的重要功能之一，包括自动化数据收集和先进的域随机化技术。通过这些工具，用户可以高效地生成大量多样化的机器人学习数据，显著提升模型的泛化能力和Sim2Real迁移效果。

## 🎯 核心功能

### 自动化数据收集
- 多机器人平台支持（AirbotPlay、MMK2等）
- 并行数据生成提升效率
- 多模态数据同步采集（RGB、深度、掩码）

### 域随机化技术
- 基于生成模型的视觉变换
- 光流驱动的时序一致性
- ComfyUI集成的专业渲染

### 数据格式转换
- 支持多种学习算法格式
- HDF5、Zarr等标准格式
- 自动化转换流程

## 📚 教程列表

### [自动化数据收集](../imitation-learning/data-collection)
学习如何使用DISCOVERSE的自动化数据收集系统，包括：
- 多机器人平台数据生成
- 并行处理配置
- 数据质量控制

### [域随机化技术](./domain-randomization)
掌握先进的域随机化方法，包括：
- ComfyUI生成模型集成
- 光流时序处理
- 视觉场景变换

## 🚀 快速开始

```bash
# 1. 生成训练数据
python scripts/tasks_data_gen.py \
    --robot_name airbot_play \
    --task_name kiwi_place \
    --track_num 100 \
    --nw 8

# 2. 应用域随机化（可选）
cd discoverse/randomain
python generate.py \
    --task_name kiwi_place \
    --work_dir 000 \
    --cam_id 0

# 3. 转换数据格式
python policies/act/data_process/raw_to_hdf5.py \
    -md mujoco \
    -dir data \
    -tn kiwi_place \
    -vn cam_0 cam_1
```

## 📊 性能优势

| 指标 | 传统方法 | DISCOVERSE |
|------|----------|------------|
| 数据生成速度 | 1x | **100x** |
| Sim2Real成功率 | 45% | **84%** |
| 数据多样性 | 低 | **高** |
| 自动化程度 | 部分 | **完全** |

## 下一步

- [开始数据收集](../imitation-learning/data-collection)
- [了解域随机化](./domain-randomization)
- [探索模仿学习](../imitation-learning/overview) 