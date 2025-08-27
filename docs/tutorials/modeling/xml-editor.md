---
sidebar_position: 4
---

# XML Editor

# MuJoCo Scene XML Editor (DISCOVERSE Module)

## 1. Introduction

### 1.1 What is the MuJoCo Scene XML Editor?
The MuJoCo Scene XML Editor is a graphical tool based on PyQt5 and OpenGL, dedicated to creating and editing scene description files for the MuJoCo physics engine (Multi-Joint dynamics with Contact). MuJoCo uses the MJCF (MuJoCo XML Format) to define bodies, robots, lighting, textures, and physical properties in simulation environments.

The editor provides an intuitive 3D visual interface, allowing users to:
- Visually build scenes in 3D
- Edit object properties (size, mass, color, collision, etc.)
- Manage scene hierarchy
- Import/export MJCF files

Compared to manual MJCF XML coding, this editor greatly simplifies scene creation and tuning, especially for rapid iteration and visual validation.

### 1.2 Position in DISCOVERSE
This editor is a key submodule in DISCOVERSE, located at `submodules/XML-Editor/`. It enables efficient scene setup and modification for robotics simulation tasks.

### 1.3 MuJoCo and MJCF Overview
- **MuJoCo**: A powerful, fast, and accurate physics engine widely used in robotics, biomechanics, and machine learning.
- **MJCF**: A hierarchical XML format for describing simulation scenes, including bodies, geometries, joints, sensors, actuators, and more.

## 2. Features

- Visual editing: Real-time 3D preview
- Basic geometry support: box, sphere, cylinder, capsule, plane
- Transformation tools: translate, rotate, scale (global/local coordinates)
- Property editing: size, position, rotation, color, opacity, etc.
- Hierarchy management: parent-child relationships, grouping, reparenting
- Import/export MJCF XML
- Ray picking system for precise selection
- Custom gizmo controls for 3D manipulation

## 3. Installation Guide

### 3.1 System Requirements
- OS: Windows / macOS / Linux
- Python >= 3.7
- Graphics card supporting OpenGL 3.3+

### 3.2 Dependencies
Install the following Python libraries:
- PyQt5 >= 5.15.0
- NumPy >= 1.20.0
- PyOpenGL >= 3.1.0
- PyOpenGL_accelerate >= 3.1.0 (optional, recommended)

### 3.3 Installation Steps
1. Ensure the submodule is initialized:
```bash
git submodule update --init --recursive
```
2. Enter the submodule directory and install dependencies:
```bash
cd submodules/XML-Editor
pip install -r requirements.txt
```

## 4. Launch & Interface Overview

### 4.1 Launch
```bash
python -m xml_editor.main
```

### 4.2 Main Interface
The editor window includes:
- 3D view (center): display and interact with the MuJoCo scene
- Control panel (left): create geometry, select operation mode, coordinate system, save management
- Hierarchy panel (left): tree view of scene objects and parent-child relationships
- Properties panel (right): detailed properties of selected object
- Menu bar (top): file operations, edit, view, help

## 5. Usage Details

### 5.1 Scene Navigation
- Rotate view: left mouse drag
- Pan view: right mouse drag
- Zoom: mouse wheel
- Deselect: click empty space or press Esc

### 5.2 Create Geometry
Drag geometry buttons from the control panel into the 3D view to create objects (box, sphere, etc.).

### 5.3 Object Selection & Editing
- Select: left-click in 3D view or hierarchy tree
- Multi-select: Ctrl+click
- View/edit properties: right panel
- Edit properties: directly modify values (name, position, rotation, size, color, opacity)

### 5.4 Transformation Tools (Gizmo)
- Select operation mode: observe, translate, rotate, scale
- Use gizmo handles to manipulate objects in 3D
- Switch between global/local coordinates

### 5.5 Hierarchy Management
- Tree view for parent-child relationships
- Grouping, reparenting, copy/paste, delete, rename

### 5.6 Menu Bar Functions
- File: new, open, save, save as, exit
- Edit: undo, redo, copy, paste, delete
- View: reset view
- Help: about

### 5.7 Undo/Redo
Most operations are recorded for undo/redo. History is cleared on exit.

### 5.8 Save Points (JSON)
Quickly create temporary save points in JSON format for rapid scene iteration.

## 6. Example Workflow
1. Launch editor
2. Create ground plane and objects
3. Transform objects using gizmo
4. Manage hierarchy and group objects
5. Edit properties
6. Save scene as MJCF XML
7. (Optional) Create/load save points
8. Load MJCF into MuJoCo for validation

---

*We hope this guide helps you use the MuJoCo Scene XML Editor effectively in DISCOVERSE!*
