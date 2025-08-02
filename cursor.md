# DISCOVERSE 技术文档网站建设记录

## 🎯 项目目标

为DISCOVERSE机器人仿真器创建专业的技术文档网站，整合现有文档并提供优秀的用户体验。

## 📋 核心需求分析

### 目标受众
- 机器人研究者和学者
- 工程师和开发者  
- 学生和初学者

### 功能优先级
1. **入门教程和快速开始** (最高优先级)
2. **最佳实践和案例展示** 
3. **详细的API参考文档**

### 技术需求
- **框架**: Docusaurus
- **主题**: 科技感深色主题
- **语言**: 双语支持 (英文优先)
- **部署**: GitHub Pages 或 Netlify
- **维护**: 支持多人协作工作流

## 🏗️ 网站架构设计

### 主要栏目结构 (基于现有内容)
```
├── 🏠 首页 / Home
├── 🚀 快速开始 / Get Started
│   ├── 安装指南 / Installation ✅
│   ├── 快速上手 / Quick Start ✅
│   ├── 基础概念 / Basic Concepts ✅
│   └── ~~第一个示例~~ (已删除，不符合仓库实际使用方式)
├── 📚 教程 / Tutorials  
│   ├── 基础仿真 / Basic Simulation ✅
│   │   ├── 概览 / Overview ✅
│   │   ├── 环境设置 / Environment Setup ✅
│   │   └── 机器人控制 / Robot Control ✅
│   ├── 传感器 / Sensors ✅ (基于现有sensors/目录)
│   │   ├── 传感器概览 / Overview ✅
│   │   └── 立体相机 / Stereo Camera (基于stereo_camera_zh.md)
│   ├── 模仿学习 / Imitation Learning ✅ (基于imitation_learning/目录)
│   │   ├── 概览 / Overview ✅
│   │   ├── 数据生成 / Data Generation ✅ (基于data.md)
│   │   ├── ACT / ACT ✅ (基于training.md和inference.md)
│   │   ├── Diffusion Policy / DP ✅ (基于training.md和inference.md)
│   │   ├── RDT / RDT ✅ (基于training.md和inference.md)
│   │   └── OpenPI / OpenPI ✅ (基于training.md和inference.md)
│   └── 数据生成 / Data Generation (基于data_generation/目录)
│       ├── 自动化数据生成 / Automated Data Generation (基于automated_data_generation.md)
│       └── 域随机化 / Domain Randomization (基于Randomain_zh.md)
├── 🎯 示例 / Examples
│   ├── 机器人平台 / Robot Platforms
│   │   ├── AirbotPlay 操作臂
│   │   ├── MMK2 双臂移动机器人
│   │   └── LeapHand 灵巧手
│   ├── 学习算法 / Learning Algorithms
│   │   ├── ACT 动作分块变换器
│   │   ├── Diffusion Policy 扩散策略
│   │   └── RDT 机器人扩散变换器
│   └── 应用场景 / Application Scenarios  
│       ├── 主动SLAM / Active SLAM
│       └── 多智能体协作 / Multi-Agent
├── 🔧 高级功能 / Advanced
│   ├── 3D高斯渲染 / 3D Gaussian Splatting (基于modeling/gs_edit_zh.md)
│   ├── 网格转换 / Mesh2MJCF (基于modeling/mesh2mjcf_zh.md)
│   ├── XML编辑器 / XML Editor (基于modeling/xml_editor.md)
│   ├── Docker部署 / Docker Deployment (基于docker.md)
│   └── 硬件集成 / Hardware Integration
├── 📖 API参考 / API Reference  
├── 🛠️ 故障排除 / Troubleshooting (基于troubleshooting.md)
└── 🤝 社区 / Community
    ├── 贡献指南 / Contributing
    ├── 常见问题 / FAQ  
    └── 技术支持 / Support
```

### 内容整合策略

