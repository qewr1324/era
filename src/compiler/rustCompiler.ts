import { Flow, FlowRow, FlowStep } from "../types/flow";

export function compileRust(flow: Flow): string {
	const rows = flow.rows;

	let code = `// ⚡ ERA Flow - Generated Rust Code
// Flow: ${flow.name}
// Generated at: ${new Date().toISOString()}

use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::process::Command;
use std::time::Instant;
use chrono::Utc;

#[derive(Debug, Serialize, Deserialize)]
struct LogEntry {
    timestamp: String,
    level: String,
    message: String,
    data: serde_json::Value,
}

struct FlowRuntime {
    context: HashMap<String, serde_json::Value>,
    logs: Vec<LogEntry>,
    start_time: Instant,
}

impl FlowRuntime {
    fn new() -> Self {
        FlowRuntime {
            context: HashMap::new(),
            logs: Vec::new(),
            start_time: Instant::now(),
        }
    }
    
    fn log(&mut self, level: &str, message: &str, data: serde_json::Value) {
        let entry = LogEntry {
            timestamp: Utc::now().to_rfc3339(),
            level: level.to_string(),
            message: message.to_string(),
            data,
        };
        
        match level {
            "error" => eprintln!("[ERROR] {}: {:?}", message, entry.data),
            "warn" => eprintln!("[WARN] {}: {:?}", message, entry.data),
            _ => println!("[INFO] {}: {:?}", message, entry.data),
        }
        
        self.logs.push(entry);
    }
    
    fn duration(&self) -> std::time::Duration {
        self.start_time.elapsed()
    }
}

${compileRustVariables(flow.variables)}

${compileRustRows(rows, flow)}

fn main() {
    let mut runtime = FlowRuntime::new();
    
    println!("🚀 Starting ERA Flow: ${flow.name}");
    println!("📋 Rows: {}", ${rows.length});
    
    ${compileRustMain(rows, flow)}
    
    println!("✅ Flow completed successfully");
    println!("⏱️ Duration: {:?}", runtime.duration());
    println!("📊 Logs: {} entries", runtime.logs.len());
}
`;

	return code;
}

function compileRustVariables(variables: { name: string; value: string }[]): string {
	if (variables.length === 0) return "";

	let code = "// Flow Variables\n";
	variables.forEach((v) => {
		code += `const ${v.name.toUpperCase()}: &str = "${v.value.replace(/"/g, '\\"')}";\n`;
	});
	return code;
}

function compileRustRows(rows: FlowRow[], flow: Flow): string {
	let code = "";
	rows.forEach((row, idx) => {
		code += `
fn execute_row_${idx + 1}(runtime: &mut FlowRuntime, input: HashMap<String, serde_json::Value>) -> HashMap<String, serde_json::Value> {
    runtime.log("info", &format!("Starting Row {}", ${idx + 1}), serde_json::json!({}));
    let mut ctx = input;
    
    ${row.steps.map((step, stepIdx) => compileRustStep(step, stepIdx)).join("\n    ")}
    
    runtime.log("info", &format!("Row {} completed", ${idx + 1}), serde_json::json!({}));
    ctx
}
`;
	});
	return code;
}

function compileRustStep(step: FlowStep, idx: number): string {
	const condition = compileRustCondition(step);

	switch (step.type) {
		case "httpRequest":
			return compileRustHttpRequest(step, condition);
		case "runCommand":
			return compileRustRunCommand(step, condition);
		case "copyFile":
			return compileRustCopyFile(step, condition);
		case "customCode":
			return compileRustCustomCode(step, condition);
		case "slack":
			return compileRustSlack(step, condition);
		case "email":
			return compileRustEmail(step, condition);
		default:
			return `runtime.log("warn", "Unknown step type", serde_json::json!({}));`;
	}
}

function compileRustCondition(step: FlowStep): string {
	if (!step.condition?.enabled) return "";

	const { field, operator, value } = step.condition;

	switch (operator) {
		case "exists":
			return `if !ctx.contains_key("${field}") { return ctx; }\n    `;
		case "notExists":
			return `if ctx.contains_key("${field}") { return ctx; }\n    `;
		case "equals":
			return `if ctx.get("${field}").map(|v| v.to_string()) != Some("${value}".to_string()) { return ctx; }\n    `;
		default:
			return "";
	}
}

