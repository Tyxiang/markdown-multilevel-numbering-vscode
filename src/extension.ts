import * as vscode from 'vscode'
import { updateText, removeText } from 'markdown-multilevel-numbering'

export function activate(context: vscode.ExtensionContext) {
  const updateCommand = vscode.commands.registerTextEditorCommand(
    'mmn.update',
    async (editor: vscode.TextEditor) => {
      try {
        const document = editor.document
        const content = document.getText()
        const result = updateText(content)

        await editor.edit((editBuilder) => {
          const fullRange = new vscode.Range(
            document.positionAt(0),
            document.positionAt(content.length)
          )
          editBuilder.replace(fullRange, result)
        })
        await document.save()

        vscode.window.showInformationMessage('Multilevel numbering added successfully')
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        vscode.window.showErrorMessage(`MMN Error: ${message}`)
      }
    }
  )

  const removeCommand = vscode.commands.registerTextEditorCommand(
    'mmn.remove',
    async (editor: vscode.TextEditor) => {
      try {
        const document = editor.document
        const content = document.getText()
        const result = removeText(content)

        await editor.edit((editBuilder) => {
          const fullRange = new vscode.Range(
            document.positionAt(0),
            document.positionAt(content.length)
          )
          editBuilder.replace(fullRange, result)
        })
        await document.save()

        vscode.window.showInformationMessage('Multilevel numbering removed successfully')
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        vscode.window.showErrorMessage(`MMN Error: ${message}`)
      }
    }
  )

  context.subscriptions.push(updateCommand, removeCommand)
}

export function deactivate() {}
