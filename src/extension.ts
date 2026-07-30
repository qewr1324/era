import * as vscode from "vscode";
import { FlowEditorProvider } from "./webview/flowEditor";
import { exportBundle } from "./commands/exportBundle";
import { runFlow } from "./commands/runFlow";

export function activate(context: vscode.ExtensionContext) {
	console.log("✅ ERA Flow activated!");

	context.subscriptions.push(
		vscode.window.registerCustomEditorProvider("era.editor", new FlowEditorProvider(context), {
			webviewOptions: { retainContextWhenHidden: true },
			supportsMultipleEditorsPerDocument: false,
		}),
	);

	context.subscriptions.push(
		vscode.commands.registerCommand("era.createFlow", async () => {
			try {
				const uri = await vscode.window.showSaveDialog({
					filters: { "ERA Flow": ["era.json"] },
					defaultUri: vscode.Uri.file("flow.era.json"),
					title: "Create New ERA Flow",
				});

				if (uri) {
					const emptyFlow = {
						version: "2.0",
						name: "New Flow",
						rows: [],
						variables: [],
						settings: {
							packageManager: "npm",
							minifyLevel: "minimal",
							nodeTarget: "node18",
							errorHandling: "stop",
							concurrency: 1,
							retryOnFailure: false,
							maxRetries: 3,
							outputLanguage: "javascript",
						},
					};

					await vscode.workspace.fs.writeFile(uri, Buffer.from(JSON.stringify(emptyFlow, null, 2)));
					await vscode.commands.executeCommand("vscode.openWith", uri, "era.editor");
				}
			} catch (error: any) {
				vscode.window.showErrorMessage(`Failed to create flow: ${error.message}`);
			}
		}),

		vscode.commands.registerCommand("era.exportBundle", exportBundle),
		vscode.commands.registerCommand("era.runFlow", runFlow),

		vscode.commands.registerCommand("era.validateFlow", async () => {
			const doc = vscode.window.activeTextEditor?.document;
			if (!doc) {
				return vscode.window.showErrorMessage("No flow file open.");
			}

			try {
				const flow = JSON.parse(doc.getText());

				if (!flow.version) throw new Error("Missing version");
				if (!flow.name) throw new Error("Missing name");
				if (!Array.isArray(flow.rows)) throw new Error("Rows must be an array");
				if (!flow.settings) throw new Error("Missing settings");

				flow.rows.forEach((row: any, idx: number) => {
					if (!row.id) throw new Error(`Row ${idx + 1}: missing ID`);
					if (!Array.isArray(row.steps)) throw new Error(`Row ${row.id}: steps must be an array`);

					if (row.steps.length === 0) {
						vscode.window.showWarningMessage(`Row ${row.id} has no steps`);
					}
				});

				vscode.window.showInformationMessage("✅ Flow is valid!");
			} catch (error: any) {
				vscode.window.showErrorMessage(`Validation failed: ${error.message}`);
			}
		}),
	);
}

export function deactivate() {
	console.log("ERA Flow deactivated");
}
