---
id: installation
sidebar_position: 1
---


# Installation Guide

DISCOVERSE is a unified, modular open-source 3DGS robot simulation framework supporting the Real2Sim2Real learning workflow. This guide will help you install and configure DISCOVERSE on your system.

## System Requirements

### Minimum Requirements
- **Python 3.8+**
- **Operating System**: Linux (Ubuntu 18.04+), macOS, or Windows 10+
- **Memory**: At least 8GB RAM

### Recommended Configuration
- **Python 3.10**
- **CUDA 11.8+** (for 3DGS rendering)
- **NVIDIA GPU** (8GB+ VRAM recommended)
- **Git LFS** (for model file management)

## Quick Installation

### 1. Clone the Repository

```bash
git clone https://github.com/TATP-233/DISCOVERSE.git
cd DISCOVERSE
```

:::tip Recommendation
It is recommended to download submodules as needed, rather than using the `--recursive` flag to fetch all at once. This saves time and storage.
:::

### 2. Create a Virtual Environment

```bash
conda create -n discoverse python=3.10
conda activate discoverse
```