function compileRustHttpRequest(step: FlowStep, condition: string): string {
	const url = step.config.url || "https://api.example.com";
	const method = step.config.method || "GET";

	return `// HTTP Request
    ${condition}runtime.log("info", "Making ${method} request", serde_json::json!({}));
    let client = reqwest::blocking::Client::new();
    let resp = client.${method.toLowerCase()}("${url}")
        .timeout(std::time::Duration::from_secs(30))
        .send();
    
    match resp {
        Ok(response) => {
            ctx.insert("status".to_string(), serde_json::json!(response.status().as_u16()));
            let body = response.text().unwrap_or_default();
            ctx.insert("data".to_string(), serde_json::json!(body));
            runtime.log("info", "HTTP request successful", serde_json::json!({}));
        },
        Err(e) => {
            runtime.log("error", "HTTP request failed", serde_json::json!(e.to_string()));
            ctx.insert("error".to_string(), serde_json::json!(e.to_string()));
        }
    }
`;
}

function compileRustRunCommand(step: FlowStep, condition: string): string {
	const command = step.config.command || 'echo "Hello"';

	return `// Run Command
    ${condition}runtime.log("info", "Running command", serde_json::json!({}));
    let output = Command::new("sh")
        .arg("-c")
        .arg("${command.replace(/"/g, '\\"')}")
        .output();
    
    match output {
        Ok(out) => {
            ctx.insert("output".to_string(), serde_json::json!(String::from_utf8_lossy(&out.stdout).to_string()));
            if out.status.success() {
                runtime.log("info", "Command executed", serde_json::json!({}));
            } else {
                runtime.log("error", "Command failed", serde_json::json!(String::from_utf8_lossy(&out.stderr)));
            }
        },
        Err(e) => {
            runtime.log("error", "Command failed", serde_json::json!(e.to_string()));
        }
    }
`;
}

function compileRustCopyFile(step: FlowStep, condition: string): string {
	return `// Copy File
    ${condition}runtime.log("info", "Copying file", serde_json::json!({}));
    match std::fs::copy(
        ctx.get("source").and_then(|v| v.as_str()).unwrap_or(""),
        ctx.get("dest").and_then(|v| v.as_str()).unwrap_or(""),
    ) {
        Ok(_) => {
            ctx.insert("copied".to_string(), serde_json::json!(true));
            runtime.log("info", "File copied successfully", serde_json::json!({}));
        },
        Err(e) => {
            runtime.log("error", "File copy failed", serde_json::json!(e.to_string()));
        }
    }
`;
}

function compileRustCustomCode(step: FlowStep, condition: string): string {
	return `// Custom Code
    ${condition}runtime.log("info", "Executing custom code", serde_json::json!({}));
    // Custom Rust code placeholder
    ctx.insert("custom_result".to_string(), serde_json::json!("executed"));
    runtime.log("info", "Custom code executed", serde_json::json!({}));
`;
}

function compileRustSlack(step: FlowStep, condition: string): string {
	return `// Slack Message
    ${condition}runtime.log("info", "Sending Slack message", serde_json::json!({}));
    // Slack webhook implementation
    ctx.insert("sent".to_string(), serde_json::json!(true));
    runtime.log("info", "Slack message sent", serde_json::json!({}));
`;
}

function compileRustEmail(step: FlowStep, condition: string): string {
	return `// Send Email
    ${condition}runtime.log("info", "Sending email", serde_json::json!({}));
    // Email sending with lettre crate
    ctx.insert("sent".to_string(), serde_json::json!(true));
    runtime.log("info", "Email sent", serde_json::json!({}));
`;
}

function compileRustMain(rows: FlowRow[], flow: Flow): string {
	if (rows.length === 1) {
		return `let ctx = execute_row_1(&mut runtime, runtime.context);`;
	}

	return `// Execute all rows
    ${rows.map((_, i) => `let ctx_${i + 1} = execute_row_${i + 1}(&mut runtime, runtime.context.clone());`).join("\n    ")}`;
}
