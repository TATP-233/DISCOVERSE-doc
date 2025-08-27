# DISCOVERSE 文档网站

本网站使用 [Docusaurus](https://docusaurus.io/) 构建。

## 安装依赖

```bash
npm install
```

## 清理缓存与构建目录（如遇构建异常建议执行）

```cmd
rd /s /q .docusaurus
rd /s /q build
```

## 构建

```bash
npm run build
```

此命令会将静态内容生成到 `build` 目录中，可以使用任何静态内容托管服务进行部署。


## 预览生产构建

```bash
npm run serve
```

如果没有自动启动浏览器进入网站，可以手动在浏览器中访问 http://localhost:3000 查看文档页面。

> ⚠️ 如需本地多语言预览，推荐使用 `npm run serve`，`npm start` 在部分环境下可能无法正常切换语言。

- `npm run serve`：预览已构建好的静态网站（build 目录），不支持热重载，适合本地预览生产效果。
- `npm start`：启动开发服务器，支持热重载，适合本地开发和调试。

## 一键构建和启动

### 使用 VS Code 任务
项目已配置了 VS Code 任务，可以一键完成构建和启动：

1. **快捷键方式**：按 `Ctrl+Shift+B`，选择 "Docusaurus Build and Serve"
2. **命令面板方式**：按 `Ctrl+Shift+P`，输入 "Tasks: Run Task"，选择 "Docusaurus Build and Serve"
3. **Task Button 方式**：如果安装了 Task Button 扩展，左下角会显示 🚀 Docusaurus 按钮，点击即可运行

### 手动命令
```bash
npm run build && npm run serve
```


## 手动部署到 GitHub Pages（gh-pages 分支）

如遇 Docusaurus 自动部署失败，可采用如下手动部署方法：

1. 在 `main` 分支下构建静态文件，将 build 目录内容复制到一个临时目录：
  ```bash
  npm run build
  cp -r build /tmp/discoverse-doc-build
  ```
2. 切换到 `gh-pages` 分支，清空分支内容，把刚刚复制的 build 目录内容复制到 gh-pages 分支根目录：
  ```bash
  git checkout gh-pages
  rm -rf *
  cp -r /tmp/discoverse-doc-build/* ./
  rm -rf /tmp/discoverse-doc-build*
  ```
3. 提交并推送：
  ```bash
  git add .
  git commit -m "deploy: update gh-pages"
  git push origin gh-pages --force
  ```

这样可确保 `build` 目录内容正确部署到 GitHub Pages。


### 🎯 GitHub Pages 配置检查

部署完成后，确保 GitHub 仓库设置正确：

1. 进入仓库 Settings → Pages
2. Source 选择 "Deploy from a branch"
3. Branch 选择 "gh-pages"
4. Folder 选择 "/ (root)"

---
## 多语言支持

本项目支持中英文双语，使用 Docusaurus 官方 i18n 功能。

### 多语言配置说明

- **英文内容**：位于 `docs/` 目录
- **中文内容**：位于 `i18n/zh-Hans/docusaurus-plugin-content-docs/current/` 目录
- **侧边栏本地化**：通过 JSON 翻译文件实现，而非独立的 sidebars.js

### 侧边栏翻译方式

Docusaurus 官方推荐使用 JSON 翻译文件来本地化侧边栏分组名：

1. **生成翻译文件**：
   ```bash
   npm run write-translations -- --locale zh-Hans
   ```

2. **修改翻译内容**：编辑 `i18n/zh-Hans/docusaurus-plugin-content-docs/current.json` 文件：
   ```json
   {
     "sidebar.tutorialSidebar.category.Get Started": {
       "message": "快速开始",
       "description": "The label for category Get Started in sidebar tutorialSidebar"
     },
     "sidebar.tutorialSidebar.category.Tutorials": {
       "message": "教程",
       "description": "The label for category Tutorials in sidebar tutorialSidebar"
     }
   }
   ```

3. **结果**：
   - 英文站点显示："Get Started" / "Tutorials"
   - 中文站点显示："快速开始" / "教程"

> ⚠️ **注意**：不要创建独立的 `i18n/zh-Hans/.../sidebars.js` 文件，应使用 JSON 翻译文件方式。这是 Docusaurus 官方推荐的标准做法。

