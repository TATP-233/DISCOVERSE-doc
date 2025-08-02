---
sidebar_position: 6
---

# OpenPI (Open-source Policy Interface)

OpenPI is a policy fine-tuning method based on pre-trained models, enabling rapid prototyping and few-shot learning using pre-trained models.

## 📊 Data Format Conversion

### Conversion Command

Convert the raw data collected in simulation to the HDF5 format used by the pi0 algorithm:

```bash
cd DISCOVERSE
python3 policies/act/data_process/raw_to_hdf5.py -md mujoco -dir data -tn ${task_name} -vn ${video_names}
```

#### Conversion Example

```bash
python3 policies/act/data_process/raw_to_hdf5.py -md mujoco -dir data -tn block_place -vn cam_0 cam_1
```

### Data Movement

Move the hdf5 file to the location required by pi0:

```bash
mv data/hdf5/${task_name} policies/openpi/training_data
cd policies/openpi/training_data/
scp instructions/${task_name}.json ${task_name}/instructions.json
cd ..
```

### Data Directory Structure

Place data for multiple tasks in training_data. Pi0 will train multiple tasks in one model. The directory structure is:
