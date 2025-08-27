#!/bin/bash
# 一键部署 Docusaurus 到 gh-pages 分支

set -e

echo "🚀 开始部署过程..."

# 0. 提示用户保存所有文件
echo "⚠️  请先保存所有文件！"
read -p "✅ 确认已保存所有文件，按回车继续..." -r

# 1. 构建静态文件
echo "[1/8] 开始构建静态文件..."
npm run build

# 2. 创建工程目录备份
echo "[2/8] 创建工程目录备份..."
CURRENT_BRANCH=$(git branch --show-current)
BACKUP_DIR="../DISCOVERSE-doc-backup/$(date +%Y%m%d-%H%M%S)"
echo "当前分支: $CURRENT_BRANCH"
echo "备份目录: $BACKUP_DIR"

# 确保备份父目录存在
mkdir -p "../DISCOVERSE-doc-backup"
cp -r ../"$(basename "$(pwd)")" "$BACKUP_DIR"
echo "✅ 工程目录已备份到: $BACKUP_DIR"

# 3. 同步本地与远程，确保分支切换正常
echo "[3/8] 同步本地与远程分支..."
# 先获取远程分支信息
if git fetch origin; then
    echo "✅ 远程分支已同步"
    
    # 重置本地修改以便顺利切换分支
    echo "🔄 重置本地修改以便切换分支..."
    if git reset --hard HEAD; then
        echo "✅ 本地状态已重置"
    else
        echo "❌ 本地状态重置失败"
        echo "💡 后续步骤："
        echo "   自动恢复现场..."
        rsync -a --delete "$BACKUP_DIR"/ ./
        echo "✅ 已用备份恢复项目文件夹"
        echo "   2. 检查 git 状态: git status"
        echo "   3. 重新运行脚本"
        exit 1
    fi
else
    echo "❌ 远程分支同步失败"
    echo "💡 后续步骤："
    echo "   自动恢复现场..."
    rsync -a --delete "$BACKUP_DIR"/ ./
    echo "✅ 已用备份恢复项目文件夹"
    echo "   2. 手动执行: git fetch origin"
    echo "   3. 重新运行脚本"
    exit 1
fi

# 4. 切换到 gh-pages 分支
echo "[4/8] 切换到 gh-pages 分支..."
if git checkout gh-pages; then
    echo "✅ 已切换到 gh-pages 分支"
else
    echo "❌ 切换分支失败"
    echo "💡 后续步骤："
    echo "   自动恢复现场..."
    rsync -a --delete "$BACKUP_DIR"/ ./
    echo "✅ 已用备份恢复项目文件夹"
    echo "   2. 检查分支状态: git branch -a"
    echo "   3. 手动切换: git checkout gh-pages"
    echo "   4. 重新运行脚本"
    exit 1
fi

# 5. 清空当前工程目录并用备份中的 build 目录覆盖
echo "[5/8] 清空工程目录并用 build 内容覆盖..."
if find . -maxdepth 1 ! -name '.*' ! -name '.' ! -name '..' -exec rm -rf {} + && cp -r "$BACKUP_DIR/build"/* ./; then
    echo "✅ 已用备份中的 build 内容覆盖当前目录"
else
    echo "❌ 文件操作失败"
    echo "💡 后续步骤："
    echo "   自动恢复现场..."
    rsync -a --delete "$BACKUP_DIR"/ ./
    echo "✅ 已用备份恢复项目文件夹"
    echo "   3. 检查备份目录: ls -la \"$BACKUP_DIR/build\""
    echo "   4. 重新运行脚本"
    exit 1
fi

# 6. 提交并推送
echo "[6/8] 提交并推送到远程 gh-pages 分支..."
if git add .; then
    echo "✅ 文件已暂存"
else
    echo "❌ 文件暂存失败"
    echo "💡 后续步骤："
    echo "   自动恢复现场..."
    rsync -a --delete "$BACKUP_DIR"/ ./
    echo "✅ 已用备份恢复项目文件夹"
    echo "   3. 检查 git 状态: git status"
    echo "   4. 重新运行脚本"
    exit 1
fi

# 检查是否有变更需要提交
if git diff --staged --quiet; then
    echo "ℹ️  没有新的变更需要提交"
else
    if git commit -m "deploy: update gh-pages $(date '+%Y-%m-%d %H:%M:%S')"; then
        echo "✅ 提交成功"
        
        if git push origin gh-pages --force; then
            echo "✅ 推送成功！"
        else
            echo "❌ 推送失败，可能是网络问题"
            echo "💡 后续步骤："
            echo "   自动恢复现场..."
            rsync -a --delete "$BACKUP_DIR"/ ./
            echo "✅ 已用备份恢复项目文件夹"
            echo "   2. 稍后手动执行: git push origin gh-pages --force"
            echo "   3. 或切回 main 分支继续: git checkout main"
        fi
    else
        echo "❌ 提交失败"
        echo "💡 后续步骤："
        echo "   自动恢复现场..."
        rsync -a --delete "$BACKUP_DIR"/ ./
        echo "✅ 已用备份恢复项目文件夹"
        echo "   2. 手动提交: git commit -m 'deploy: update gh-pages'"
        echo "   3. 手动推送: git push origin gh-pages --force"
        exit 1
    fi
fi

# 7. 切回 main 分支
echo "[7/8] 切换回 $CURRENT_BRANCH 分支..."
if git checkout "$CURRENT_BRANCH"; then
    echo "✅ 已切换回 $CURRENT_BRANCH 分支"
else
    echo "❌ 切换分支失败"
    echo "💡 后续步骤："
    echo "   自动恢复现场..."
    rsync -a --delete "$BACKUP_DIR"/ ./
    echo "✅ 已用备份恢复项目文件夹"
    echo "   3. 检查分支状态: git branch -a"
    exit 1
fi

# 8. 清空工程目录并用备份覆盖
echo "[8/8] 清空工程目录并用备份覆盖..."
if find . -maxdepth 1 ! -name '.*' ! -name '.' ! -name '..' -exec rm -rf {} + && cp -r "$BACKUP_DIR"/* ./; then
    echo "✅ 已用备份覆盖当前工程目录"
else
    echo "❌ 工程目录恢复失败"
    echo "💡 后续步骤："
    echo "   自动恢复现场..."
    rsync -a --delete "$BACKUP_DIR"/ ./
    echo "✅ 已用备份恢复项目文件夹"
    echo "   2. 检查备份目录: ls -la \"$BACKUP_DIR\""
    echo "   3. 检查当前目录: ls -la"
    exit 1
fi

echo ""
echo "✅ 部署完成！"
echo "🌐 GitHub Pages 地址: https://tatp-233.github.io/DISCOVERSE-doc/"
echo "📁 备份位置: $BACKUP_DIR"
echo ""

# 询问是否保留备份
read -p "🗂️  是否保留备份？输入y保留，直接回车删除 (y/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "✅ 备份已保留在: $BACKUP_DIR"
    echo "💡 手动清理命令: rm -rf \"$BACKUP_DIR\""
else
    echo "🧹 正在清理备份..."
    if rm -rf "$BACKUP_DIR"; then
        echo "✅ 备份已清理"
    else
        echo "❌ 备份清理失败，请手动删除: $BACKUP_DIR"
    fi
fi
