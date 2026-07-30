import * as vscode from "vscode";
import { getNonce } from "../utils/nonce";

export class FlowEditorProvider implements vscode.CustomTextEditorProvider {
	private isUpdatingFromWebview = false;

	constructor(private readonly context: vscode.ExtensionContext) {}

	async resolveCustomTextEditor(document: vscode.TextDocument, webviewPanel: vscode.WebviewPanel, _token: vscode.CancellationToken): Promise<void> {
		webviewPanel.webview.options = {
			enableScripts: true,
			localResourceRoots: [vscode.Uri.joinPath(this.context.extensionUri, "dist")],
		};

		webviewPanel.webview.html = this.getHtml(webviewPanel.webview);

		webviewPanel.webview.onDidReceiveMessage(async (msg) => {
			try {
				switch (msg.type) {
					case "update":
						this.isUpdatingFromWebview = true;
						await this.updateDocument(document, msg.content);
						this.isUpdatingFromWebview = false;
						break;
					case "export":
						await vscode.commands.executeCommand("era.exportBundle", document.uri);
						break;
					case "run":
						await vscode.commands.executeCommand("era.runFlow", document.uri);
						break;
					case "error":
						console.error("Webview error:", msg.message);
						vscode.window.showErrorMessage(`ERA Error: ${msg.message}`);
						break;
				}
			} catch (error: any) {
				vscode.window.showErrorMessage(`ERA: ${error.message}`);
			}
		});

		const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument((e) => {
			if (this.isUpdatingFromWebview) return;

			if (e.document.uri.toString() === document.uri.toString()) {
				const content = e.document.getText();
				webviewPanel.webview.postMessage({ type: "setContent", content });
			}
		});

		webviewPanel.onDidDispose(() => {
			changeDocumentSubscription.dispose();
		});

		const content = document.getText();
		webviewPanel.webview.postMessage({ type: "setContent", content });
	}

	private async updateDocument(document: vscode.TextDocument, content: string): Promise<void> {
		try {
			JSON.parse(content);

			const edit = new vscode.WorkspaceEdit();
			edit.replace(document.uri, new vscode.Range(0, 0, document.lineCount, 0), content);
			await vscode.workspace.applyEdit(edit);
			await document.save();
		} catch (error: any) {
			vscode.window.showErrorMessage(`Failed to save flow: ${error.message}`);
			throw error;
		}
	}

	private getHtml(webview: vscode.Webview): string {
		const nonce = getNonce();
		const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, "dist", "webview", "flowApp.js"));
		const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, "dist", "webview", "flowStyle.css"));

		return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';">
  <link rel="stylesheet" href="${styleUri}">
  <title>ERA Flow</title>
</head>
<body>
  <div id="app"></div>
  <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
	}
}
