import { Flow, FlowRow, FlowStep } from "../types/flow";

export function compileFlow(flow: Flow): string {
	validateFlow(flow);

	// TODO: Add Go and Rust compilers later
	// For now, only JavaScript is supported
	return compileJavaScript(flow);
}

function validateFlow(flow: Flow): void {
	if (!flow.version) throw new Error("Flow version is required");
	if (!flow.name) throw new Error("Flow name is required");
	if (!Array.isArray(flow.rows)) throw new Error("Flow rows must be an array");
	if (!flow.settings) {
		flow.settings = {
			packageManager: "npm",
			minifyLevel: "minimal",
			nodeTarget: "node18",
			errorHandling: "stop",
			concurrency: 1,
			retryOnFailure: false,
			maxRetries: 3,
			bundleMode: "portable",
			outputLanguage: "javascript",
		};
	}

	flow.rows.forEach((row, rowIdx) => {
		if (!row.id) throw new Error(`Row ${rowIdx + 1}: missing ID`);
		if (!Array.isArray(row.steps)) throw new Error(`Row ${row.id}: steps must be an array`);
	});
}

function compileJavaScript(flow: Flow): string {
	const rows = flow.rows;
	if (rows.length === 0) throw new Error("Flow has no rows");

	const isStandalone = flow.settings?.bundleMode === "standalone";

	let code = `// ⚡ ERA Flow - Generated Code
// Flow: ${escapeString(flow.name)}
// Generated at: ${new Date().toISOString()}
// Version: ${flow.version}

${
	isStandalone
		? `// Standalone mode - all dependencies bundled inside
`
		: `// ─── Dependency Check ────────────────────
(function checkDependencies() {
  const requiredModules = ['axios', 'node-cron', 'nodemailer'];
  const missingModules = [];
  
  for (const mod of requiredModules) {
    try {
      require.resolve(mod);
    } catch (e) {
      missingModules.push(mod);
    }
  }
  
  if (missingModules.length > 0) {
    console.error('❌ Missing dependencies:', missingModules.join(', '));
    console.error('');
    console.error('Install them with:');
    console.error('  npm install ' + missingModules.join(' '));
    console.error('');
    console.error('Or install all at once:');
    console.error('  npm install axios node-cron nodemailer');
    process.exit(1);
  }
})();

`
}
// ─── Variables ───────────────────────────
${flow.variables && flow.variables.length > 0 ? flow.variables.map((v) => `const ${v.name} = "${v.value.replace(/"/g, '\\"')}"; // ${v.description}`).join("\n") + "\n\n" : ""}
// ─── Runtime ─────────────────────────────
class FlowRuntime {
  constructor() {
    this.context = {};
    this.logs = [];
    this.startTime = Date.now();
  }