#### 现有文档重组
1. **doc/** 目录文档
   - `troubleshooting.md` → Community/FAQ
   - `docker.md` → Get Started/Installation  
   - `automated_data_generation.md` → Advanced/Domain Randomization
   - `imitation_learning/` → Tutorials/Imitation Learning
   - `sensors/` → Tutorials/Sensors
   - `modeling/` → Advanced/3D Content

2. **README文档**
   - 核心特性 → Home页面展示
   - 安装指南 → Get Started/Installation
   - 使用示例 → Examples各子页面
   - 性能基准 → Benchmarks专页

3. **代码示例**
   - `discoverse/examples/` → Examples栏目
   - 按机器人类型和功能分类展示

## ✅ 任务清单

### Phase 1: 项目基础搭建 ✅
- [x] 创建工作记录文件
- [x] 初始化Docusaurus项目
- [x] 配置深色主题
- [x] 设置双语支持 (i18n)
- [x] 配置基础导航结构

### Phase 2: 内容迁移与优化 ✅
- [x] 创建首页 (特色展示)
- [x] 快速开始指南 (基于README_zh.md内容)
- [x] 基础教程页面
- [x] 现有文档内容迁移
- [x] 代码示例整理
- [x] 图片和视频资源处理

### Phase 3: 高级功能与优化
- [ ] API文档生成
- [ ] 交互式组件
- [ ] 用户反馈系统 (GitHub Issues集成)
- [ ] 性能优化
- [ ] SEO优化

### Phase 4: 部署与维护
- [ ] 配置自动化部署
- [ ] 测试双语切换
- [ ] 移动端适配检查
- [ ] 建立维护工作流

## 🎨 设计规范

### 主题特色
- **主色调**: 深蓝/黑色科技风
- **强调色**: 机器人蓝/绿色
- **字体**: 现代简洁，代码等宽
- **布局**: 响应式，移动优先

### 内容呈现
- **代码块**: 语法高亮，复制按钮
- **图片**: 支持放大查看，懒加载
- **视频**: 嵌入式播放器
- **表格**: 响应式设计

## 🔄 更新记录

### 2025-01-21 (第一次更新)
- [x] 初始化项目记录
- [x] 完成需求分析
- [x] 设计网站架构
- [x] 开始Docusaurus项目搭建
- [x] 配置深色科技风主题
- [x] 设置双语支持框架
- [x] 创建基础导航结构
- [x] 修改首页展示DISCOVERSE特色
- [x] 创建Get Started部分文档
  - [x] 安装指南 (installation.md)
  - [x] 快速开始 (quick-start.md) 
  - [x] 基本概念 (basic-concepts.md)
  - [x] 第一个示例 (first-example.md)
- [x] 完成基础仿真教程系列
  - [x] 概览 (tutorials/basic-simulation/overview.md)
  - [x] 环境设置 (tutorials/basic-simulation/environment-setup.md)
  - [x] 机器人控制 (tutorials/basic-simulation/robot-control.md)
- [x] 完成传感器教程系列
  - [x] 传感器概览 (tutorials/sensors/overview.md)
  - [x] 立体相机详解 (tutorials/sensors/stereo-camera.md)
- [x] 完成模仿学习教程系列
  - [x] 模仿学习概览 (tutorials/imitation-learning/overview.md)
  - [x] 数据收集与处理 (tutorials/imitation-learning/data-collection.md)
- [x] 完成数据生成教程
  - [x] 数据生成概览 (tutorials/data-generation/overview.md)
  - [x] 域随机化技术 (tutorials/data-generation/domain-randomization.md)
- [x] 更新主要栏目结构，反映实际内容

### 2025-01-21 (第二次更新 - 中文化改进)
- [x] **独立仓库适配**: 确保discoverse-docs可作为独立仓库运行
  - [x] 移除对父目录文件的依赖
  - [x] 修复文档路径问题
  - [x] 调整配置避免断开链接影响构建
- [x] **按钮样式优化**: 
  - [x] 修复深色模式下Get Started按钮颜色不一致问题
  - [x] 统一所有按钮使用button--secondary样式
  - [x] 改善Star on GitHub和Read Paper按钮可见性
- [x] **深色模式文字改进**:
  - [x] 首页标题、副标题、描述文字使用浅色以提高对比度
  - [x] 确保深色背景下文字清晰可读
- [x] **性能基准表格居中**: 优化表格布局和标题显示
- [x] **get-started中文化重写**:
  - [x] 删除first-example.md (不符合实际使用方式)
  - [x] 基于README_zh.md重写installation.md为中文版本
  - [x] 基于README_zh.md重写quick-start.md为中文版本  
  - [x] 基于README_zh.md重写basic-concepts.md为中文版本
  - [x] 更新sidebars.ts移除first-example引用
- [x] **内容质量提升**:
  - [x] 所有安装指南基于实际README内容
  - [x] 快速开始指南包含真实的使用示例
  - [x] 基本概念详细解释框架架构和核心特性
  - [x] 添加故障排除和获取帮助信息

### 2025-01-21 (第三次更新 - 模仿学习章节重新生成)
- [x] **模仿学习章节完整重构**:
  - [x] 重新生成overview.md - 简化为算法概览和导航
  - [x] 重新生成data-generation.md - 严格基于doc/imitation_learning/data.md内容
  - [x] 重新生成act.md - 严格基于原始training.md和inference.md的ACT部分
  - [x] 重新生成dp.md - 严格基于原始training.md和inference.md的DP部分
  - [x] 新建rdt.md - 严格基于原始training.md和inference.md的RDT部分
  - [x] 新建openpi.md - 严格基于原始training.md和inference.md的OpenPI部分
- [x] **内容准确性保证**:
  - [x] 移除所有原始文档中不存在的内容
  - [x] 确保所有代码示例、参数说明、命令格式与原始文档一致
  - [x] 保持原始文档的技术深度，不添加额外解释
- [x] **导航结构更新**:
  - [x] 更新sidebars.ts包含所有新创建的模仿学习文档
  - [x] 修正TypeScript类型问题，确保构建正常
- [x] **目录结构**:
  ```
  tutorials/imitation-learning/
  ├── overview.md          # 算法概览
  ├── data-generation.md   # 数据生成 (基于data.md)
  ├── act.md               # ACT算法 (基于training.md/inference.md)
  ├── dp.md                # Diffusion Policy (基于training.md/inference.md)
  ├── rdt.md               # RDT算法 (基于training.md/inference.md)
  └── openpi.md            # OpenPI算法 (基于training.md/inference.md)
  ```

### 2025-01-21 (第四次更新 - 构建问题修复)
- [x] **构建错误修复**:
  - [x] 识别并解决sidebars.ts中不存在文档引用问题
  - [x] 移除'intro'引用 (文档不存在)
  - [x] 移除'api/placeholder'引用 (api目录为空)
  - [x] 简化导航结构，移除API参考部分
- [x] **构建成功验证**:
  - [x] npm run build成功执行
  - [x] 支持双语构建 (en + zh-Hans)
  - [x] 生成静态文件到build目录
  - [x] 所有模仿学习文档正确构建和渲染
- [x] **后续优化建议**:
  - [x] 记录检测到的断开链接(警告级别，不影响构建)
  - [x] 为未来扩展预留API参考、故障排除等栏目的实现计划

### 2025-08-01 (第五次更新 - Modeling文档迁移)
- [x] **Modeling文档模块迁移**:
  - [x] 创建modeling教程目录结构
  - [x] 创建overview.md概览文档，介绍三个建模工具
  - [x] 迁移xml-editor.md完整文档 (MuJoCo场景编辑器)
  - [x] 迁移mesh2mjcf.md完整文档 (网格转MJCF工具)
  - [x] 迁移gaussian-splatting.md完整文档 (3D高斯溅射编辑器)
- [x] **导航结构更新**:
  - [x] 更新sidebars.ts添加"3D建模与编辑"分类
  - [x] 包含所有四个modeling相关文档
- [x] **内容准确性保证**:
  - [x] 严格基于DISCOVERSE/doc/modeling/目录原始文档
  - [x] 保持所有技术细节、命令格式和参数说明不变
  - [x] 完整保留所有使用示例和注意事项
- [x] **文档质量**:
  - [x] 保持原有的详细技术深度
  - [x] 完整的安装指南和依赖说明
  - [x] 详细的命令行参数和使用示例
  - [x] 清晰的概念解释和工作流程
- [x] **目录结构**:
  ```
  tutorials/modeling/
  ├── overview.md              # 建模工具概览
  ├── xml-editor.md            # MuJoCo场景编辑器 (基于xml_editor.md)
  ├── mesh2mjcf.md             # 网格转换工具 (基于mesh2mjcf_zh.md)
  └── gaussian-splatting.md    # 3D高斯溅射编辑器 (基于gs_edit_zh.md)
  ```

### 2025-08-02 (第六次更新 - 多语言开发与本地预览经验补充)
- [x] 明确记录：Docusaurus 多语言开发建议使用 `npm run serve` 进行本地预览，`npm start` 在部分环境下多语言切换可能异常。
- [x] README.md、cursor.md 均已补充相关说明，便于团队成员和用户理解最佳实践。
- [x] 所有文档结构、i18n 配置、构建产物均符合官方规范，静态构建和部署无障碍。
- [x] 多语言文档英文版本同步：已完成 get-started 目录下 installation.md、quick-start.md、basic-concepts.md 的英文翻译与内容同步，优先参考 DISCOVERSE 主仓库内容，无则基于中文自动翻译生成。

### 2025-08-02 (第七次更新 - 侧边栏多语言翻译方式修正)
- [x] **侧边栏多语言翻译问题解决**:
  - [x] 发现并修正 Docusaurus 侧边栏本地化的正确方式
  - [x] 删除错误的独立 `sidebars.js` 文件方式
  - [x] 采用官方推荐的 JSON 翻译文件方式
- [x] **实现步骤**:
  - [x] 使用 `npm run write-translations -- --locale zh-Hans` 生成翻译文件
  - [x] 修改 `i18n/zh-Hans/docusaurus-plugin-content-docs/current.json` 
  - [x] 将 "Get Started" → "快速开始", "Tutorials" → "教程"
  - [x] 删除多余的 `i18n/.../sidebars.js` 文件
- [x] **技术原理**:
  - [x] 英文站点使用 `docs/sidebars.js` 结构和标签
  - [x] 中文站点使用相同结构，但通过 JSON 文件翻译标签
  - [x] 这是 Docusaurus 官方标准的 i18n 侧边栏本地化方式
- [x] **文档更新**:
  - [x] README.md 添加多语言支持和侧边栏翻译说明
  - [x] cursor.md 记录完整的问题发现和解决过程
  - [x] 为团队提供正确的多语言开发指导

## 📝 注意事项

### 内容策略
1. **分层展示**: 复杂技术文档按难度分层
2. **循序渐进**: 从基础到高级逐步深入
3. **实用导向**: 重点突出实际应用价值
4. **社区友好**: 提供清晰的贡献途径

### 技术考虑
1. **性能**: 图片优化，代码分割
2. **可访问性**: 支持屏幕阅读器
3. **多语言**: 保持内容同步更新
4. **维护性**: 清晰的文件组织结构
5. **本地预览建议**: Docusaurus 多语言开发建议使用 `npm run serve` 预览，`npm start` 在部分环境下多语言切换可能异常。

### 独立仓库要求
1. **路径独立**: 所有链接相对于discoverse-docs目录
2. **内容自包含**: 不依赖父目录的README或文档
3. **构建稳定**: 处理断开链接警告，确保构建成功
4. **部署就绪**: 可直接部署为独立网站

### 内容准确性原则
1. **忠实原文**: 严格基于原始文档内容，不添加不存在的信息
2. **技术准确**: 所有命令、参数、代码示例与原始文档一致
3. **结构清晰**: 保持原始文档的逻辑结构和技术深度
4. **定期更新**: 当原始文档更新时同步更新网站文档

### 构建状态
1. **当前状态**: ✅ 构建成功，可正常部署
2. **警告处理**: 断开链接仅为警告级别，不影响功能
3. **部署准备**: 静态文件已生成，支持双语访问
4. **测试建议**: 使用`npm run serve`本地预览

### 待确认事项
- [ ] 确定最终部署平台 (GitHub Pages vs Netlify)
- [ ] 视频托管方案 (GitHub LFS vs 外部CDN)
- [ ] 域名设置
- [ ] 分析工具集成 (Google Analytics等)

---

*最后更新: 2025-08-02*
*负责人: [当前开发者]*
*状态: Modeling文档迁移完成，构建成功，可部署状态*