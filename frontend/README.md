<!-- @format -->

# CityWork 影像资产管理平台 - 前端工程

基于 Vue 3 + TypeScript + Vite 构建的前端项目。

## 🚀 本地开发运行指南

由于本项目配置了自定义的网络请求层与全局环境变量，请在运行前仔细阅读以下步骤。

### 1. 环境准备

请确保您本地已经安装了以下环境：
- Node.js (推荐 v18 或以上版本)
- npm (通常随 Node.js 一同安装)

### 2. 安装依赖

进入 `frontend` 目录后，执行以下命令安装项目所需的全部依赖：

```bash
npm install
```

### 3. 环境变量配置

本项目使用 Axios 封装了网络请求，并在 `src/utils/request.ts` 中通过 `import.meta.env.VITE_API_BASE_URL` 获取基础接口地址。

在本地开发时，Vite 会自动加载项目根目录下的 `.env.development` 文件。您需要确保该文件存在并配置了正确的接口地址：

1. 在 `frontend` 目录下创建（或修改） `.env.development` 文件。
2. 填入如下配置（或根据后端实际地址进行修改）：

```env
# 本地开发环境变量配置
VITE_API_BASE_URL=/api
```
*注意：环境变量必须以 `VITE_` 开头，否则 Vite 不会将其暴露给客户端代码。*

### 4. 启动本地开发服务器

执行以下命令启动项目：

```bash
npm run dev
```

终端将显示类似以下信息：
```
  VITE vX.X.X  ready in XX ms
  ➜  Local:   http://localhost:5173/
```

在浏览器中访问该地址即可预览项目。开发过程中修改代码将会触发模块热替换（HMR），页面会自动更新。
