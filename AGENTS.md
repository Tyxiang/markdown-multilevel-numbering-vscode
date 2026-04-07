# AGENTS.md - VS Code Extension Development Guide

## Overview

This is a VS Code extension for markdown multilevel numbering. It depends on the `markdown-multilevel-numbering` npm package.

## Commands

### Build

```bash
npm run build
```

Compiles TypeScript to JavaScript using `tsc`. Output goes to `dist/`.

### Development

```bash
npm run dev
```

Watches for file changes and recompiles automatically.

### Package VSIX

```bash
npm run vscode:package
```

Creates a `.vsix` file for VS Code extension installation. Output is placed in the `release/` directory.

### Install Dependencies

```bash
npm install
```

## Code Style Guidelines

### TypeScript

- **Target**: ES2022
- **Module**: ES2022 with `bundler` module resolution
- **Strict mode**: Enabled

### Imports

```typescript
// Namespace import for vscode (required)
import * as vscode from 'vscode'

// Named imports for project code
import { updateText, removeText } from 'markdown-multilevel-numbering'
```

### Formatting

- 2 spaces indentation
- No semicolons at end of statements
- Trailing commas in multi-line objects/arrays
- Single quotes for strings

### Naming Conventions

- **Files**: kebab-case (e.g., `extension.ts`)
- **Functions**: camelCase (e.g., `activate`, `deactivate`)
- **Variables**: camelCase
- **Types/Interfaces**: PascalCase (e.g., `TextEditorCommandCallback`)

### Type Annotations

- Always specify types for function parameters and return values
- Use explicit return types for exported functions

```typescript
export function activate(context: vscode.ExtensionContext): void {
  // ...
}
```

### Error Handling

- Always wrap async operations in try-catch
- Show user-friendly error messages via `vscode.window.showErrorMessage`
- Include error message in notification

```typescript
try {
  // async operation
} catch (error) {
  const message = error instanceof Error ? error.message : 'Unknown error'
  vscode.window.showErrorMessage(`MMN Error: ${message}`)
}
```

### VS Code Extension Patterns

- Register commands with `vscode.commands.registerTextEditorCommand`
- Use `WorkspaceEdit` for document modifications
- Subscribe commands to `context.subscriptions` for cleanup
- Use `onLanguage:markdown` activation event for markdown files

### Proactiveness

- Do NOT be proactive - only take actions when explicitly asked
- Ask for confirmation before making significant changes
- Do not commit changes unless explicitly requested

### Documentation

- Do NOT add comments unless explicitly requested
- Keep code self-documenting with descriptive names
