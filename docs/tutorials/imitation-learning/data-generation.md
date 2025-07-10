---
sidebar_position: 2
---

# 数据生成

数据生成是模仿学习的第一步，DISCOVERSE提供了自动化的数据收集工具。

## 🎯 自动数据收集

DISCOVERSE准备了若干个单臂、双臂的操作任务，分别位于`discoverse/examples/tasks_airbot_play`和`discoverse/examples/tasks_mmk2`中。

### 自动收集命令

要自动收集数据，请运行：

```bash
cd scripts
python tasks_data_gen.py --robot_name <ROBOT_NAME> --task_name <TASK_NAME> --track_num <NUM_TRACK> --nw <NUM_OF_WORKERS>
```

#### 示例

```bash
python tasks_data_gen.py --robot_name airbot_play --task_name kiwi_place --track_num 100 --nw 8
```

表示使用airbot_play机械臂，任务为放置猕猴桃，总共生成100条任务轨迹，使用8个进程来同时生成数据。

## 🔄 数据格式转换

不同的模仿学习算法需要不同的数据格式：

### ACT

将仿真采集的原始数据格式转换为ACT算法中用到的hdf5格式：

```bash
python3 policies/act/data_process/raw_to_hdf5.py -md mujoco -dir data -tn <task_name> -vn <video_names>
```

**参数说明**:
- `-md`: 转换模式，mujoco表示转换由discoverse仿真器采集的数据
- `-dir`: 数据存放的根目录，默认为data
- `-tn`: 任务名，程序将根据任务名从data目录中寻找相同名称的数据集文件夹
- `-vn`: 视频名，指定需要转换的视频文件名（无后缀），多个名称用空格隔开

转换后的数据存放于`discoverse/data/hdf5`文件夹中。

### DP (Diffusion Policy)

将仿真采集的原始数据格式转换为DP算法中用到的zarr格式：

```bash
python3 policies/dp/raw2zarr.py -dir data -tn <task_name> 
```

**参数说明**:
- `-dir`: 数据存放的根目录，默认为data
- `-tn`: 任务名，程序将根据任务名从data目录中寻找相同名称的数据集文件夹

转换后的数据存放于`discoverse/data/zarr`文件夹中。

### RDT

将仿真采集的原始数据格式转换为RDT算法中用到的hdf5格式：

```bash
python3 policies/act/data_process/raw_to_hdf5.py -md mujoco -dir data -tn ${task_name} -vn ${video_names}
```

示例：
```bash
python3 policies/act/data_process/raw_to_hdf5.py -md mujoco -dir data -tn block_place -vn cam_0 cam_1
```

将hdf5文件移动到RDT需要的地址：
```bash
mv data/hdf5/${task_name} policies/RDT/training_data
```

示例：
```bash
mv data/hdf5/block_place policies/RDT/training_data
```

### OpenPI

将仿真采集的原始数据格式转换为pi0算法中用到的hdf5格式：

```bash
cd DISCOVERSE
python3 policies/act/data_process/raw_to_hdf5.py -md mujoco -dir data -tn ${task_name} -vn ${video_names}
```

示例：
```bash
python3 policies/act/data_process/raw_to_hdf5.py -md mujoco -dir data -tn block_place -vn cam_0 cam_1
```

将hdf5文件移动到pi0需要的地址：
```bash
mv data/hdf5/${task_name} policies/openpi/training_data
cd policies/openpi/training_data/
scp instructions/${task_name}.json ${task_name}/instructions.json
cd ..
```

## 📚 下一步

数据准备完成后，您可以继续：

1. 选择合适的学习算法：
   - [ACT算法](./act.md)
   - [Diffusion Policy](./dp.md)
   - [RDT算法](./rdt.md)
   - [OpenPI算法](./openpi.md)

2. 开始训练策略模型

3. 在仿真环境中测试策略效果 