  log(level, message, data = {}) {
    const entry = { 
      timestamp: new Date().toISOString(), 
      level, 
      message, 
      data: this.sanitizeData(data)
    };
    this.logs.push(entry);
    console[level](\`[\${entry.timestamp}] [\${level.toUpperCase()}] \${message}\`, data);
  }

  sanitizeData(data) {
    try {
      const sensitive = JSON.stringify(data);
      const masked = sensitive.replace(/"([^"]*(?:secret|password|token|key)[^"]*)":"[^"]*"/gi, '"$1":"***"');
      return JSON.parse(masked);
    } catch (e) {
      return data;
    }
  }

  resolveTemplate(template, ctx = {}) {
    if (typeof template !== 'string') return template;
    return template.replace(/\\{\\{([^}]+)\\}\\}/g, (_, path) => {
      return this.resolvePath(path.trim(), ctx) ?? '';
    });
  }

  resolvePath(path, obj) {
    if (!obj) return undefined;
    const parts = path.split('.');
    let current = obj;
    for (const part of parts) {
      if (current === null || current === undefined) return undefined;
      if (part === 'ctx') current = this.context;
      else if (part === 'env') current = process.env;
      else current = current[part];
    }
    return current;
  }

  getDuration() {
    return Date.now() - this.startTime;
  }
}

const runtime = new FlowRuntime();

// ─── Step Functions ──────────────────────
${compileRows(flow.rows, flow)}

// ─── Main ────────────────────────────────
async function main() {
  try {
    console.log('🚀 Starting ERA Flow: ${escapeString(flow.name)}');
    console.log('📋 Rows:', ${rows.length});
    
    ${compileMain(flow.rows, flow)}
    
    console.log('✅ Flow completed successfully');
    console.log('⏱️ Duration:', runtime.getDuration(), 'ms');
    console.log('📊 Logs:', runtime.logs.length, 'entries');
    
    return {
      success: true,
      logs: runtime.logs,
      duration: runtime.getDuration()
    };
  } catch (err) {
    console.error('❌ Flow failed:', err.message);
    console.error('Stack:', err.stack);
    console.log('📊 Logs before failure:', runtime.logs.length, 'entries');
    
    return {
      success: false,
      error: err.message,
      logs: runtime.logs,
      duration: runtime.getDuration()
    };
  }
}

// Execute if run directly
if (require.main === module) {
  main().then(result => {
    if (!result.success) {
      process.exit(1);
    }
  }).catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}

module.exports = { main, FlowRuntime };
`;

	return code;
}

function compileRows(rows: FlowRow[], flow: Flow): string {
	let code = "";
	rows.forEach((row, rowIdx) => {
		code += `\n// ── Row ${rowIdx + 1}: ${row.id} ──\n`;
		code += `async function executeRow${rowIdx + 1}(input = {}) {\n`;
		code += `  runtime.log('info', 'Starting Row ${rowIdx + 1} (${row.id})');\n`;
		code += `  let ctx = input;\n`;
		code += `  const rowStartTime = Date.now();\n\n`;

		row.steps.forEach((step, stepIdx) => {
			code += `  // Step ${stepIdx + 1}: ${step.type} - ${escapeString(step.label)}\n`;

			// Add condition if enabled
			if (step.condition?.enabled) {
				code += compileCondition(step);
			}

			code += compileStep(step, stepIdx);
			code += `\n`;
		});

		code += `  const rowDuration = Date.now() - rowStartTime;\n`;
		code += `  runtime.log('info', 'Row ${rowIdx + 1} completed', { duration: rowDuration });\n`;
		code += `  return ctx;\n`;
		code += `}\n`;
	});
	return code;
}

function compileCondition(step: FlowStep): string {
	if (!step.condition?.enabled) return "";

	const { field, operator, value } = step.condition;
	const resolvedField = field
		.split(".")
		.map((part, i) => (i === 0 ? `ctx.${part}` : `?.${part}`))
		.join("");

	switch (operator) {
		case "exists":
			return `  if (${resolvedField} === undefined || ${resolvedField} === null) { runtime.log('warn', 'Condition not met: ${field} does not exist'); return ctx; }\n`;
		case "notExists":
			return `  if (${resolvedField} !== undefined && ${resolvedField} !== null) { runtime.log('warn', 'Condition not met: ${field} exists'); return ctx; }\n`;
		case "equals":
			return `  if (${resolvedField} != '${value}') { runtime.log('warn', 'Condition not met: ${field} != ${value}'); return ctx; }\n`;
		case "notEquals":
			return `  if (${resolvedField} == '${value}') { runtime.log('warn', 'Condition not met: ${field} == ${value}'); return ctx; }\n`;
		case "contains":
			return `  if (!String(${resolvedField}).includes('${value}')) { runtime.log('warn', 'Condition not met: ${field} does not contain ${value}'); return ctx; }\n`;
		case "greaterThan":
			return `  if (Number(${resolvedField}) <= ${value}) { runtime.log('warn', 'Condition not met: ${field} <= ${value}'); return ctx; }\n`;
		case "lessThan":
			return `  if (Number(${resolvedField}) >= ${value}) { runtime.log('warn', 'Condition not met: ${field} >= ${value}'); return ctx; }\n`;
		default:
			return "";
	}
}

function compileStep(step: FlowStep, idx: number): string {
	switch (step.type) {
		case "cron":
			return compileCron(step);
		case "webhook":
			return compileWebhook(step);
		case "httpRequest":
			return compileHttpRequest(step);
		case "runCommand":
			return compileRunCommand(step);
		case "copyFile":
			return compileCopyFile(step);
		case "customCode":
			return compileCustomCode(step);
		case "slack":
			return compileSlack(step);
		case "email":
			return compileEmail(step);
		default:
			return `  runtime.log('warn', 'Unknown step type: ${step.type}');\n`;
	}
}

function compileCron(step: FlowStep): string {
	const expr = step.config.expression || "* * * * *";
	return `  // Cron trigger: ${expr}
  runtime.log('info', 'Cron trigger scheduled: ${expr}');
  const cron = require('node-cron');
  cron.schedule('${expr}', async () => {
    runtime.log('info', 'Cron triggered');
    ctx = { firedAt: new Date().toISOString() };
  });
`;
}

function compileWebhook(step: FlowStep): string {
	const port = step.config.port || 3000;
	const method = step.config.method || "POST";
	return `  // Webhook listening on port ${port}
  runtime.log('info', 'Starting webhook server on port ${port}');
  const http = require('http');
  const server = http.createServer(async (req, res) => {
    if (req.method !== '${method}') { 
      res.writeHead(405); 
      return res.end(); 
    }
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      ctx = { 
        method: req.method, 
        body, 
        headers: req.headers, 
        query: req.url ? req.url.split('?')[1] : '' 
      };
      res.writeHead(200);
      res.end('OK');
    });
  });
  server.listen(${port});
  runtime.log('info', 'Webhook server started');
`;
}

function compileHttpRequest(step: FlowStep): string {
	const url = step.config.url || "https://api.example.com";
	const method = (step.config.method || "GET").toLowerCase();
	const body = step.config.body || "{}";
	return `  // HTTP Request: ${method.toUpperCase()} ${url}
  runtime.log('info', 'Making ${method.toUpperCase()} request to ${url}');
  const axios = require('axios');
  try {
    const response = await axios({
      method: '${method}',
      url: runtime.resolveTemplate('${url}', { ctx }),
      data: ${method === "get" ? "undefined" : `runtime.resolveTemplate('${body.replace(/'/g, "\\'")}', { ctx })`},
      timeout: 30000,
      validateStatus: () => true
    });
    ctx = { 
      status: response.status, 
      data: response.data, 
      headers: response.headers 
    };
    runtime.log('info', 'HTTP request successful', { status: response.status });
  } catch (err) {
    runtime.log('error', 'HTTP request failed', { message: err.message });
    ctx = { error: err.message, status: err.response?.status };
    throw err;
  }
