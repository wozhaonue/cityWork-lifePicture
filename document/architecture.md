<!-- @format -->

# 文件架构与作用说明

用于记录项目中每个文件的具体作用与功能边界。

## /document (项目文档目录)

- `frontend_architecture_design.md`: 前端架构设计文档，包含模块划分、技术栈选型、UI/UX 设计规范（“数字胶片”与“现代极简”风格）、核心数据模型及交互链路。
- `implementation_plan.md`: AI 开发者前端实施计划，拆分为 8 个带有测试验证步骤的阶段，包含针对特定 UI 风格的指令。
- `ai_developer_rules.md`: AI 开发者行为准则，规定了 AI 助手在开发过程中的交互风格和约束条件。
- `tech_stack_selection.md`: 详细的前端技术栈选型理由与架构图。
- `development_challenges_and_optimizations.md`: 记录开发过程中的技术难点、解决方案及性能优化策略。
- `progress.md`: 实施进度记录，追踪每个阶段任务的完成情况。
- `architecture.md`: 记录项目中每个文件和目录的具体作用与功能边界。

## / (项目根目录)

- `README.md`: 项目的总览文档，包含项目背景、核心价值、技术栈介绍以及本地环境启动指南。

## /instance (UI 静态原型目录)

用于存储纯前端三件套（HTML/CSS/JS）生成的静态页面，主要用于在正式开发前确认 UI 样式和整体风格走向。

- `layout.html`: 全局布局样式静态页面，包含顶部导航栏、可伸缩侧边栏及主内容区的骨架屏。
- `personal.html`: 个人空间静态页面，展示城市文件夹网格视图及相册瀑布流的样式设计。
- `team.html`: 团队空间静态页面，展示顶部团队信息、左侧工具栏、中间协作画布及右侧属性面板的布局。
- `public.html`: 公共图库静态页面，深色 3D 空间风格，模拟 3D 地图点位、数据看板及城市详情浮层。
- `admin.html`: 管理中枢静态页面，展示标准的后台数据表格、状态标签及过滤操作区。

## /frontend (前端工程目录)

基于 Vite + Vue 3 初始化的前端代码仓库，负责承载实际的产品逻辑。

- `.env.development`: 本地开发环境的配置文件，包含 API 请求地址（如 `VITE_API_BASE_URL`）等环境变量。
- `README.md`: 前端工程专门的本地运行指南，包含依赖安装、启动步骤和环境变量配置说明。
- `src/utils/request/index.ts`: 基于 Axios 封装的全局 HTTP 客户端核心实例，负责配置基础参数（如 baseURL, timeout, withCredentials）并按严格顺序挂载各个独立功能插件。
- `src/utils/request/plugins/`: Axios 拦截器插件目录，采用插件化架构（Plugin-based Architecture）将面条式拦截器解耦为独立模块：
  - `dedupe.ts`: 请求防抖与去重插件，利用 `AbortController` 和请求特征指纹，自动取消短时间内的重复请求。
  - `retry.ts`: 超时重试插件，在遇到网络异常或 `ECONNABORTED` 时自动发起重试（默认 3 次，间隔 1 秒）。
  - `auth.ts`: 身份鉴权插件，主要负责拦截 401 状态码，并触发未登录提示及后续的路由重定向。
  - `error.ts`: 全局错误处理插件，统一收口并格式化网络层和业务层异常状态码，结合 Element Plus 弹出用户友好的错误提示。
- `src/router/index.ts`: Vue Router 的核心配置文件，定义了项目的基础路由和组件映射（如默认的 Home 页面）。
- `src/store/index.ts`: Pinia 状态管理的核心入口文件，用于初始化并导出 Pinia 实例。
- `src/store/modules/`: 依据领域（Domain）划分的独立状态模块目录：
  - `user.ts`: UserStore，管理当前登录用户信息、登录与登出状态等。
  - `space.ts`: SpaceStore，管理个人/团队空间列表、当前空间信息及切换逻辑等。
  - `picture.ts`: PictureStore，管理图片列表、上传状态及当前预览图片等。
- `src/constant/`: 静态常量与 Mock 数据存放目录，用于解决缺少后端接口时的全局数据依赖。
  - `city.ts`: 中国地级市名称静态数组文件，主要用于在强制城市标签等表单中提供下拉选择框的数据源。
  - `team-story.ts`: 全局团队故事静态对象数组（Mock），用于模拟展示团队空间的故事摘要、案例分享及对应链接。
- `src/views/`: 页面级视图组件存放目录。
  - `Home.vue`: 默认的占位主页组件，目前用于挂载路由、测试 Pinia 状态以及验证全局常量。
