---
sidebar_position: 4
---

# Diffusion Policy

Diffusion Policy is an imitation learning algorithm based on diffusion models.

In this repository, both the dp and Diffusion-Policy modules implement the Diffusion Policy algorithm, but they come from different codebases and may differ in engineering structure or implementation details.

## 📊 Data Format Conversion

### Dependency Installation

```bash
pip install -r policies/dp/requirements.txt
```

### Conversion Command

Convert raw simulation data to the Zarr format required by the Diffusion Policy algorithm:

```bash
python3 policies/dp/raw2zarr.py -dir data -tn <task_name>
```

- `-dir`: Root directory for data storage, default is data
- `-tn`: Task name, the program will look for a dataset folder with the same name in the data directory

The converted data will be stored in the `discoverse/data/zarr` folder.

# dp

## 🎓 Model Training

### Training Configuration

The reference training configuration file is located at `policies/dp/configs/block_place.yaml`, with the main parameters explained as follows:
- `task_path`: During inference, the program loads the `SimNode` class and instance `cfg` to create the simulation environment
- `max_episode_steps`: Total number of action steps during inference
