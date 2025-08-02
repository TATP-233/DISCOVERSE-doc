---
sidebar_position: 2
---

# 快速开始

本指南将帮助您在几分钟内运行第一个DISCOVERSE仿真示例，体验框架的核心功能。

## 验证安装

首先确认DISCOVERSE已正确安装：

```bash
python scripts/check_installation.py
```

如果看到核心检查项通过，说明安装成功。

## 第一个机器人仿真

### 启动基础机器人环境

DISCOVERSE支持多种机器人平台，让我们从最简单的开始：

```bash
# 启动Airbot Play机械臂
python discoverse/robots_env/airbot_play_base.py
```

这将启动一个基础的Airbot Play机械臂仿真环境。您应该看到一个3D仿真窗口，其中显示机械臂模型。

### 运行操作任务

现在让我们运行一个自动化操作任务：

```bash
# 运行咖啡杯放置任务
python discoverse/examples/tasks_airbot_play/place_coffeecup.py
```

您将看到机械臂自动执行拿取和放置咖啡杯的动作。这演示了DISCOVERSE的自动数据生成能力。

## 交互式控制

在仿真运行时，您可以使用以下键盘快捷键进行交互：

### 基础控制
- **'h'** - 显示帮助菜单
- **'r'** - 重置仿真状态  
- **'F5'** - 重新加载MJCF场景
- **'p'** - 打印机器人状态信息

### 视角控制
- **'[' / ']'** - 切换相机视角
- **'Esc'** - 切换自由相机模式
- **鼠标左键拖拽** - 旋转视角
- **鼠标右键拖拽** - 平移视角
- **鼠标滚轮** - 缩放视角

### 切换渲染
- **'Ctrl+g'** - 切换高斯渲染（需安装gaussian-rendering模块）
- **'Ctrl+d'** - 切换深度可视化

## 更多机器人平台

### 双臂移动机器人（MMK2）

```bash
# 启动MMK2双臂机器人
python discoverse/robots_env/mmk2_base.py

# 运行猕猴桃拾取任务
python discoverse/examples/tasks_mmk2/kiwi_pick.py
```

### 灵巧手仿真

```bash
# 启动LeapHand触觉手
python discoverse/examples/robots/leap_hand_env.py
```

## 逆向运动学演示

DISCOVERSE提供交互式逆运动学功能：

```bash
# Airbot Play逆向运动学
python discoverse/examples/mocap_ik/mocap_ik_airbot_play.py

# 指定特定场景
python discoverse/examples/mocap_ik/mocap_ik_airbot_play.py --mjcf mjcf/tasks_airbot_play/stack_block.xml

# MMK2逆向运动学
python discoverse/examples/mocap_ik/mocap_ik_mmk2.py --mjcf mjcf/tasks_mmk2/pan_pick.xml
```

## 更多应用示例

### SLAM任务

如果您安装了3DGS渲染模块，可以体验高保真主动SLAM：

:::note 前提条件
需要安装gaussian-rendering模块并下载对应的.ply模型文件。请参考[安装指南](./installation.md#高保真渲染设置可选)。
:::

```bash
python discoverse/examples/active_slam/dummy_robot.py
```

这个示例展示仿真器的高保真3D环境。

### 多智能体协作

```bash
python discoverse/examples/skyrover_on_rm2car/skyrover_and_rm2car.py
```

观看无人机和地面机器人的协作演示。

## 数据收集工作流

DISCOVERSE的一个核心优势是自动化数据收集，效率比真实世界提升100倍：

### 1. 运行数据收集任务
```bash
# 自动生成机械臂操作数据
python discoverse/examples/tasks_airbot_play/block_bridge_place.py

# 生成双臂协作数据  
python discoverse/examples/tasks_mmk2/coffeecup_plate.py
```

### 2. 查看生成的数据
数据通常保存在`data/`目录下，包含：
- 机器人状态轨迹
- 传感器数据（RGB、深度、点云等）
- 动作序列
- 任务标签

## 下一步探索

现在您已经成功运行了第一个仿真，可以进一步探索：

1. **[基本概念](./basic-concepts.md)** - 理解DISCOVERSE的架构和核心概念
2. **[基础仿真教程](../tutorials/basic-simulation/overview.md)** - 学习如何创建自定义仿真场景
3. **[传感器教程](../tutorials/sensors/overview.md)** - 配置和使用各种传感器
4. **[模仿学习教程](../tutorials/imitation-learning/overview.md)** - 训练您的第一个机器人策略

## 获取帮助

如果遇到问题：
- 查看终端输出的错误信息
- 检查[故障排除文档](../../troubleshooting.md)
- 在[GitHub Issues](https://github.com/TATP-233/DISCOVERSE/issues)中搜索类似问题
- 在我们的社区讨论