# AGENTS.md - VS Code 插件开发指南

## 概览

本项目是一个用于 **Markdown 多层编号** 的 VS Code 插件，依赖 `markdown‑multilevel‑numbering` npm 包。

## 命令

### 构建

```bash
npm run build
```

使用 `tsc` 将 TypeScript 编译为 JavaScript，输出目录为 `dist/`。

### 开发

```bash
npm run dev
```

监听文件变化并自动重新编译。

### 打包 VSIX

生成可用于 VS Code 安装的 `.vsix` 文件，**并保存的 `release/` 目录**。

```bash
npm run vscode:package
```

### 安装依赖

```bash
npm install
```

---

## 代码风格指南

### TypeScript

- **目标**：ES2022
- **模块**：ES2022，使用 `bundler` 模块解析
- **严格模式**：已开启

### 导入写法

```typescript
// 必须的 vscode 命名空间导入
import * as vscode from 'vscode'

// 项目内部的具名导入
import { updateText, removeText } from 'markdown-multilevel-numbering'
```

### 格式化

- 使用 **2 空格** 缩进
- 语句末尾 **不使用分号**
- 多行对象/数组 **使用尾随逗号**
- 字符串使用 **单引号**

### 命名约定

- **文件名**：kebab‑case（例如 `extension.ts`）
- **函数**：camelCase（例如 `activate`、`deactivate`）
- **变量**：camelCase
- **类型/接口**：PascalCase（例如 `TextEditorCommandCallback`）

### 类型注解

- 必须为函数参数和返回值标注类型
- 对导出函数使用显式返回类型

```typescript
export function activate(context: vscode.ExtensionContext): void {
  // …
}
```

### 错误处理

- 所有异步操作 **必须** 包裹在 `try‑catch` 中
- 通过 `vscode.window.showErrorMessage` 向用户展示可读的错误信息
- 错误消息应随通知一起显示

```typescript
try {
  // 异步操作
} catch (error) {
  const message = error instanceof Error ? error.message : 'Unknown error'
  vscode.window.showErrorMessage(`MMN Error: ${message}`)
}
```

### VS Code 插件模式

- 使用 `vscode.commands.registerTextEditorCommand` 注册命令
- 通过 `WorkspaceEdit` 完成文档修改
- 将命令加入 `context.subscriptions` 以便在插件停用时清理
- 对 markdown 文件使用 `onLanguage:markdown` 激活事件

### 主动性（Proactiveness）

- **不要主动** 执行操作，仅在用户明确请求时才行动
- 对可能产生重大影响的修改先征求确认
- 未经用户要求 **不要** 提交代码更改

### 文档

- **不要** 添加注释，除非用户专门要求
- 代码应通过语义化的命名自行表达含义，保持自解释性