`;
}

function compileRunCommand(step: FlowStep): string {
	const command = step.config.command || 'echo "Hello"';
	return `  // Run Command: ${command}
  runtime.log('info', 'Running command: ${command}');
  const { exec } = require('child_process');
  const { promisify } = require('util');
  const execAsync = promisify(exec);
  try {
    const { stdout, stderr } = await execAsync(
      runtime.resolveTemplate('${command.replace(/'/g, "\\'")}', { ctx }),
      { maxBuffer: 10 * 1024 * 1024 }
    );
    ctx = { stdout: stdout.trim(), stderr: stderr.trim(), exitCode: 0 };
    runtime.log('info', 'Command executed', { 
      stdout: stdout.substring(0, 200), 
      exitCode: 0 
    });
  } catch (err) {
    ctx = { 
      stdout: err.stdout?.trim() || '', 
      stderr: err.stderr?.trim() || '', 
      exitCode: err.code || 1 
    };
    runtime.log('error', 'Command failed', { 
      stderr: err.stderr?.substring(0, 200),
      exitCode: err.code 
    });
    throw err;
  }
`;
}

function compileCopyFile(step: FlowStep): string {
	const source = step.config.source || "/tmp/src";
	const dest = step.config.dest || "/tmp/dst";
	return `  // Copy File: ${source} → ${dest}
  runtime.log('info', 'Copying file from ${source} to ${dest}');
  const fs = require('fs').promises;
  const path = require('path');
  const srcPath = runtime.resolveTemplate('${source}', { ctx });
  const dstPath = runtime.resolveTemplate('${dest}', { ctx });
  try {
    await fs.mkdir(path.dirname(dstPath), { recursive: true });
    await fs.copyFile(srcPath, dstPath);
    ctx = { source: srcPath, dest: dstPath, copied: true };
    runtime.log('info', 'File copied successfully');
  } catch (err) {
    runtime.log('error', 'File copy failed', { message: err.message });
    ctx = { error: err.message };
    throw err;
  }
