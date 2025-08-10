# Think Chat Frontend

> 基于现代技术栈构建的智能对话前端界面

一个功能完整、设计精美的大模型对话界面，支持实时流式响应、Markdown渲染和本地历史存储。

## ✨ 核心特性

### 🎨 界面设计
- **现代化UI**: 简洁优雅的聊天界面设计
- **响应式布局**: 完美适配桌面端和移动端
- **流畅动画**: 消息加载、发送等交互动效
- **主题定制**: 基于TailwindCSS的可定制样式系统

### 💬 对话功能
- **一问一答结构**: 逻辑清晰的消息组织方式
- **实时流式响应**: 支持SSE流式数据接收
- **Markdown渲染**: 完整支持代码高亮、表格、链接等
- **输入状态指示**: 优雅的loading效果

### 🔧 技术特性
- **TypeScript**: 完整的类型安全保障
- **SSE代理**: 开发时自动代理到后端服务
- **本地存储**: 消息历史自动保存到localStorage
- **热更新**: 基于Vite的快速开发体验

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| **Vite** | ^5.2.0 | 构建工具，提供快速的开发体验 |
| **React** | ^18.2.0 | 前端框架，组件化开发 |
| **TypeScript** | ^5.2.2 | 类型系统，提供类型安全 |
| **TailwindCSS** | ^3.4.3 | 样式框架，原子化CSS |
| **React Markdown** | ^9.0.1 | Markdown渲染引擎 |
| **pnpm** | latest | 包管理器，快速且节省空间 |

### 🔌 核心依赖

```json
{
  "react-markdown": "^9.0.1",    // Markdown渲染
  "remark-gfm": "^4.0.0",        // GitHub风格Markdown
  "tailwind-scrollbar": "^3.1.0" // 自定义滚动条
}
```

## 🚀 快速开始

### 📋 环境要求

| 环境 | 版本要求 | 说明 |
|------|----------|------|
| **Node.js** | >= 16.0.0 | JavaScript运行环境 |
| **pnpm** | >= 7.0.0 | 推荐的包管理器 |
| **现代浏览器** | - | 支持ES2020+的浏览器 |

### ⚡ 一键启动

```bash
# 克隆项目 (如果需要)
git clone <repository-url>
cd think-chat/asset

# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev
```

🌐 **访问地址**: http://localhost:3000/

### 🔨 可用脚本

```bash
# 开发模式 (热更新)
pnpm run dev

# 生产构建
pnpm run build

# 预览构建结果
pnpm run preview

# 类型检查
pnpm run type-check
```

### 📦 Windows快捷脚本

```bash
# 开发模式
dev.bat

# 生产构建
build.bat
```

## 📁 项目结构

```
asset/                          # 前端项目根目录
├── src/                        # 源代码目录
│   ├── components/             # React组件
│   │   ├── chat-header.tsx     # 📋 聊天头部 (标题、清空按钮)
│   │   ├── chat-input.tsx      # ⌨️  输入框组件 (消息输入、发送)
│   │   ├── message-pair.tsx    # 💬 消息对组件 (问答显示)
│   │   └── message-list.tsx    # 📜 消息列表 (滚动容器)
│   ├── utils/                  # 工具函数
│   │   └── api.ts              # 🔌 API工具 (SSE、localStorage)
│   ├── types/                  # TypeScript类型
│   │   └── index.ts            # 📝 类型定义 (MessagePair等)
│   ├── app.tsx                 # 🏠 主应用组件
│   ├── main.tsx                # 🚀 应用入口
│   └── index.css               # 🎨 全局样式 (TailwindCSS)
├── public/                     # 静态资源目录
├── dist/                       # 构建输出目录 (自动生成)
├── node_modules/               # 依赖包目录
├── package.json                # 📦 项目配置
├── vite.config.js              # ⚙️  Vite配置 (代理、构建)
├── tailwind.config.js          # 🎨 TailwindCSS配置
├── tsconfig.json               # 📝 TypeScript配置
├── postcss.config.js           # 🔧 PostCSS配置
├── dev.bat                     # 🖥️  Windows开发脚本
├── build.bat                   # 🔨 Windows构建脚本
└── README.md                   # 📖 项目文档
```

### 🧩 组件架构

```
App (主应用)
├── ChatHeader (头部)
├── MessageList (消息列表)
│   └── MessagePair[] (消息对数组)
│       ├── UserMessage (用户消息) - 可选
│       └── AIMessage (AI回答)
└── ChatInput (输入框)
```

### 构建配置

项目配置为：
- **开发模式**: 基础路径为 `/`，访问地址 http://localhost:3000/
- **生产构建**: 基础路径为 `/static/`，输出到 `../public/static` 目录

### API 配置

项目已配置API代理，开发时会将 `/api/*` 请求代理到 `http://localhost:8000`

**SSE代理特性**：
- ✅ 支持Server-Sent Events长连接
- ✅ 自动设置SSE相关请求/响应头
- ✅ 禁用缓冲，确保实时数据传输
- ✅ 支持跨域和WebSocket升级

#### API 接口说明

**发送消息**: `POST /api/chat` (SSE流式响应)

请求格式:
```json
{
  "message": "用户消息内容"
}
```

响应格式 (Server-Sent Events):
```
Content-Type: text/event-stream

data: {"content": "AI"}
data: {"content": "回复"}
data: {"content": "内容"}
data: [DONE]
```

**消息历史**:
- 自动保存到浏览器 localStorage
- 服务端不保存历史记录
- 支持清空本地历史

#### 模式切换

- 点击头部的 **模拟/API** 按钮可以切换模式
- **模拟模式**: 使用本地模拟数据，支持Markdown演示
- **API模式**: 发送SSE请求到后端，实时流式响应

#### 消息结构

**MessagePair 一问一答结构**：
```typescript
interface MessagePair {
  id: number
  question: string      // 用户问题，空字符串表示欢迎消息
  answer: string        // AI回答
  timestamp: Date
  isAnswering?: boolean // 是否正在回答中
}
```

**特殊处理**：
- `question` 为空字符串时，表示欢迎消息，只显示AI回答
- 正常对话时，显示完整的问答对

**优势**：
- 逻辑清晰的对话组织
- 完整的问答上下文
- 更好的视觉呈现
- 简化的状态管理
- 统一的消息结构

#### 本地存储

- 所有消息对自动保存到 localStorage
- 刷新页面后消息历史保持
- 点击"清空"按钮可清除本地历史
- 服务端无状态，不保存任何历史记录
- 存储键名: `think-chat-message-pairs`

### 代理配置详情

Vite开发服务器已配置SSE代理支持：

```javascript
proxy: {
  "/api": {
    target: "http://localhost:8000",
    changeOrigin: true,
    ws: true,           // WebSocket支持
    timeout: 0,         // 禁用超时
    configure: (proxy) => {
      // 自动设置SSE请求头
      // 处理流式响应
      // 禁用缓冲
    }
  }
}
```

### 自定义开发

1. **修改 API 接口**: 在 `src/utils/api.ts` 中修改API请求逻辑
2. **调整样式**: 修改 `tailwind.config.js` 和 `src/index.css`
3. **添加新功能**: 在 `src/components/` 目录下创建新组件
4. **后端集成**: 确保后端API支持SSE格式响应

### 部署说明

构建完成后，静态文件会自动输出到 `../public/static` 目录，可直接通过 ThinkPHP 访问。

- **开发环境**: http://localhost:3000/
- **生产环境**: http://your-domain/static/index.html
