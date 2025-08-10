# Think Chat

> 基于 ThinkAI 的智能对话系统DEMO

一个现代化的AI对话平台，提供流畅的用户体验和强大的后端支持。支持SSE流式响应、Markdown渲染、本地历史存储等特性。

## ✨ 项目特色

### 🎯 核心功能
- **智能对话**: 支持大模型API接入，提供智能问答服务
- **流式响应**: 基于SSE的实时流式数据传输
- **富文本支持**: 完整的Markdown渲染，支持代码高亮、表格等
- **历史管理**: 本地消息历史存储，无需服务端状态管理
- **响应式设计**: 完美适配桌面端和移动端设备

### 🏗️ 技术架构
- **后端**: ThinkPHP 框架，提供RESTful API
- **前端**: React + TypeScript + TailwindCSS
- **构建**: Vite 现代化构建工具
- **通信**: SSE (Server-Sent Events) 流式通信
- **存储**: localStorage 本地存储方案

## 🛠️ 技术栈

### 后端技术
| 技术 | 版本 | 用途 |
|------|------|------|
| **ThinkPHP** | 8.x | PHP Web框架 |
| **PHP** | >= 8.0 | 服务端语言 |

### 前端技术
| 技术 | 版本 | 用途 |
|------|------|------|
| **React** | ^18.2.0 | 前端框架 |
| **TypeScript** | ^5.2.2 | 类型系统 |
| **Vite** | ^5.2.0 | 构建工具 |
| **TailwindCSS** | ^3.4.3 | 样式框架 |
| **React Markdown** | ^9.0.1 | Markdown渲染 |

## 🚀 快速开始

### 📋 环境要求

| 环境 | 版本要求 | 说明 |
|------|----------|------|
| **PHP** | >= 8.0 | 服务端运行环境 |
| **Composer** | >= 2.0 | PHP包管理器 |
| **Node.js** | >= 16.0 | 前端构建环境 |
| **pnpm** | >= 7.0 | 前端包管理器 |

### ⚡ 安装步骤

#### 1. 克隆项目
```bash
git clone <repository-url>
cd think-chat
```

#### 2. 安装后端依赖
```bash
# 安装PHP依赖
composer install

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，配置AI_TOKEN
```

#### 3. 启动服务端
```bash
# 启动后端服务 (在项目根目录)
php think run

```

#### 3. 前端开发（可选）
```bash
# 进入前端目录
cd asset

# 安装依赖
pnpm install

# 启动前端开发服务器 (在asset目录)
pnpm run dev
```

### 🌐 访问地址

- **后端访问地址**: http://localhost:8000
- **前端开发服务器**: http://localhost:3000