`;
}

function compileCustomCode(step: FlowStep): string {
	const code = step.config.code || "return ctx;";
	return `  // Custom Code
  runtime.log('info', 'Executing custom code');
  try {
    const customFn = (ctx, runtime, require) => {
      ${code}
    };
    ctx = await customFn(ctx, runtime, require);
    runtime.log('info', 'Custom code executed');
  } catch (err) {
    runtime.log('error', 'Custom code failed', { message: err.message });
    ctx = { error: err.message };
    throw err;
  }
`;
}

function compileSlack(step: FlowStep): string {
	const webhook = step.config.webhook || "";
	const message = step.config.message || "Hello from ERA!";
	return `  // Slack Message
  runtime.log('info', 'Sending Slack message');
  const axios = require('axios');
  try {
    const webhookUrl = runtime.resolveTemplate('${webhook}', { ctx, env: process.env });
    const text = runtime.resolveTemplate('${message.replace(/'/g, "\\'")}', { ctx });
    await axios.post(webhookUrl, { text });
    ctx = { sent: true, platform: 'slack' };
    runtime.log('info', 'Slack message sent');
  } catch (err) {
    runtime.log('error', 'Slack message failed', { message: err.message });
    ctx = { error: err.message };
    throw err;
  }
`;
}

function compileEmail(step: FlowStep): string {
	const to = step.config.to || "user@example.com";
	const subject = step.config.subject || "ERA Notification";
	const body = step.config.body || "<p>Hello!</p>";
	return `  // Send Email
  runtime.log('info', 'Sending email to ${to}');
  const nodemailer = require('nodemailer');
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.example.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || ''
      }
    });
    
    const mailOptions = {
      from: process.env.SMTP_FROM || 'era@example.com',
      to: runtime.resolveTemplate('${to}', { ctx }),
      subject: runtime.resolveTemplate('${subject}', { ctx }),
      html: runtime.resolveTemplate('${body.replace(/'/g, "\\'")}', { ctx })
    };
    
    const info = await transporter.sendMail(mailOptions);
    ctx = { sent: true, messageId: info.messageId };
    runtime.log('info', 'Email sent', { messageId: info.messageId });
  } catch (err) {
    runtime.log('error', 'Email failed', { message: err.message });
    ctx = { error: err.message };
    throw err;
  }
`;
}

function compileMain(rows: FlowRow[], flow: Flow): string {
	const errorHandling = flow.settings?.errorHandling || "stop";

	if (rows.length === 1) {
		return `    await executeRow1();\n`;
	}

	if (errorHandling === "continue") {
		return `    // Execute all rows (continue on error)
    const results = await Promise.allSettled([
      ${rows.map((_, i) => `executeRow${i + 1}()`).join(",\n      ")}
    ]);
    results.forEach((r, i) => {
      if (r.status === 'rejected') {
        runtime.log('error', \`Row \${i + 1} failed\`, { error: r.reason.message });
      }
    });\n`;
	}

	return `    // Execute all rows in parallel
    await Promise.all([
      ${rows.map((_, i) => `executeRow${i + 1}()`).join(",\n      ")}
    ]);\n`;
}

function escapeString(str: string): string {
	return str.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}
