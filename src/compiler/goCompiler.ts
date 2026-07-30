import { Flow, FlowRow, FlowStep } from "../types/flow";

export function compileGo(flow: Flow): string {
	const rows = flow.rows;

	let code = `// ⚡ ERA Flow - Generated Go Code
// Flow: ${flow.name}
// Generated at: ${new Date().toISOString()}

package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"os/exec"
	"time"
)

// FlowRuntime manages execution context
type FlowRuntime struct {
	Context  map[string]interface{}
	Logs     []LogEntry
	StartTime time.Time
}

type LogEntry struct {
	Timestamp string      \`json:"timestamp"\`
	Level     string      \`json:"level"\`
	Message   string      \`json:"message"\`
	Data      interface{} \`json:"data"\`
}

func NewFlowRuntime() *FlowRuntime {
	return &FlowRuntime{
		Context:   make(map[string]interface{}),
		Logs:      []LogEntry{},
		StartTime: time.Now(),
	}
}

func (r *FlowRuntime) Log(level, message string, data interface{}) {
	entry := LogEntry{
		Timestamp: time.Now().Format(time.RFC3339),
		Level:     level,
		Message:   message,
		Data:      data,
	}
	r.Logs = append(r.Logs, entry)
	
	switch level {
	case "error":
		log.Printf("[ERROR] %s: %v", message, data)
	case "warn":
		log.Printf("[WARN] %s: %v", message, data)
	default:
		log.Printf("[INFO] %s: %v", message, data)
	}
}

func (r *FlowRuntime) Duration() time.Duration {
	return time.Since(r.StartTime)
}

${compileGoVariables(flow.variables)}

${compileGoRows(rows, flow)}

func main() {
	runtime := NewFlowRuntime()
	
	fmt.Println("🚀 Starting ERA Flow: ${flow.name}")
	fmt.Printf("📋 Rows: %d\\n", ${rows.length})
	
	${compileGoMain(rows, flow)}
	
	fmt.Println("✅ Flow completed successfully")
	fmt.Printf("⏱️ Duration: %v\\n", runtime.Duration())
	fmt.Printf("📊 Logs: %d entries\\n", len(runtime.Logs))
}
`;

	return code;
}

function compileGoVariables(variables: { name: string; value: string }[]): string {
	if (variables.length === 0) return "";

	let code = "\n// Flow Variables\nvar (\n";
	variables.forEach((v) => {
		code += `\t${v.name} = "${v.value.replace(/"/g, '\\"')}"\n`;
	});
	code += ")\n";
	return code;
}

function compileGoRows(rows: FlowRow[], flow: Flow): string {
	let code = "";
	rows.forEach((row, idx) => {
		code += `
func executeRow${idx + 1}(runtime *FlowRuntime, input map[string]interface{}) map[string]interface{} {
	runtime.Log("info", "Starting Row ${idx + 1}", nil)
	ctx := input
	
	${row.steps.map((step, stepIdx) => compileGoStep(step, stepIdx)).join("\n\t")}
	
	runtime.Log("info", "Row ${idx + 1} completed", nil)
	return ctx
}
`;
	});
	return code;
}

function compileGoStep(step: FlowStep, idx: number): string {
	const condition = compileGoCondition(step);

	switch (step.type) {
		case "httpRequest":
			return compileGoHttpRequest(step, condition);
		case "runCommand":
			return compileGoRunCommand(step, condition);
		case "copyFile":
			return compileGoCopyFile(step, condition);
		case "customCode":
			return compileGoCustomCode(step, condition);
		case "slack":
			return compileGoSlack(step, condition);
		case "email":
			return compileGoEmail(step, condition);
		default:
			return `runtime.Log("warn", "Unknown step type: ${step.type}", nil)`;
	}
}

function compileGoCondition(step: FlowStep): string {
	if (!step.condition?.enabled) return "";

	const { field, operator, value } = step.condition;

	switch (operator) {
		case "exists":
			return `if _, ok := ctx["${field}"].(map[string]interface{}); !ok { return ctx }\n\t`;
		case "notExists":
			return `if _, ok := ctx["${field}"].(map[string]interface{}); ok { return ctx }\n\t`;
		case "equals":
			return `if fmt.Sprintf("%v", ctx["${field}"]) != "${value}" { return ctx }\n\t`;
		case "notEquals":
			return `if fmt.Sprintf("%v", ctx["${field}"]) == "${value}" { return ctx }\n\t`;
		case "contains":
			return `if !strings.Contains(fmt.Sprintf("%v", ctx["${field}"]), "${value}") { return ctx }\n\t`;
		default:
			return "";
	}
}

