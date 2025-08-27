---
sidebar_position: 3
---

# Gaussian Splatting

# 3D Gaussian Splatting Model Editing Guide

## 1. Introduction

### 1.1 What is 3D Gaussian Splatting?
3D Gaussian Splatting (3DGS) is a novel scene representation and rendering technology. It uses millions of oriented 3D Gaussian functions to represent a scene. Each Gaussian has position, shape (defined by covariance matrix or equivalent scale/rotation parameters), color (often using spherical harmonics for view-dependent effects), and opacity.

3DGS enables high-fidelity real-time rendering of complex scenes and excels in inverse rendering (reconstructing 3D scenes from images).

### 1.2 3DGS PLY File Format
3DGS models are typically stored as `.ply` files. Unlike traditional mesh `.ply` files, 3DGS `.ply` files contain specific properties for each Gaussian function, such as position, color coefficients, opacity, scale, and rotation.

## 2. gsply_edit.py Script Introduction

This repository provides a Python script for editing 3DGS models: `scripts/gsply_edit.py`. It allows users to perform translation, rotation, and scaling operations on 3DGS models.

**Core functions:**
- Geometric transformation: modify the position of each Gaussian
- Orientation adjustment: rotate each Gaussian
- Scale adjustment: resize each Gaussian
- Spherical harmonics (SH) rotation: automatically update SH coefficients for consistent view-dependent appearance

## 3. Dependencies

Required Python libraries:
- numpy
- scipy
- torch
- einops
- e3nn
- tqdm

Install with:
```bash
pip install numpy scipy torch einops e3nn tqdm
```

## 4. Key Concepts

### 4.1 Transformations
Supported operations:
- Translation (X, Y, Z)
- Rotation (quaternion)
- Scaling

### 4.2 Transformation Order
When specifying translation, rotation, and scaling together, the script applies them in the following order:
1. Rotation
2. Translation
3. Scaling

### 4.3 Spherical Harmonics (SH)
SH are used to represent the view-dependent color of each Gaussian. When a Gaussian is rotated, its SH coefficients are also rotated to maintain correct appearance.

### 4.4 Gaussian Parameters
Each Gaussian is defined by:
- Position (x, y, z)
- Rotation (rot_0, rot_1, rot_2, rot_3)
- Scale (scale_0, scale_1, scale_2)
- Opacity

## 5. Script Usage

Command line format:
```bash
python scripts/gsply_edit.py <input_file> [options]
```
Options include:
- `-o, --output_file`: Output file path
- `-t, --transform x y z`: Translation vector
- `-r, --rotation x y z w`: Quaternion rotation
- `-s, --scale S`: Uniform scaling factor

## 6. Usage Examples

Translate:
```bash
python scripts/gsply_edit.py data/scene.ply -o data/scene_translated.ply -t 0.5 0.0 -0.2
```
Rotate:
```bash
python scripts/gsply_edit.py data/scene.ply -o data/scene_rotated.ply -r 0.0 0.0 0.38268343 0.92387953
```
Scale:
```bash
python scripts/gsply_edit.py data/scene.ply -o data/scene_scaled.ply -s 2.0
```
Combined transformation:
```bash
python scripts/gsply_edit.py data/000000.ply -o data/000000_transpose.ply -t 0.3 0.4 -0.5 -r 0. 0. 0.38268343 0.92387953 -s 1.5
```

## 7. Online Editing Tools

In addition to the script, you can use online tools for visual editing:
[3dgs Online Editor (SuperSplat Editor)](https://superspl.at/editor)
Features include:
1. Translation
2. Rotation
3. Scaling
4. Multi-selection
5. Deletion
6. Switching rendering modes

By combining precise script-based control and online visual editing, you can efficiently process and optimize 3D Gaussian Splatting models for high-quality assets in DISCOVERSE simulation environments.
