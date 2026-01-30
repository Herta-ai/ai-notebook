# AI Notebook 🧠

> 一个开源、本地优先的智能笔记本应用，灵感来源于 NotebookLM 与 Open-Notebook。旨在通过 AI 赋能，重新定义知识管理与创作流程。

## 📖 项目简介

AI Notebook 是一个现代化的知识管理工具，结合了先进的大语言模型 (LLM) 能力与直观的笔记体验。它不仅是一个记录文字的地方，更是一个能够理解、整理并与你互动的智能助手。采用前后端分离架构设计，支持 Web 端与桌面端（Tauri），确保在不同场景下都能提供流畅的使用体验。

## ✨ 核心特性

- **🤖 深度 AI 集成**：内置 LLM 管理，支持多种模型，实现智能对话与辅助写作。
- **📁 结构化管理**：灵活的文件夹与笔记管理系统，保持知识井井有条。
- **🔌 扩展性强**：支持 MCP (Model Context Protocol) 与 Skills 管理，无限拓展 AI 能力。
- **🧠 RAG 增强**：基于检索增强生成 (RAG) 技术，让 AI 基于你的私人知识库回答问题。
- **🔒 本地优先**：桌面端采用嵌入式数据库，数据完全掌控在你手中。

## 🛠 技术栈

本项目基于高性能的 [Bun](https://bun.sh) 运行时构建，采用 Monorepo 架构管理。

| 模块 | 技术选型 | 说明 |
| :--- | :--- | :--- |
| **Runtime** | **Bun** | 极速 JavaScript 运行时，统一包管理与构建 |
| **Frontend** | **Vue 3.6+** | 配合 Vue Router & Pinia 的现代化前端框架 |
| **UI / Style** | **Naive UI** / **UnoCSS** | 高颜值的组件库与原子化 CSS 引擎 |
| **Backend** | **ElysiaJS** | 高性能、类型安全的 Node.js/Bun 后端框架 |
| **Database** | **SurrealDB** | 强大的多模型数据库，支持实时查询 |
| **Desktop** | **Tauri** | 基于 Rust 的轻量级跨平台桌面应用构建工具 |
| **Network** | **Alova** | 轻量级请求策略库 |

## 📂 项目结构

```text
.
├── apps/
│   ├── desktop/   # Tauri 桌面端应用
│   ├── server/    # ElysiaJS 后端服务
│   └── web/       # Vue3 前端应用
├── packages/      # 共享工具库
└── docs/          # 项目文档
```

## 🚀 快速开始

### 环境要求

- **Bun**: ≥ 1.3.7 (必须)
- **Rust**: (仅桌面端开发需要)

### 1. 安装依赖

在项目根目录下运行：

```bash
bun install
```

### 2. 启动开发环境

本项目包含多个应用，建议在不同的终端窗口中分别启动。

#### 启动后端服务 (Server)

```bash
cd apps/server
bun run dev
```

#### 启动前端应用 (Web)

```bash
cd apps/web
bun run dev
```

#### 启动桌面端 (Desktop)

```bash
cd apps/web
bun run dev:tauri
```

```bash
cd apps/desktop
bun run dev:tauri
```

## 🗺 待办路线图 (Roadmap)

### 阶段一：基础建设

- [ ] **LLM 管理**：模型配置、切换与连接测试
- [ ] **知识库管理**：文件夹层级结构、笔记增删改查 (CRUD)

### 阶段二：能力扩展

- [ ] **MCP 管理**：实现 Model Context Protocol 支持
- [ ] **Skills 管理**：自定义工具与技能注册
- [ ] **AI 对话核心**：基础对话界面与 Agent 架构实现

### 阶段三：智能增强

- [ ] **RAG 能力**：向量数据库集成、文档分片与检索
- [ ] **高级交互**：AI 对话中自动调用 MCP 和 Skills
