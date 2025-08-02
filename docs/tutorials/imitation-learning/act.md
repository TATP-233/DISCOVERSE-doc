---
sidebar_position: 3
---

# ACT (Action Chunking with Transformers)

ACT (Action Chunking with Transformers) is an imitation learning algorithm based on the Transformer architecture.

## 📊 Data Format Conversion

### Dependency Installation

```bash
pip install -r policies/act/requirements/train_eval.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```

### Conversion Command

Convert raw simulation data to the HDF5 format required by the ACT algorithm:

```bash
python3 policies/act/data_process/raw_to_hdf5.py -md mujoco -dir data -tn <task_name> -vn <video_names>
```

- `-md`: Conversion mode, mujoco means converting data collected by the discoverse simulator
- `-dir`: Root directory for data storage, default is data
- `-tn`: Task name, the program will look for a dataset folder with the same name in the data directory
- `-vn`: Video name, specify the video file names to convert (without extension), separate multiple names with spaces

The converted data will be stored in the `discoverse/data/hdf5` folder.

## 🎓 Model Training

### Training Configuration

The reference training configuration file is located at `policies/act/configurations/task_configs/example_task.py`, with the main parameters explained as follows:
- `camera_names`: Camera indices in the training data
- `state_dim`: Dimension of the observation vector in the training data
- `action_dim`: Dimension of the action vector in the training data
- `batch_size_train`: Batch size during training
