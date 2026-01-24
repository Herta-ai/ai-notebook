# ElysiaJS + SurrealDB 后端项目搭建计划

本计划将为您搭建一个基于 ElysiaJS 和 SurrealDB 的现代化后端项目，包含最佳实践的目录结构、统一响应处理、JWT 鉴权以及完整的用户模块。

## 1. 初始化与依赖安装
- [ ] 安装必要依赖：`@elysiajs/jwt` (鉴权), `@elysiajs/swagger` (文档), `@elysiajs/cors` (跨域支持)。
- [ ] 检查并更新 `.env` 配置文件，配置数据库连接信息和 JWT 密钥。

## 2. 目录架构设计
将在 `apps/server/src` 下建立以下目录结构：
- `config/`: 配置文件读取
- `utils/`: 工具函数（如数据库连接封装）
- `middlewares/`: 中间件（统一响应、鉴权）
- `models/`: 数据模型定义（TypeScript 接口）
- `services/`: 业务逻辑层（数据库交互）
- `controllers/`: 控制器层（请求处理）
- `routes/`: 路由定义

## 3. 核心基础设施实现
- [ ] **数据库连接 (`src/utils/db.ts`)**: 封装 SurrealDB 单例连接，并作为 Elysia 插件导出，实现自动连接和上下文注入。
- [ ] **统一响应中间件 (`src/middlewares/response.ts`)**: 
    - 实现 `Result` 类或工具函数，确保所有接口返回 `{ data, msg, code, isSuccess }` 格式。
    - 使用 Elysia 的 `afterHandle` 或 `mapResponse` 钩子进行全局拦截（或在 Controller 中统一调用 helper）。为了类型安全和灵活性，推荐使用 Helper 函数 + Error Handler 模式。
- [ ] **鉴权中间件 (`src/middlewares/auth.ts`)**: 
    - 集成 `@elysiajs/jwt`。
    - 实现登录守卫（Guard），用于保护需要认证的接口。

## 4. User 模块开发
- [ ] **模型定义 (`src/models/user.model.ts`)**: 定义 `User` 接口 (`id`, `username`, `password`, `nickname`)。
- [ ] **业务服务 (`src/services/user.service.ts`)**:
    - `register`: 检查用户名是否存在，加密密码，创建用户。
    - `login`: 验证用户名和密码，生成 JWT。
    - `getProfile`: 获取当前用户信息。
    - `updateProfile`: 更新昵称或密码。
- [ ] **控制器 (`src/controllers/user.controller.ts`)**: 处理 HTTP 请求参数，调用 Service，返回统一格式结果。
- [ ] **路由 (`src/routes/user.routes.ts`)**: 定义 `/auth/register`, `/auth/login`, `/user/profile` 等路由。

## 5. 入口集成
- [ ] 修改 `src/index.ts`，注册 Swagger, CORS, Database 插件以及 User 路由模块。

## 6. 验证
- [ ] 启动服务器，使用 Swagger 或 curl 验证注册、登录、获取信息流程。
