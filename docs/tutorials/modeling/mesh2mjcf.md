---
sidebar_position: 2
---

# Mesh2MJCF

# Mesh2MJCF Tool Documentation

## 1. Introduction

### 1.1 What is a Mesh?
A mesh is a representation of a 3D model, composed of vertices, edges, and faces. Common mesh file formats include:
- OBJ: A simple 3D model format supporting vertices, texture coordinates, normals, and multiple materials.
- STL: Commonly used for 3D printing, contains only triangle face information.

### 1.2 What is MJCF?
MJCF (MuJoCo XML Configuration Format) is the configuration file format used by the MuJoCo physics engine. It uses XML syntax to describe a complete physical simulation environment or part of it (e.g., a robot model). MJCF files define:
- World parameters (gravity, timestep, solver settings, etc.)
- Bodies (hierarchical structure, parent-child relationships)
- Geometries (visual/collision shapes: sphere, box, mesh, etc.)
- Joints (degrees of freedom between bodies)
- Physical properties (mass, inertia, friction, damping)
- Assets (mesh files, textures, etc.)
- Sensors and actuators

**Key MJCF tags:**
- `<mujoco>`: Root element
- `<compiler>`: Compilation options (mesh directory, angle units, etc.)
- `<option>`: Global physical parameters
- `<asset>`: Resource definitions (mesh, texture, material)
- `<default>`: Default properties for elements
- `<worldbody>`: All bodies and lights in the scene
- `<include>`: Include other MJCF files for modular design

The core task of mesh2mjcf.py is to convert input mesh files into MJCF-compliant `.xml` files for use in MuJoCo.

## 2. Physical Concepts

Accurate definition of physical properties is crucial for simulation. mesh2mjcf.py allows users to specify mass and inertia tensor.

### 2.1 Mass
Mass determines how much matter an object contains and affects its behavior in simulation (force, gravity, collision response). Default: `0.001` kg.

### 2.2 Inertia Tensor
Describes resistance to angular acceleration. Specified as three principal moments of inertia. Default: `[2e-5, 2e-5, 2e-5]`.

## 3. Convex Decomposition

### 3.1 What is Convex Decomposition?
The process of representing a complex non-convex shape as a set of convex shapes. This improves collision detection efficiency and accuracy in simulation.

### 3.2 In MuJoCo
MuJoCo uses convex hulls for collision detection. For accurate physical interaction, complex meshes should be decomposed into multiple convex parts. mesh2mjcf.py uses the `coacd` library for this purpose.

## 4. MTL Material and Multi-material Support

MTL (Material Template Library) files define surface properties for OBJ meshes. mesh2mjcf.py supports automatic detection and processing of multi-material OBJ files, including texture handling and MJCF material definition.

## 5. Dependencies

To use all features of mesh2mjcf.py, install the following Python libraries:
- trimesh
- coacd (for convex decomposition)
- mujoco (for preview)

Install with:
```bash
pip install trimesh coacd mujoco
```

## 6. Usage

Run via command line:
```bash
python scripts/mesh2mjcf.py <input_file_path> [options]
```
Options include:
- `--rgba R G B A`: Set mesh color
- `--mass MASS`: Set mass
- `--diaginertia D D D`: Set inertia tensor
- `--free_joint`: Add free joint
- `-cd`/`--convex_decomposition`: Enable convex decomposition
- `--verbose`: Preview model

## 7. Examples

Basic conversion:
```bash
python scripts/mesh2mjcf.py /path/to/model.obj
```
Specify color:
```bash
python scripts/mesh2mjcf.py /path/to/model.stl --rgba 0.8 0.2 0.2 1.0
```
Add free joint:
```bash
python scripts/mesh2mjcf.py /path/to/model.obj --free_joint
```
Convex decomposition:
```bash
python scripts/mesh2mjcf.py /path/to/model.obj -cd
```
Preview model:
```bash
python scripts/mesh2mjcf.py /path/to/model.obj --verbose
```

## 8. Output Files

- Mesh files: `meshes/object/{asset_name}/`
- Asset dependency file: `mjcf/object/{asset_name}_dependencies.xml`
- Body definition file: `mjcf/object/{asset_name}.xml`
- For multi-material OBJ: sub-mesh files and textures
- For preview: `mjcf/_tmp_preview.xml`

With this tool, you can easily convert various 3D mesh files into MJCF format for MuJoCo simulation, supporting complex material handling and physical property settings.
