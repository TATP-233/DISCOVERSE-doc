---
sidebar_position: 2
---

# Data Generation

Data generation is the first step in imitation learning. DISCOVERSE provides automated data collection tools.

## 🎯 Automated Data Collection

DISCOVERSE provides several single-arm and dual-arm manipulation tasks, located in `discoverse/examples/tasks_airbot_play` and `discoverse/examples/tasks_mmk2`.

### Automated Collection Command

To automatically collect data, run:

```bash
cd scripts
python tasks_data_gen.py --robot_name <ROBOT_NAME> --task_name <TASK_NAME> --track_num <NUM_TRACK> --nw <NUM_OF_WORKERS>
```

#### Example

```bash
python tasks_data_gen.py --robot_name airbot_play --task_name kiwi_place --track_num 100 --nw 8
```

This means using the airbot_play robotic arm, the task is kiwi placement, generating 100 task trajectories in total, and using 8 processes to generate data in parallel.

## 🔄 Data Format Conversion

Different imitation learning algorithms require different data formats:

### ACT

Convert the raw data collected in simulation to the hdf5 format used by the ACT algorithm:

```bash
python3 policies/act/data_process/raw_to_hdf5.py -md mujoco -dir data -tn <task_name> -vn <video_names>
```
