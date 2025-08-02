---
sidebar_position: 5
---

# RDT (Robotics Diffusion Transformer)

RDT (Robotics Diffusion Transformer) is a large model method combining diffusion models and Transformers, supporting unified modeling of multiple tasks and offering strong generalization capabilities.

## 📊 Data Format Conversion

### Conversion Command

Convert the raw data collected in simulation to the HDF5 format used by the RDT algorithm:

```bash
python3 policies/act/data_process/raw_to_hdf5.py -md mujoco -dir data -tn ${task_name} -vn ${video_names}
```

#### Conversion Example

```bash
# Example conversion
python3 policies/act/data_process/raw_to_hdf5.py -md mujoco -dir data -tn block_place -vn cam_0 cam_1
```

### Data Movement

Move the hdf5 file to the location required by RDT:

```bash
mv data/hdf5/${task_name} policies/RDT/training_data
```

#### Example

```bash
mv data/hdf5/block_place policies/RDT/training_data
```
