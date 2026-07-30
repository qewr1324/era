import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { compileFlow } from "../compiler/flowCompiler";
import { execSync } from "child_process";

export async function exportBundle(uri?: vscode.Uri) {
	let doc: vscode.TextDocument | undefined;

	try {
		if (uri) {
			doc = await vscode.workspace.openTextDocument(uri);
		} else {
			doc = vscode.window.activeTextEditor?.document;
		}

		if (!doc) {
			return vscode.window.showErrorMessage("No flow file open.");
		}

		let flow;
		try {
			flow = JSON.parse(doc.getText());
		} catch (error) {
			return vscode.window.showErrorMessage("Invalid JSON in flow file.");
		}

		const settings = flow.settings || {};
		const outputLang = settings.outputLanguage || "javascript";

		// TODO: Add Go and Rust export later
		if (outputLang !== "javascript") {
			return vscode.window.showInformationMessage(`📦 ${outputLang} export coming soon! Currently only JavaScript is supported.`);
		}

		const bundleMode = settings.bundleMode || "portable";

		let minifyOption: string;
		const savedMinifyLevel = settings.minifyLevel;

		if (savedMinifyLevel === "minimal") {
			minifyOption = "Minimal minification";
		} else if (savedMinifyLevel === "aggressive") {
			minifyOption = "Aggressive minification";
		} else if (savedMinifyLevel === "none") {
			minifyOption = "No minification";
		} else {
			const selected = await vscode.window.showQuickPick(["No minification", "Minimal minification", "Aggressive minification"], { placeHolder: "Select minification level" });
			if (!selected) return;
			minifyOption = selected;
		}

		const minify = minifyOption !== "No minification";
		const minifyAggressive = minifyOption === "Aggressive minification";
		const nodeTarget = settings.nodeTarget || "node18";

		const defaultName = flow.name ? `${flow.name.replace(/\s+/g, "-").toLowerCase()}.bundle.js` : "flow.bundle.js";

		const saveUri = await vscode.window.showSaveDialog({
			filters: { "JavaScript Bundle": ["js"] },
			defaultUri: vscode.Uri.file(defaultName),
		});

		if (!saveUri) return;

		await vscode.window.withProgress(
			{
				location: vscode.ProgressLocation.Notification,
				title: bundleMode === "standalone" ? "Bundling standalone (all-in-one)..." : "Compiling and bundling...",
				cancellable: false,
			},
			async (progress) => {
				progress.report({ message: "Compiling flow..." });
				const generatedCode = compileFlow(flow);

				const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "era-bundle-"));

				try {
					const entryFile = path.join(tempDir, "flow.js");
					const outputFile = path.join(tempDir, "bundle.js");

					fs.writeFileSync(entryFile, generatedCode);

					const tempPkgJson: any = {
						name: "era-bundle-builder",
						version: "1.0.0",
						private: true,
						dependencies: {
							esbuild: "^0.24.0",
						},
					};

					if (bundleMode === "standalone") {
						tempPkgJson.dependencies.axios = "^1.6.0";
						tempPkgJson.dependencies["node-cron"] = "^3.0.0";
						tempPkgJson.dependencies.nodemailer = "^6.9.0";
					}

					fs.writeFileSync(path.join(tempDir, "package.json"), JSON.stringify(tempPkgJson, null, 2));

					progress.report({ message: "Installing dependencies..." });
					execSync("npm install --no-audit --no-fund --silent", {
						cwd: tempDir,
						stdio: "pipe",
						timeout: 120000,
					});

					const nodeBuiltins = [
						"fs",
						"path",
						"os",
						"http",
						"https",
						"crypto",
						"stream",
						"events",
						"net",
						"tls",
						"url",
						"querystring",
						"zlib",
						"child_process",
						"util",
						"dns",
						"dgram",
						"cluster",
						"worker_threads",
						"assert",
						"buffer",
						"string_decoder",
						"timers",
						"tty",
						"readline",
						"repl",
						"domain",
						"module",
						"punycode",
						"v8",
						"vm",
						"wasi",
						"perf_hooks",
						"process",
						"console",
						"constants",
					];

					const externalList = bundleMode === "standalone" ? nodeBuiltins : [...nodeBuiltins, "axios", "node-cron", "nodemailer"];

					const bundleConfig = `
const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

async function bundle() {
  const result = await esbuild.build({
    entryPoints: ['${entryFile.replace(/\\/g, "\\\\")}'],
    bundle: true,
    platform: 'node',
    target: '${nodeTarget}',
    format: 'cjs',
    minify: ${minify},
    minifyWhitespace: ${minifyAggressive},
    minifyIdentifiers: ${minifyAggressive},
    minifySyntax: ${minifyAggressive},
    treeShaking: true,
    write: false,
    external: ${JSON.stringify(externalList)},
    banner: {
      js: '#!/usr/bin/env node\\n// ⚡ ERA Flow Bundle${bundleMode === "standalone" ? " (Standalone)" : ""} - ${flow.name.replace(/'/g, "\\'")}\\n// Generated: ${new Date().toISOString()}\\n${bundleMode === "standalone" ? "// All dependencies bundled inside. No npm install needed.\\n" : ""}',
    },
  });

  fs.writeFileSync('${outputFile.replace(/\\/g, "\\\\")}', result.outputFiles[0].text);
  
  const output = result.outputFiles[0].text;
  const requireMatches = output.match(/require\\(['"]([^'"]+)['"]\\)/g) || [];
  const nonBuiltinRequires = requireMatches.filter(r => {
    const mod = r.match(/require\\(['"]([^'"]+)['"]\\)/)?.[1];
    return mod && !${JSON.stringify(nodeBuiltins)}.includes(mod);
  });
  
  if (nonBuiltinRequires.length > 0) {
    console.log('⚠️ External requires found:', nonBuiltinRequires);
  } else {
    console.log('✅ No external requires - fully standalone!');
  }
  
  const stats = fs.statSync('${outputFile.replace(/\\/g, "\\\\")}');
  console.log('Bundle size:', (stats.size / 1024).toFixed(2), 'KB');
  console.log('Mode: ${bundleMode}');
}

bundle().catch(err => {
  console.error('Bundle failed:', err);
  process.exit(1);
});
`;

					fs.writeFileSync(path.join(tempDir, "bundle.js"), bundleConfig);

					progress.report({ message: "Bundling with esbuild..." });
					const bundleOutput = execSync(`node "${path.join(tempDir, "bundle.js")}"`, {
						cwd: tempDir,
						stdio: "pipe",
						timeout: 120000,
					});
					console.log("Bundle output:", bundleOutput.toString());

					fs.copyFileSync(outputFile, saveUri.fsPath);

					if (bundleMode === "portable") {
						const bundleDir = path.dirname(saveUri.fsPath);
						const bundleName = path.basename(saveUri.fsPath, ".js");
						const bundlePkgPath = path.join(bundleDir, "package.json");

						const existingPkg = fs.existsSync(bundlePkgPath) ? JSON.parse(fs.readFileSync(bundlePkgPath, "utf-8")) : {};

						const bundlePkgJson = {
							...existingPkg,
							name: bundleName,
							version: "1.0.0",
							private: true,
							description: `ERA Flow Bundle: ${flow.name}`,
							scripts: {
								...(existingPkg.scripts || {}),
								start: `node ${path.basename(saveUri.fsPath)}`,
							},
							dependencies: {
								...(existingPkg.dependencies || {}),
								axios: "^1.6.0",
								"node-cron": "^3.0.0",
								nodemailer: "^6.9.0",
							},
						};
						fs.writeFileSync(bundlePkgPath, JSON.stringify(bundlePkgJson, null, 2));
					}

					if (process.platform !== "win32") {
						try {
							fs.chmodSync(saveUri.fsPath, "755");
						} catch {
							// Ignore if fails
						}
					}

					const stats = fs.statSync(saveUri.fsPath);
					const sizeKB = (stats.size / 1024).toFixed(2);

					let message = `✅ Bundle exported! Size: ${sizeKB} KB (${bundleMode})\n\n`;

					if (bundleMode === "standalone") {
						message += `🎉 TRUE STANDALONE - All code bundled inside!\n`;
						message += `🚀 Just run: node ${path.basename(saveUri.fsPath)}\n`;
						message += `✅ Zero dependencies - No npm install needed!\n`;
						message += `\n⚠️  Note: node-cron & nodemailer may need native binaries.`;
					} else {
						message += `📦 Portable mode - Dependencies in package.json\n`;
						message += `📋 Run: cd "${path.dirname(saveUri.fsPath)}" && npm install\n`;
						message += `🚀 Then: node ${path.basename(saveUri.fsPath)}\n`;
						message += `\n💡 Tip: Use Standalone mode for zero-dependency deployment.`;
					}

					vscode.window.showInformationMessage(message, "Open File").then((selection) => {
						if (selection === "Open File") {
							vscode.workspace.openTextDocument(saveUri).then((doc) => {
								vscode.window.showTextDocument(doc);
							});
						}
					});
				} finally {
					try {
						fs.rmSync(tempDir, { recursive: true, force: true });
					} catch (cleanupError) {
						console.warn("Failed to cleanup temp directory:", cleanupError);
					}
				}
			},
		);
	} catch (e: any) {
		vscode.window.showErrorMessage(`Export failed: ${e.message}`);
		console.error("Export error:", e);
	}
}