function compileGoHttpRequest(step: FlowStep, condition: string): string {
	const url = step.config.url || "https://api.example.com";
	const method = step.config.method || "GET";

	return `// HTTP Request
	${condition}runtime.Log("info", "Making ${method} request to ${url}", nil)
	req, _ := http.NewRequest("${method}", fmt.Sprintf("%v", ctx["url"]), nil)
	client := &http.Client{Timeout: 30 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		runtime.Log("error", "HTTP request failed", err.Error())
		ctx["error"] = err.Error()
		return ctx
	}
	defer resp.Body.Close()
	body, _ := io.ReadAll(resp.Body)
	ctx["status"] = resp.StatusCode
	ctx["data"] = string(body)
	runtime.Log("info", "HTTP request successful", resp.StatusCode)
`;
}

function compileGoRunCommand(step: FlowStep, condition: string): string {
	const command = step.config.command || 'echo "Hello"';

	return `// Run Command
	${condition}runtime.Log("info", "Running command: ${command}", nil)
	cmd := exec.Command("sh", "-c", fmt.Sprintf("%v", ctx["command"]))
	output, err := cmd.CombinedOutput()
	ctx["output"] = string(output)
	if err != nil {
		runtime.Log("error", "Command failed", err.Error())
		ctx["error"] = err.Error()
	} else {
		runtime.Log("info", "Command executed successfully", nil)
	}
`;
}

function compileGoCopyFile(step: FlowStep, condition: string): string {
	const source = step.config.source || "/tmp/src";
	const dest = step.config.dest || "/tmp/dst";

	return `// Copy File
	${condition}runtime.Log("info", "Copying file", nil)
	srcData, err := os.ReadFile(fmt.Sprintf("%v", ctx["source"]))
	if err != nil {
		runtime.Log("error", "Failed to read source file", err.Error())
		ctx["error"] = err.Error()
		return ctx
	}
	err = os.WriteFile(fmt.Sprintf("%v", ctx["dest"]), srcData, 0644)
	if err != nil {
		runtime.Log("error", "Failed to write destination file", err.Error())
		ctx["error"] = err.Error()
		return ctx
	}
	ctx["copied"] = true
	runtime.Log("info", "File copied successfully", nil)
`;
}

function compileGoCustomCode(step: FlowStep, condition: string): string {
	return `// Custom Code
	${condition}runtime.Log("info", "Executing custom code", nil)
	// Custom Go code placeholder
	ctx["custom_result"] = "executed"
	runtime.Log("info", "Custom code executed", nil)
`;
}

function compileGoSlack(step: FlowStep, condition: string): string {
	return `// Slack Message
	${condition}runtime.Log("info", "Sending Slack message", nil)
	webhookURL := os.Getenv("SLACK_WEBHOOK")
	message := map[string]string{"text": fmt.Sprintf("%v", ctx["message"])}
	jsonData, _ := json.Marshal(message)
	resp, err := http.Post(webhookURL, "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		runtime.Log("error", "Slack message failed", err.Error())
		ctx["error"] = err.Error()
	} else {
		defer resp.Body.Close()
		ctx["sent"] = true
		runtime.Log("info", "Slack message sent", nil)
	}
`;
}

function compileGoEmail(step: FlowStep, condition: string): string {
	return `// Send Email
	${condition}runtime.Log("info", "Sending email", nil)
	// Email sending requires SMTP library - using placeholder
	runtime.Log("warn", "Email support requires net/smtp configuration", nil)
	ctx["sent"] = true
`;
}

function compileGoMain(rows: FlowRow[], flow: Flow): string {
	if (rows.length === 1) {
		return `ctx := executeRow1(runtime, runtime.Context)`;
	}

	return `// Execute all rows
	results := make([]map[string]interface{}, ${rows.length})
	${rows.map((_, i) => `results[${i}] = executeRow${i + 1}(runtime, runtime.Context)`).join("\n\t")}`;
}
