import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { compileFlow } from "../compiler/flowCompiler";

export async function runFlow(uri?: vscode.Uri) {
	let doc: vscode.TextDocument | undefined;
	let tempDir: string | undefined;

	try {
		if (uri) {
			doc = await vscode.workspace.openTextDocument(uri);
		} else {
			doc = vscode.window.activeTextEditor?.document;
		}

		if (!doc) return vscode.window.showErrorMessage("No flow file open.");

		if (doc.isDirty) {
			await doc.save();
		}

		let flow;
		try {
			flow = JSON.parse(doc.getText());
		} catch (error) {
			return vscode.window.showErrorMessage("Invalid JSON in flow file.");
		}

		const outputLang = flow.settings?.outputLanguage || "javascript";

		// TODO: Add Go and Rust runtime support later
		if (outputLang !== "javascript") {
			return vscode.window.showInformationMessage(`🚀 ${outputLang} runtime coming soon! Currently only JavaScript is supported.`);
		}

		const code = compileFlow(flow);
		const settings = flow.settings || {};
		const pkgManager = settings.packageManager || "npm";

		tempDir = fs.mkdtempSync(path.join(os.tmpdir(), `era-run-`));
		const tempFile = path.join(tempDir, "flow.js");

		fs.writeFileSync(tempFile, code);

		const pkgJson = {
			name: "era-flow-run",
			version: "1.0.0",
			private: true,
			dependencies: {
				axios: "^1.6.0",
				"node-cron": "^3.0.0",
				nodemailer: "^6.9.0",
			},
		};
		fs.writeFileSync(path.join(tempDir, "package.json"), JSON.stringify(pkgJson, null, 2));

		const installCmd = pkgManager === "bun" ? "bun install --production --silent" : pkgManager === "pnpm" ? "pnpm install --prod --silent" : pkgManager === "yarn" ? "yarn install --production --silent" : "npm install --production --no-audit --no-fund --silent";

		const terminal = vscode.window.createTerminal({
			name: "ERA Flow Runner",
			cwd: tempDir,
		});

		terminal.show();

		const commands = [
			`clear`,
			`echo "📦 Installing dependencies with ${pkgManager}..."`,
			`cd "${tempDir}" && ${installCmd} 2>&1`,
			`echo ""`,
			`echo "═══════════════════════════════════════"`,
			`echo "🚀 Running ERA Flow: ${flow.name}"`,
			`echo "═══════════════════════════════════════"`,
			`echo ""`,
			`node "${tempFile}"`,
			`EXIT_CODE=$?`,
			`echo ""`,
			`echo "═══════════════════════════════════════"`,
			`if [ $EXIT_CODE -eq 0 ]; then`,
			`  echo "✅ Flow completed successfully"`,
			`else`,
			`  echo "❌ Flow failed with exit code: $EXIT_CODE"`,
			`fi`,
			`echo "═══════════════════════════════════════"`,
			`echo ""`,
			`echo "🧹 Cleaning up temp files..."`,
			`rm -rf "${tempDir}"`,
		];

		commands.forEach((cmd) => terminal.sendText(cmd));

		vscode.window.showInformationMessage(`🚀 Running "${flow.name}" with ${pkgManager} - Check the ERA Flow Runner terminal`);
	} catch (e: any) {
		vscode.window.showErrorMessage(`Run failed: ${e.message}`);
		console.error("Run error:", e);

		if (tempDir) {
			try {
				fs.rmSync(tempDir, { recursive: true, force: true });
			} catch (cleanupError) {
				console.warn("Failed to cleanup temp directory:", cleanupError);
			}
		}
	}
}
