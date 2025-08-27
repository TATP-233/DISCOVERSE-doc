---
sidebar_position: 5
---

# 使用指南

## BaseConfig 类

仿真环境的配置，包含以下内容：

- `mjcf_file_path`: 仿真场景文件，后缀为 `.xml` 或 `.mjb`。
- `timestep`: 物理仿真的时间步长，单位为秒。
- `decimation`: 下采样，每次调用 `step` 仿真的时间为 $decimation \times timestep$。
- `sync`: 时间同步。当设置为 `True` 时，会在 `step` 期间执行 sleep 以保持仿真时间速度与真实世界一致。建议在遥操作时设置为 `True`，在自动数据生成时设置为 `False`，这样会加速数据生成。
- `headless`: 无头模式。如果设置为 `True`，则不会显示可视化窗口。建议在没有显示器的设备上或自动数据生成期间设置为 `True`。
- `render_set`: 字典类型，用于设置渲染图像的帧率、宽度和高度。
- `obs_rgb_cam_id`: 整数列表，用于设置 RGB 图像采集相机的 ID。
- `obs_depth_cam_id`: 整数列表，用于设置深度图采集相机的 ID。
- `use_gaussian_renderer`: 当设置为 `True` 时，使用 3dgs 进行高保真渲染，否则使用 mujoco 原生渲染器。
    以下选项是高保真渲染独有的，使用 mujoco 原生渲染器时无需设置：
- `rb_link_list`: 机器人的身体名称。
- `obj_list`: 场景中被操作物体的身体名称。只有出现在 `rb_link_list` 和 `obj_list` 中的物体才会在 3dgs 渲染期间出现。
- `gs_model_dict`: 字典类型，其中键是身体名称，值是对应 3dgs ply 文件的路径。

## Step 函数

智能体通过 `step()` 函数与环境交互，执行动作，并接收下一个观测、特权观测、奖励、完成标志和其他附加信息。

```python
observation, privileged_observation, reward, done, info = env.step(action)
```

## 工具

在 `scripts` 路径下有一些常用的 Python 脚本：

- `convex_decomposition.ipynb`: [物体的凸分解](doc/convex decomposition.md)
- `urdf format`: 格式化 urdf 文件。
- `gaussainSplattingConvert.py`: 在二进制和 ASCII 编码之间转换 3dgs ply 模型。
- `gaussainSplattingTranspose.py`: 平移、旋转和缩放单个 3dgs ply 模型。

其他工具：

- [`obj2mjcf`](https://github.com/kevinzakka/obj2mjcf): 将 obj 文件转换为 mjcf 格式。
- 在终端中查看 mujoco 场景
    ```bash
    python3 -m mujoco.viewer --mjcf=<PATH-TO-MJCF-FILE>
    e.g.
    cd models/mjcf
    python3 -m mujoco.viewer --mjcf=mmk2_floor.xml
    ```
