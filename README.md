<!-- @format -->

# CityWork 影像资产管理平台 (Frontend)

## 📖 项目背景

针对 CityWork 场景的影像资产管理平台，旨在为摄影师、城市记录者及团队提供一个从个人作品沉淀、团队协作共创，到公共图库3D大屏展示的全链路闭环系统。

## 🌟 核心价值

- **资产隔离与流转**：实现个人空间、团队空间、公共图库的严格权限隔离，支持图片以“复制副本”形式进行跨空间的平滑流转。
- **3D 可视化沉浸式展示**：公共图库采用 3D 中国地图（ECharts-GL），提供具有空间深度与视觉冲击力的城市影像导航和“视差滚动 (Scroll-telling)”体验。
- **数字胶片美学**：彻底抛弃传统后台管理的生硬感，采用“数字胶片”与“现代极简”的设计规范（高级灰、大留白、拍立得排版、暗房毛玻璃交互），为内容创作者提供极致的视觉质感。
- **高可维护性架构**：初期采用常规上传与异步协同，但架构底层为未来“大文件分片”与“实时画布协同”预留了无缝升级的扩展接口。

## 🛠️ 技术栈

本项目遵循“最简单且最健壮”的原则，采用了当前前端工程化中最主流的现代技术栈：

- **核心框架**：Vue 3 (Composition API)
- **开发语言**：TypeScript (保证核心数据模型的类型安全)
- **构建工具**：Vite (极速冷启动与热更新)
- **状态管理**：Pinia (轻量、模块化)
- **路由管理**：Vue Router 4
- **UI 组件库**：Element Plus (成熟的后台/表单组件解决方案)
- **样式方案**：Tailwind CSS (原子化快速构建) + SCSS (处理复杂动画)
- **3D/数据可视化**：ECharts 5 + ECharts-GL (实现高性能的 3D 地球与点位交互)
- **网络请求**：Axios

## 🚀 本地运行指南

要将该项目在本地运行起来，请确保您的开发环境中已经安装了 [Node.js](https://nodejs.org/)（推荐 v18+）。

1. **克隆仓库**
   ```bash
   git clone <你的仓库地址>
   cd ai-picture
   ```

2. **进入前端项目目录**
   由于本项目前端代码位于 `frontend` 目录下，您需要首先进入该目录：
   ```bash
   cd frontend
   ```

3. **安装依赖**
   ```bash
   npm install
   ```

4. **启动本地开发服务器**
   ```bash
   npm run dev
   ```

5. **预览**
   在终端中出现类似如下信息时，说明启动成功：
   ```
   VITE vX.X.X  ready in XX ms
   ➜  Local:   http://localhost:5173/
   ```
   在浏览器中打开 `http://localhost:5173/` 即可预览项目。

## 📁 核心文档指引

如果您是开发者（或 AI 开发助手），在进行代码贡献前，请务必阅读以下文档（位于 `document` 目录下）：
- `frontend_architecture_design.md`：核心架构与视觉规范设计
- `implementation_plan.md`：具体的落地开发步骤
- `ai_developer_rules.md`：AI 开发者行为准则
- `tech_stack_selection.md`：详细的技术选型理由
- `development_challenges_and_optimizations.md`：开发难点与性能优化记录
