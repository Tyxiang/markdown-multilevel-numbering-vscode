# Markdown Multilevel Numbering (mmn)

[English](./README.md) | [中文](./README_CN.md)

A tool for adding multilevel numbering to markdown documents, supporting mainbody/appendix numbering modes with flexible control via commands. Built on the [Markdown Multilevel Numbering](https://github.com/tyxiang/markdown-multilevel-numbering-core) library.

## 1. Features

- Mainbody mode numbering for headings and paragraphs: `1.`, `1.1.`, `1.1.1.` ...
- Appendix mode numbering for headings and paragraphs: `A.`, `A.1.`, `A.1.1.` ...
- H2 heading format in appendix: `Appendix A Title`.
- Flexible control of numbering behavior via commands.
- Level 1 headings never participate in numbering.
- Only processes content within the first level 1 heading scope; subsequent level 1 headings and their content are ignored.
- AST-based reliable parsing protects code blocks, lists, tables, math formulas, etc. from being modified.

## 2. Control Commands

Insert control commands in markdown documents using HTML comments.

Comment format: `<!-- mmn: command [command...] -->`

| command    | Description                                                         |
| ---------- | ------------------------------------------------------------------- |
| `mainbody` | Numbering mode command, starts mainbody mode with default depth `h` |
| `appendix` | Numbering mode command, starts appendix mode with default depth `h` |
| `h`        | Depth command, numbers all heading levels                           |
| `h+p`      | Depth command, numbers all heading levels and paragraphs            |
| `h2`       | Depth command, numbers level 2 headings                             |
| `h3`       | Depth command, numbers level 2-3 headings                           |
| `h4`       | Depth command, numbers level 2-4 headings                           |
| `h5`       | Depth command, numbers level 2-5 headings                           |
| `h6`       | Depth command, numbers level 2-6 headings                           |
| `end`      | End numbering                                                       |

The program starts in `mainbody` mode by default.

## 3. Usage Examples

### 3.1. Example 1: Basic Heading Numbering

Input:

```markdown
# Document Title

<!-- mmn: mainbody h -->

## Introduction

## Methods

### Experiment Design

### Data Analysis

## Conclusion
```

Output:

```markdown
# Document Title

<!-- mmn: mainbody h -->

## 1. Introduction

## 2. Methods

### 2.1. Experiment Design

### 2.2. Data Analysis

## 3. Conclusion
```

### 3.2. Example 2: Heading + Paragraph Numbering

Input:

```markdown
# Document Title

<!-- mmn: mainbody h+p -->

## Introduction

This is the first paragraph.

This is the second paragraph.

## Methods

### Experiment Design

The experiment steps are as follows.

Detailed explanations.
```

Output:

```markdown
# Document Title

<!-- mmn: mainbody h+p -->

## 1. Introduction

1.1. This is the first paragraph.

1.2. This is the second paragraph.

## 2. Methods

### 2.1. Experiment Design

2.1.1. The experiment steps are as follows.

2.1.2. Detailed explanations.
```

### 3.3. Example 3: Dynamic Depth Adjustment

Input:

```markdown
# Document Title

<!-- mmn: mainbody h2 -->

## Overview

### This level 3 heading won't be numbered

### Neither will this one

<!-- mmn: h -->

## Main Content

### Now numbering starts

#### Level 4 headings will also be numbered

Content won't be numbered.
```

Output:

```markdown
# Document Title

<!-- mmn: mainbody h2 -->

## 1. Overview

### This level 3 heading won't be numbered

### Neither will this one

<!-- mmn: h -->

## 2. Main Content

### 2.1. Now numbering starts

#### 2.1.1. Level 4 headings will also be numbered

Content won't be numbered.
```

### 3.4. Example 4: Mainbody + Appendix Mixed

Input:

```markdown
# Document Title

<!-- mmn: mainbody h -->

## Introduction

## Methods

<!-- mmn: appendix h -->

## Supplementary Materials

### Raw Data

## Questionnaire
```

Output:

```markdown
# Document Title

<!-- mmn: mainbody h -->

## 1. Introduction

## 2. Methods

<!-- mmn: appendix h -->

## Appendix A Supplementary Materials

### A.1. Raw Data

## Appendix B Questionnaire
```

## 4. Installation

**Install from VS Code Extension Marketplace**

Search for "Markdown Multilevel Numbering" in the VS Code extension marketplace and install.

**Install from VSIX file**

1. Download the .vsix file
2. In VS Code, press `Ctrl+Shift+P` to open the command palette
3. Type "Install from VSIX" and select the downloaded .vsix file

## 5. Usage

- Open a .md file.
- Right-click to find "Markdown Multilevel Numbering" submenu and choose "Update" or "Remove".
