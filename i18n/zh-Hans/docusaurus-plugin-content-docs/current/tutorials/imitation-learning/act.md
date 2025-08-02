---
sidebar_position: 3
---

# ACT (Action Chunking with Transformers)

ACT (Action Chunking with Transformers) 是一种基于Transformer架构的模仿学习算法。

## 📊 数据格式转换

### 依赖安装

```bash
pip install -r policies/act/requirements/train_eval.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```

### 转换命令

将原始仿真数据转换为ACT算法所需的HDF5格式：

```bash
python3 policies/act/data_process/raw_to_hdf5.py -md mujoco -dir data -tn <task_name> -vn <video_names>
```

- `-md`: 转换模式，mujoco表示转换由discoverse仿真器采集的数据
- `-dir`: 数据存放的根目录，默认为data
- `-tn`: 任务名，程序将根据任务名从data目录中寻找相同名称的数据集文件夹
- `-vn`: 视频名，指定需要转换的视频文件名（无后缀），多个名称用空格隔开

转换后的数据存放于`discoverse/data/hdf5`文件夹中。

## 🎓 模型训练

### 训练配置

参考的训练配置文件位于`policies/act/configurations/task_configs/example_task.py`中，其中主要参数解释如下：
- `camera_names`: 训练数据中相机的序号
- `state_dim`: 训练数据中观测向量的维度
- `action_dim`: 训练数据中动作向量的维度
- `batch_size_train`: 训练时的batch_size大小
- `batch_size_validate`: 验证时的batch_size大小
- `chunk_size`: 单次预测的动作数量
- `num_epochs`: 训练的总步数
- `learning_rate`: 学习率

训练特定任务时，需要复制一份配置文件并重命名为任务名，后续将通过任务名索引相关配置文件。

### 数据集位置

仿真采集的数据默认位于discoverse仓库根目录的data文件夹中，而训练时默认从policies/act/data/hdf5中寻找数据。因此，建议使用软连接的方式将前者链接到后者，命令如下（注意修改命令中的路径，并且需要绝对路径）：

```bash
ln -sf /absolute/path/to/discoverse/data /absolute/path/to/discoverse/policies/act/data
```

### 训练命令

```bash
python3 policies/train.py act -tn <task_name>
```

其中`-tn`参数指定任务名，程序会根据任务名分别在`task_configs`和`act/data/hdf5`目录下寻找同名的配置文件和数据集。

### 训练结果

训练结果保存在`policies/act/my_ckpt`目录下。

## 🚀 策略推理

### 推理配置

推理配置文件可基于训练配置文件修改，其中主要参数解释如下：
- `max_timesteps`: 动作执行总步数，动作达到总步数后自动结束本次推理

### 推理命令

```bash
python3 policies/infer.py act -tn <task_name> -mts <max_timesteps> -ts <ckpt> -rn discoverse/examples/<tasks_folder>/<task_script>
```

示例：
```bash
python3 policies/infer.py act -tn block_place -mts 100 -ts 20250711-091004 -rn discoverse/examples/task_airbot_play/block_place
```

其中：
- `-tn` 任务名，程序会根据任务名分别在`task_configs`和`data`目录下寻找同名的配置文件和数据集
- `-mts` 动作执行总步数，该命令行参数会覆盖配置文件中的`max_timesteps`
- `-ts` 时间戳，对应训练得到的模型文件所在的以时间戳命名的文件夹，程序会根据任务名和时间戳在policies/act/my_ckpt目录下寻找对应的模型文件
- `-rn` 数据采集时使用的脚本文件路径，例如`discoverse/examples/tasks_airbot_play/drawer_open.py`，程序会加载其中的`SimNode`类和`AirbotPlayCfg`的实例`cfg`来创建仿真环境 