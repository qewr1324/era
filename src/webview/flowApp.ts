declare function acquireVsCodeApi(): {
	postMessage(message: any): void;
	getState(): any;
	setState(state: any): void;
};

interface VSCodeAPI {
	postMessage(message: any): void;
	getState(): any;
	setState(state: any): void;
}

const vscode: VSCodeAPI = acquireVsCodeApi();

// ─── Types ──────────────────────────────
interface FieldDef {
	key: string;
	label: string;
	type: "text" | "number" | "select" | "textarea";
	default?: any;
	options?: { label: string; value: any }[];
	placeholder?: string;
}

interface StepType {
	type: string;
	label: string;
	icon: string;
	color: string;
	category: string;
	fields: FieldDef[];
}

interface StepCondition {
	enabled: boolean;
	field: string;
	operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "exists" | "notExists";
	value: string;
}

interface FlowStep {
	id: string;
	type: string;
	label: string;
	config: Record<string, any>;
	condition?: StepCondition;
}

interface FlowRow {
	id: string;
	steps: FlowStep[];
}

interface FlowSettings {
	packageManager: "npm" | "bun" | "pnpm" | "yarn";
	minifyLevel: "none" | "minimal" | "aggressive";
	nodeTarget: "node18" | "node20" | "node22";
	errorHandling: "stop" | "continue";
	concurrency: number;
	retryOnFailure: boolean;
	maxRetries: number;
	bundleMode: "standalone" | "portable";
	outputLanguage: "javascript" | "golang" | "rust";
}

interface FlowVariable {
	name: string;
	value: string;
	description: string;
}

interface Flow {
	version: string;
	name: string;
	rows: FlowRow[];
	settings: FlowSettings;
	variables: FlowVariable[];
}

// ─── Default Settings ────────────────────
const DEFAULT_SETTINGS: FlowSettings = {
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

const DEFAULT_CONDITION: StepCondition = {
	enabled: false,
	field: "ctx",
	operator: "exists",
	value: "",
};

// ─── Step Definitions ───────────────────
const STEP_TYPES: StepType[] = [
	{
		type: "cron",
		label: "Cron",
		icon: "⏰",
		color: "#4A90D9",
		category: "TRIGGER",
		fields: [
			{ key: "expression", label: "Cron Expression", type: "text", default: "*/5 * * * *", placeholder: "*/5 * * * *" },
			{
				key: "timezone",
				label: "Timezone",
				type: "select",
				default: "UTC",
				options: [
					{ label: "UTC", value: "UTC" },
					{ label: "Asia/Tehran", value: "Asia/Tehran" },
					{ label: "America/New_York", value: "America/New_York" },
				],
			},
		],
	},
	{
		type: "webhook",
		label: "Webhook",
		icon: "🌐",
		color: "#4A90D9",
		category: "TRIGGER",
		fields: [
			{ key: "port", label: "Port", type: "number", default: 3000 },
			{
				key: "method",
				label: "Method",
				type: "select",
				default: "POST",
				options: [
					{ label: "GET", value: "GET" },
					{ label: "POST", value: "POST" },
				],
			},
		],
	},
	{
		type: "httpRequest",
		label: "HTTP Request",
		icon: "📡",
		color: "#27AE60",
		category: "ACTION",
		fields: [
			{ key: "url", label: "URL", type: "text", default: "https://api.example.com" },
			{
				key: "method",
				label: "Method",
				type: "select",
				default: "GET",
				options: [
					{ label: "GET", value: "GET" },
					{ label: "POST", value: "POST" },
					{ label: "PUT", value: "PUT" },
				],
			},
			{ key: "body", label: "Body", type: "textarea", default: "", placeholder: "JSON body..." },
		],
	},
	{
		type: "runCommand",
		label: "Run Command",
		icon: "⌨️",
		color: "#27AE60",
		category: "ACTION",
		fields: [{ key: "command", label: "Command", type: "text", default: 'echo "Hello"', placeholder: "npm test" }],
	},
	{
		type: "copyFile",
		label: "Copy File",
		icon: "📋",
		color: "#27AE60",
		category: "ACTION",
		fields: [
			{ key: "source", label: "Source Path", type: "text", default: "/tmp/src" },
			{ key: "dest", label: "Destination Path", type: "text", default: "/tmp/dst" },
		],
	},
	{
		type: "customCode",
		label: "Custom Code",
		icon: "💻",
		color: "#8E44AD",
		category: "CUSTOM",
		fields: [{ key: "code", label: "Code", type: "textarea", default: "// ctx = previous step output\nreturn { result: ctx };", placeholder: "Your code here..." }],
	},
	{
		type: "slack",
		label: "Slack",
		icon: "💬",
		color: "#E67E22",
		category: "NOTIFY",
		fields: [
			{ key: "webhook", label: "Webhook URL", type: "text", default: "" },
			{ key: "message", label: "Message", type: "text", default: "Hello {{ctx}}" },
		],
	},
	{
		type: "email",
		label: "Email",
		icon: "📧",
		color: "#E67E22",
		category: "NOTIFY",
		fields: [
			{ key: "to", label: "To", type: "text", default: "user@example.com" },
			{ key: "subject", label: "Subject", type: "text", default: "ERA Notification" },
			{ key: "body", label: "Body", type: "textarea", default: "<p>Hello!</p>" },
		],
	},
];

// ─── State ──────────────────────────────
let flow: Flow = {
	version: "2.0",
	name: "New Flow",
	rows: [],
	settings: { ...DEFAULT_SETTINGS },
	variables: [],
};
let activeStepId: string | null = null;
let openDropdownRowId: string | null = null;
let isDirty = false;
let autoSaveTimer: ReturnType<typeof setTimeout> | null = null;
let isSaving = false;
let showSettingsPanel = false;
let showVariablesPanel = false;
let draggedStep: { stepId: string; rowId: string; stepIndex: number } | null = null;

// ─── Helper: Generate Unique ID ──────────
function generateId(prefix: string): string {
	return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// ─── State Management ────────────────────
function markDirty(): void {
	isDirty = true;
	if (autoSaveTimer) clearTimeout(autoSaveTimer);
	autoSaveTimer = setTimeout(() => {
		if (isDirty && !isSaving) {
			save();
		}
	}, 800);
}

function save(): void {
	if (isSaving) return;

	isSaving = true;
	try {
		const content = JSON.stringify(flow, null, 2);
		vscode.postMessage({ type: "update", content });
		vscode.setState(flow);
		isDirty = false;
	} catch (error) {
		console.error("Failed to save:", error);
	} finally {
		setTimeout(() => {
			isSaving = false;
		}, 100);
	}
}

function findStep(stepId: string): FlowStep | undefined {
	for (const row of flow.rows) {
		const step = row.steps.find((s) => s.id === stepId);
		if (step) return step;
	}
	return undefined;
}

function validateAndFixFlow(data: any): Flow {
	const fixedRows = Array.isArray(data.rows)
		? data.rows.map((row: any) => ({
				id: row.id || generateId("row"),
				steps: Array.isArray(row.steps)
					? row.steps.map((step: any) => ({
							id: step.id || generateId("step"),
							type: step.type || "httpRequest",
							label: step.label || "Step",
							config: step.config || {},
							condition: step.condition ? { ...DEFAULT_CONDITION, ...step.condition } : undefined,
						}))
					: [],
			}))
		: [];

	return {
		version: data.version || "2.0",
		name: data.name || "New Flow",
		rows: fixedRows,
		settings: data.settings ? { ...DEFAULT_SETTINGS, ...data.settings } : { ...DEFAULT_SETTINGS },
		variables: Array.isArray(data.variables) ? data.variables : [],
	};
}

// ─── Actions ────────────────────────────
function addRow(): void {
	flow.rows.push({ id: generateId("row"), steps: [] });
	openDropdownRowId = null;
	activeStepId = null;
	markDirty();
	render();
}

function deleteRow(rowId: string): void {
	flow.rows = flow.rows.filter((r) => r.id !== rowId);
	if (activeStepId && !flow.rows.some((r) => r.steps.some((s) => s.id === activeStepId))) {
		activeStepId = null;
	}
	openDropdownRowId = null;
	markDirty();
	render();
}

function addStepToRow(rowId: string, stepType: string): void {
	const def = STEP_TYPES.find((t) => t.type === stepType);
	if (!def) {
		console.error(`Unknown step type: ${stepType}`);
		return;
	}

	const step: FlowStep = {
		id: generateId("step"),
		type: def.type,
		label: def.label,
		config: {},
		condition: { ...DEFAULT_CONDITION },
	};

	def.fields.forEach((f) => {
		if (f.default !== undefined) step.config[f.key] = f.default;
	});

	const row = flow.rows.find((r) => r.id === rowId);
	if (row) {
		row.steps.push(step);
		activeStepId = step.id;
	}

	openDropdownRowId = null;
	markDirty();
	render();
}

function removeStep(rowId: string, stepId: string): void {
	const row = flow.rows.find((r) => r.id === rowId);
	if (row) {
		row.steps = row.steps.filter((s) => s.id !== stepId);
		if (activeStepId === stepId) activeStepId = null;
	}
	markDirty();
	render();
}

function moveStep(fromRowId: string, fromStepIndex: number, toRowId: string, toStepIndex: number): void {
	const fromRow = flow.rows.find((r) => r.id === fromRowId);
	const toRow = flow.rows.find((r) => r.id === toRowId);

	if (!fromRow || !toRow) return;
	if (fromRowId === toRowId && fromStepIndex === toStepIndex) return;

	const step = fromRow.steps.splice(fromStepIndex, 1)[0];
	if (!step) return;

	if (fromRowId === toRowId && fromStepIndex < toStepIndex) {
		toStepIndex--;
	}

	toRow.steps.splice(toStepIndex, 0, step);
	markDirty();
	render();
}

function toggleConfig(stepId: string): void {
	activeStepId = activeStepId === stepId ? null : stepId;
	openDropdownRowId = null;
	render();
}

function updateConfig(stepId: string, key: string, value: any): void {
	const step = findStep(stepId);
	if (step) {
		step.config[key] = value;
		markDirty();
	}
}

function updateCondition(stepId: string, field: keyof StepCondition, value: any): void {
	const step = findStep(stepId);
	if (step) {
		if (!step.condition) {
			step.condition = { ...DEFAULT_CONDITION };
		}
		(step.condition as any)[field] = value;
		markDirty();
	}
}

function toggleDropdown(rowId: string): void {
	openDropdownRowId = openDropdownRowId === rowId ? null : rowId;
	activeStepId = null;
	render();
}

// ─── Drag & Drop ────────────────────────
function handleDragStart(e: DragEvent, rowId: string, stepId: string, stepIndex: number): void {
	draggedStep = { stepId, rowId, stepIndex };
	if (e.dataTransfer) {
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("text/plain", stepId);
	}
}

function handleDragOver(e: DragEvent): void {
	e.preventDefault();
	if (e.dataTransfer) {
		e.dataTransfer.dropEffect = "move";
	}
	const target = e.currentTarget as HTMLElement;
	if (target) {
		target.classList.add("drag-over");
	}
}

function handleDragLeave(e: DragEvent): void {
	const target = e.currentTarget as HTMLElement;
	if (target) {
		target.classList.remove("drag-over");
	}
}

function handleDrop(e: DragEvent, toRowId: string, toStepIndex: number): void {
	e.preventDefault();

	document.querySelectorAll(".drag-over").forEach((el) => el.classList.remove("drag-over"));

	if (draggedStep) {
		moveStep(draggedStep.rowId, draggedStep.stepIndex, toRowId, toStepIndex);
	}

	draggedStep = null;
}

function handleDragEnd(): void {
	document.querySelectorAll(".drag-over").forEach((el) => el.classList.remove("drag-over"));
	draggedStep = null;
}

// ─── Variables Manager ──────────────────
function addVariable(): void {
	flow.variables.push({ name: "", value: "", description: "" });
	markDirty();
	renderVariablesPanel();
}

function removeVariable(index: number): void {
	flow.variables.splice(index, 1);
	markDirty();
	renderVariablesPanel();
}

function updateVariable(index: number, field: keyof FlowVariable, value: string): void {
	if (flow.variables[index]) {
		(flow.variables[index] as any)[field] = value;
		markDirty();
	}
}

function toggleVariables(): void {
	showVariablesPanel = !showVariablesPanel;
	if (showVariablesPanel) {
		showSettingsPanel = false;
		renderVariablesPanel();
	} else {
		closeVariablesPanel();
	}
}

function closeVariablesPanel(): void {
	showVariablesPanel = false;
	const modal = document.querySelector(".variables-modal");
	if (modal) modal.remove();
	if (isDirty) save();
}

function renderVariablesPanel(): void {
	const existingModal = document.querySelector(".variables-modal");
	if (existingModal) existingModal.remove();

	const modal = document.createElement("div");
	modal.className = "variables-modal";

	const modalContent = document.createElement("div");
	modalContent.className = "variables-modal-content";

	let variablesHtml = "";
	flow.variables.forEach((v, i) => {
		variablesHtml += `
		<div class="variable-row" style="margin-bottom: 12px; padding: 12px; background: var(--bg); border-radius: 6px;">
			<div style="display: flex; gap: 8px; margin-bottom: 8px;">
				<input type="text" id="varName${i}" value="${escapeHtml(v.name)}" placeholder="Variable Name" style="flex: 1;" class="settings-input" />
				<input type="text" id="varValue${i}" value="${escapeHtml(v.value)}" placeholder="Value" style="flex: 2;" class="settings-input" />
			</div>
			<div style="display: flex; gap: 8px; align-items: center;">
				<input type="text" id="varDesc${i}" value="${escapeHtml(v.description)}" placeholder="Description (optional)" style="flex: 1;" class="settings-input" />
				<button class="btn danger small" id="removeVar${i}">🗑️</button>
			</div>
		</div>`;
	});

	modalContent.innerHTML = `
		<div class="settings-header">
			<span>📦 Variables & Environment</span>
			<button class="settings-close-btn" id="closeVariablesBtn">✕</button>
		</div>
		<div class="settings-body">
			<p class="settings-desc">Define variables that can be used across all steps with <code>{{var.VARIABLE_NAME}}</code></p>
			<div id="variablesList">
				${variablesHtml || '<p style="color: var(--muted); text-align: center; padding: 20px;">No variables defined yet.</p>'}
			</div>
			<button id="addVariableBtn" class="btn" style="margin-top: 12px; width: 100%;">+ Add Variable</button>
		</div>
	`;

	modal.appendChild(modalContent);
	document.body.appendChild(modal);

	modal.querySelector("#closeVariablesBtn")?.addEventListener("click", closeVariablesPanel);
	modal.addEventListener("click", (e) => {
		if (e.target === modal) closeVariablesPanel();
	});

	modal.querySelector("#addVariableBtn")?.addEventListener("click", addVariable);

	flow.variables.forEach((_, i) => {
		modal.querySelector(`#varName${i}`)?.addEventListener("input", (e) => {
			updateVariable(i, "name", (e.target as HTMLInputElement).value);
		});
		modal.querySelector(`#varValue${i}`)?.addEventListener("input", (e) => {
			updateVariable(i, "value", (e.target as HTMLInputElement).value);
		});
		modal.querySelector(`#varDesc${i}`)?.addEventListener("input", (e) => {
			updateVariable(i, "description", (e.target as HTMLInputElement).value);
		});
		modal.querySelector(`#removeVar${i}`)?.addEventListener("click", () => removeVariable(i));
	});
}

// ─── Settings ────────────────────────────
function updateSettings(key: keyof FlowSettings, value: any): void {
	(flow.settings as any)[key] = value;
	markDirty();
	updateSettingsPanelValues();
}

function toggleSettings(): void {
	showSettingsPanel = !showSettingsPanel;
	if (showSettingsPanel) {
		showVariablesPanel = false;
		renderSettingsPanel();
	} else {
		closeSettingsPanel();
	}
}

function closeSettingsPanel(): void {
	showSettingsPanel = false;
	const modal = document.querySelector(".settings-modal");
	if (modal) modal.remove();
	if (isDirty) save();
}

function updateSettingsPanelValues(): void {
	const s = flow.settings;

	const pkgSelect = document.getElementById("setting-packageManager") as HTMLSelectElement;
	if (pkgSelect) pkgSelect.value = s.packageManager;

	const langSelect = document.getElementById("setting-outputLanguage") as HTMLSelectElement;
	if (langSelect) langSelect.value = s.outputLanguage;

	const minifySelect = document.getElementById("setting-minifyLevel") as HTMLSelectElement;
	if (minifySelect) minifySelect.value = s.minifyLevel;

	const nodeSelect = document.getElementById("setting-nodeTarget") as HTMLSelectElement;
	if (nodeSelect) nodeSelect.value = s.nodeTarget;

	const errorSelect = document.getElementById("setting-errorHandling") as HTMLSelectElement;
	if (errorSelect) errorSelect.value = s.errorHandling;

	const concInput = document.getElementById("setting-concurrency") as HTMLInputElement;
	if (concInput) concInput.value = String(s.concurrency);

	const retryCheck = document.getElementById("setting-retryOnFailure") as HTMLInputElement;
	if (retryCheck) retryCheck.checked = s.retryOnFailure;

	const maxRetryInput = document.getElementById("setting-maxRetries") as HTMLInputElement;
	if (maxRetryInput) maxRetryInput.value = String(s.maxRetries);

	const maxRetriesField = document.getElementById("maxRetriesField");
	if (maxRetriesField) {
		maxRetriesField.style.display = s.retryOnFailure ? "" : "none";
	}

	const bundleModeSelect = document.getElementById("setting-bundleMode") as HTMLSelectElement;
	if (bundleModeSelect) bundleModeSelect.value = s.bundleMode;
}

function renderSettingsPanel(): void {
	const existingModal = document.querySelector(".settings-modal");
	if (existingModal) existingModal.remove();

	const settings = flow.settings;

	const modal = document.createElement("div");
	modal.className = "settings-modal";

	const modalContent = document.createElement("div");
	modalContent.className = "settings-modal-content";

	modalContent.innerHTML = `
    <div class="settings-header">
      <span>⚙️ Flow Settings</span>
      <button class="settings-close-btn" id="closeSettingsBtn">✕</button>
    </div>
    <div class="settings-body">
      <div class="settings-section">
        <h4>🔧 Output Language</h4>
        <p class="settings-desc">Choose the target language for code generation</p>
        <select id="setting-outputLanguage" class="settings-select">
          <option value="javascript" ${settings.outputLanguage === "javascript" ? "selected" : ""}>JavaScript/Node.js</option>
          <option value="golang" ${settings.outputLanguage === "golang" ? "selected" : ""} disabled>Go (Golang) - Coming Soon</option>
          <option value="rust" ${settings.outputLanguage === "rust" ? "selected" : ""} disabled>Rust - Coming Soon</option>
        </select>
      </div>

      <div class="settings-section">
        <h4>📦 Package Manager</h4>
        <p class="settings-desc">Choose which package manager to use for installing dependencies</p>
        <select id="setting-packageManager" class="settings-select">
          <option value="npm" ${settings.packageManager === "npm" ? "selected" : ""}>npm (default)</option>
          <option value="bun" ${settings.packageManager === "bun" ? "selected" : ""}>bun (fast)</option>
          <option value="pnpm" ${settings.packageManager === "pnpm" ? "selected" : ""}>pnpm (strict)</option>
          <option value="yarn" ${settings.packageManager === "yarn" ? "selected" : ""}>yarn (classic)</option>
        </select>
      </div>

      <div class="settings-section">
        <h4>📦 Bundle Mode</h4>
        <p class="settings-desc">Standalone bundles everything into one file. Portable needs npm install.</p>
        <select id="setting-bundleMode" class="settings-select">
          <option value="portable" ${settings.bundleMode === "portable" ? "selected" : ""}>Portable (smaller, needs npm install)</option>
          <option value="standalone" ${settings.bundleMode === "standalone" ? "selected" : ""}>Standalone (all-in-one, larger)</option>
        </select>
        ${settings.bundleMode === "standalone" ? '<p class="settings-desc" style="margin-top:6px;color:var(--notify);">⚠️ node-cron & nodemailer use native binaries. Run on target: <code>npm install node-cron nodemailer</code></p>' : ""}
      </div>

      <div class="settings-section">
        <h4>📦 Bundle Settings</h4>
        <div class="settings-field">
          <label>Minify Level</label>
          <select id="setting-minifyLevel" class="settings-select">
            <option value="none" ${settings.minifyLevel === "none" ? "selected" : ""}>No minification</option>
            <option value="minimal" ${settings.minifyLevel === "minimal" ? "selected" : ""}>Minimal</option>
            <option value="aggressive" ${settings.minifyLevel === "aggressive" ? "selected" : ""}>Aggressive</option>
          </select>
        </div>
        <div class="settings-field">
          <label>Node.js Target</label>
          <select id="setting-nodeTarget" class="settings-select">
            <option value="node18" ${settings.nodeTarget === "node18" ? "selected" : ""}>Node 18</option>
            <option value="node20" ${settings.nodeTarget === "node20" ? "selected" : ""}>Node 20</option>
            <option value="node22" ${settings.nodeTarget === "node22" ? "selected" : ""}>Node 22</option>
          </select>
        </div>
      </div>

      <div class="settings-section">
        <h4>🔄 Error Handling</h4>
        <div class="settings-field">
          <label>Error Strategy</label>
          <select id="setting-errorHandling" class="settings-select">
            <option value="stop" ${settings.errorHandling === "stop" ? "selected" : ""}>Stop on error</option>
            <option value="continue" ${settings.errorHandling === "continue" ? "selected" : ""}>Continue on error</option>
          </select>
        </div>
        <div class="settings-field">
          <label>Concurrency</label>
          <input type="number" id="setting-concurrency" class="settings-input" value="${settings.concurrency}" min="1" max="10" />
        </div>
      </div>

      <div class="settings-section">
        <h4>🔁 Retry</h4>
        <div class="settings-field settings-checkbox-field">
          <label class="settings-checkbox-label">
            <input type="checkbox" id="setting-retryOnFailure" ${settings.retryOnFailure ? "checked" : ""} />
            <span>Retry on failure</span>
          </label>
        </div>
        <div class="settings-field" id="maxRetriesField" style="${settings.retryOnFailure ? "" : "display: none;"}">
          <label>Max Retries</label>
          <input type="number" id="setting-maxRetries" class="settings-input" value="${settings.maxRetries}" min="1" max="10" />
        </div>
      </div>
    </div>
  `;

	modal.appendChild(modalContent);
	document.body.appendChild(modal);

	modal.querySelector("#closeSettingsBtn")?.addEventListener("click", () => {
		closeSettingsPanel();
	});

	modal.addEventListener("click", (e) => {
		if (e.target === modal) {
			closeSettingsPanel();
		}
	});

	modal.querySelector("#setting-outputLanguage")?.addEventListener("change", (e) => {
		updateSettings("outputLanguage", (e.target as HTMLSelectElement).value as any);
	});

	modal.querySelector("#setting-packageManager")?.addEventListener("change", (e) => {
		updateSettings("packageManager", (e.target as HTMLSelectElement).value as any);
	});

	modal.querySelector("#setting-bundleMode")?.addEventListener("change", (e) => {
		updateSettings("bundleMode", (e.target as HTMLSelectElement).value as any);
		showSettingsPanel = true;
		renderSettingsPanel();
	});

	modal.querySelector("#setting-minifyLevel")?.addEventListener("change", (e) => {
		updateSettings("minifyLevel", (e.target as HTMLSelectElement).value as any);
	});

	modal.querySelector("#setting-nodeTarget")?.addEventListener("change", (e) => {
		updateSettings("nodeTarget", (e.target as HTMLSelectElement).value as any);
	});

	modal.querySelector("#setting-errorHandling")?.addEventListener("change", (e) => {
		updateSettings("errorHandling", (e.target as HTMLSelectElement).value as any);
	});

	modal.querySelector("#setting-concurrency")?.addEventListener("change", (e) => {
		updateSettings("concurrency", parseInt((e.target as HTMLInputElement).value) || 1);
	});

	modal.querySelector("#setting-retryOnFailure")?.addEventListener("change", (e) => {
		const checked = (e.target as HTMLInputElement).checked;
		updateSettings("retryOnFailure", checked);
		const maxRetriesField = document.getElementById("maxRetriesField");
		if (maxRetriesField) {
			maxRetriesField.style.display = checked ? "" : "none";
		}
	});

	modal.querySelector("#setting-maxRetries")?.addEventListener("change", (e) => {
		updateSettings("maxRetries", parseInt((e.target as HTMLInputElement).value) || 3);
	});
}

// ─── Render ─────────────────────────────
function render(): void {
	const app = document.getElementById("app");
	if (!app) return;

	app.innerHTML = "";

	const header = document.createElement("div");
	header.className = "app-header";
	header.innerHTML = `
    <div class="app-title">
      <span>⚡ ERA Flow</span>
      ${isDirty ? '<span class="dirty-indicator" title="Unsaved changes">●</span>' : ""}
    </div>
    <div class="app-actions">
      <button id="variablesBtn" class="btn" title="Variables (Ctrl+Shift+V)">📦 Vars</button>
      <button id="settingsBtn" class="btn settings-btn" title="Flow Settings (Ctrl+,)">⚙️</button>
      <button id="saveBtn" class="btn">💾 Save</button>
      <button id="exportBtn" class="btn">📦 Export</button>
      <button id="runBtn" class="btn primary">▶ Run</button>
    </div>
  `;
	app.appendChild(header);

	header.querySelector("#variablesBtn")?.addEventListener("click", (e) => {
		e.stopPropagation();
		toggleVariables();
	});
	header.querySelector("#settingsBtn")?.addEventListener("click", (e) => {
		e.stopPropagation();
		toggleSettings();
	});
	header.querySelector("#saveBtn")?.addEventListener("click", () => {
		isDirty = false;
		save();
		render();
	});
	header.querySelector("#exportBtn")?.addEventListener("click", () => vscode.postMessage({ type: "export" }));
	header.querySelector("#runBtn")?.addEventListener("click", () => vscode.postMessage({ type: "run" }));

	if (!flow.rows || flow.rows.length === 0) {
		const empty = document.createElement("div");
		empty.className = "empty-state";
		empty.innerHTML = `
      <div class="empty-icon">🔧</div>
      <p>No flows yet. Create your first automation row.</p>
    `;
		const addBtn = document.createElement("button");
		addBtn.className = "btn primary";
		addBtn.textContent = "+ Create Flow Row";
		addBtn.addEventListener("click", addRow);
		empty.appendChild(addBtn);
		app.appendChild(empty);

		if (showSettingsPanel) renderSettingsPanel();
		if (showVariablesPanel) renderVariablesPanel();
		return;
	}

	flow.rows.forEach((row) => {
		const rowDiv = document.createElement("div");
		rowDiv.className = "flow-row";
		rowDiv.setAttribute("data-row-id", row.id);

		const rowHeader = document.createElement("div");
		rowHeader.className = "row-header";
		const rowNum = row.id.split("_").pop()?.substring(0, 8) || "";
		rowHeader.innerHTML = `Flow Row <span class="row-id">#${rowNum}</span>`;

		const delRowBtn = document.createElement("button");
		delRowBtn.className = "row-delete-btn";
		delRowBtn.textContent = "🗑️";
		delRowBtn.title = "Delete row";
		delRowBtn.addEventListener("click", () => deleteRow(row.id));
		rowHeader.appendChild(delRowBtn);
		rowDiv.appendChild(rowHeader);

		const stepsDiv = document.createElement("div");
		stepsDiv.className = "row-steps";

		if (row.steps && row.steps.length > 0) {
			row.steps.forEach((step, idx) => {
				const def = STEP_TYPES.find((t) => t.type === step.type);
				if (!def) return;

				// Connection line between steps
				if (idx > 0) {
					const connectionLine = document.createElement("div");
					connectionLine.className = "connection-line";
					connectionLine.innerHTML = `
						<svg width="30" height="40" style="display: block;">
							<line x1="0" y1="20" x2="30" y2="20" stroke="var(--accent)" stroke-width="2" stroke-dasharray="4,3" opacity="0.6"/>
							<circle cx="30" cy="20" r="3" fill="var(--accent)" opacity="0.8"/>
						</svg>
					`;
					stepsDiv.appendChild(connectionLine);
				}

				const pillContainer = document.createElement("div");
				pillContainer.className = "step-pill-container";
				pillContainer.setAttribute("draggable", "true");
				pillContainer.addEventListener("dragstart", (e) => handleDragStart(e, row.id, step.id, idx));
				pillContainer.addEventListener("dragover", handleDragOver);
				pillContainer.addEventListener("dragleave", handleDragLeave);
				pillContainer.addEventListener("drop", (e) => handleDrop(e, row.id, idx));
				pillContainer.addEventListener("dragend", handleDragEnd);

				// Condition badge
				if (step.condition?.enabled) {
					const conditionBadge = document.createElement("div");
					conditionBadge.className = "condition-badge";
					conditionBadge.textContent = "?";
					conditionBadge.title = "Has condition";
					pillContainer.appendChild(conditionBadge);
				}

				const pill = document.createElement("div");
				pill.className = `step-pill ${activeStepId === step.id ? "active" : ""}`;
				pill.style.borderColor = def.color + "30";

				const icon = document.createElement("div");
				icon.className = "step-icon";
				icon.style.background = def.color + "20";
				icon.style.color = def.color;
				icon.textContent = def.icon;
				icon.addEventListener("click", (e) => {
					e.stopPropagation();
					toggleConfig(step.id);
				});

				const label = document.createElement("span");
				label.className = "step-label";
				label.textContent = step.label;
				label.addEventListener("click", (e) => {
					e.stopPropagation();
					toggleConfig(step.id);
				});

				const arrow = document.createElement("span");
				arrow.className = "step-dropdown-arrow";
				arrow.textContent = "▼";
				arrow.addEventListener("click", (e) => {
					e.stopPropagation();
					toggleConfig(step.id);
				});

				const remove = document.createElement("span");
				remove.className = "step-remove";
				remove.textContent = "×";
				remove.title = "Remove step";
				remove.addEventListener("click", (e) => {
					e.stopPropagation();
					removeStep(row.id, step.id);
				});

				pill.appendChild(icon);
				pill.appendChild(label);
				pill.appendChild(arrow);
				pill.appendChild(remove);
				pillContainer.appendChild(pill);
				stepsDiv.appendChild(pillContainer);
			});
		}

		// End drop zone
		const endDropZone = document.createElement("div");
		endDropZone.className = "end-drop-zone";
		endDropZone.addEventListener("dragover", handleDragOver);
		endDropZone.addEventListener("dragleave", handleDragLeave);
		endDropZone.addEventListener("drop", (e) => handleDrop(e, row.id, row.steps.length));
		endDropZone.addEventListener("dragend", handleDragEnd);
		endDropZone.textContent = "Drop";
		stepsDiv.appendChild(endDropZone);

		const addContainer = document.createElement("div");
		addContainer.style.position = "relative";

		const addBtn = document.createElement("button");
		addBtn.className = "add-step-btn";
		addBtn.textContent = "+";
		addBtn.title = "Add step";
		addBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			toggleDropdown(row.id);
		});

		const dropdown = document.createElement("div");
		dropdown.className = `step-type-dropdown ${openDropdownRowId === row.id ? "open" : ""}`;

		const categories = ["TRIGGER", "ACTION", "CUSTOM", "NOTIFY"];
		const catLabels: Record<string, string> = {
			TRIGGER: "Triggers",
			ACTION: "Actions",
			CUSTOM: "Custom",
			NOTIFY: "Notifications",
		};

		categories.forEach((cat) => {
			const types = STEP_TYPES.filter((t) => t.category === cat);
			if (types.length === 0) return;

			const groupLabel = document.createElement("div");
			groupLabel.className = "step-type-group-label";
			groupLabel.textContent = catLabels[cat];
			dropdown.appendChild(groupLabel);

			types.forEach((t) => {
				const opt = document.createElement("div");
				opt.className = "step-type-option";
				opt.innerHTML = `
          <span class="opt-icon">${t.icon}</span>
          <span class="opt-label">${t.label}</span>
        `;
				opt.addEventListener("click", (e) => {
					e.stopPropagation();
					addStepToRow(row.id, t.type);
				});
				dropdown.appendChild(opt);
			});
		});

		addContainer.appendChild(addBtn);
		addContainer.appendChild(dropdown);
		stepsDiv.appendChild(addContainer);
		rowDiv.appendChild(stepsDiv);

		// Config panel for active step
		if (activeStepId && row.steps.some((s) => s.id === activeStepId)) {
			const activeStep = row.steps.find((s) => s.id === activeStepId)!;
			const activeDef = STEP_TYPES.find((t) => t.type === activeStep.type);
			if (!activeDef) return;

			const configPanel = document.createElement("div");
			configPanel.className = "step-config-panel open";

			const panelHeader = document.createElement("div");
			panelHeader.className = "config-panel-header";
			panelHeader.textContent = `${activeDef.icon} ${activeDef.label} Settings`;
			configPanel.appendChild(panelHeader);

			// Condition section
			const conditionSection = document.createElement("div");
			conditionSection.className = "condition-section";
			conditionSection.innerHTML = `
				<div class="config-field">
					<label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
						<input type="checkbox" id="conditionEnabled_${activeStep.id}" ${activeStep.condition?.enabled ? "checked" : ""} />
						<span>🔀 Conditional Execution</span>
					</label>
				</div>
				<div class="condition-fields" id="conditionFields_${activeStep.id}" style="display: ${activeStep.condition?.enabled ? "block" : "none"};">
					<div class="config-field">
						<label>Field to Check</label>
						<input type="text" id="conditionField_${activeStep.id}" value="${escapeHtml(activeStep.condition?.field || "ctx")}" placeholder="e.g. ctx.status" />
					</div>
					<div class="config-field">
						<label>Operator</label>
						<select id="conditionOperator_${activeStep.id}">
							<option value="equals" ${activeStep.condition?.operator === "equals" ? "selected" : ""}>Equals (=)</option>
							<option value="notEquals" ${activeStep.condition?.operator === "notEquals" ? "selected" : ""}>Not Equals (≠)</option>
							<option value="contains" ${activeStep.condition?.operator === "contains" ? "selected" : ""}>Contains</option>
							<option value="greaterThan" ${activeStep.condition?.operator === "greaterThan" ? "selected" : ""}>Greater Than (>)</option>
							<option value="lessThan" ${activeStep.condition?.operator === "lessThan" ? "selected" : ""}>Less Than (<)</option>
							<option value="exists" ${activeStep.condition?.operator === "exists" ? "selected" : ""}>Exists</option>
							<option value="notExists" ${activeStep.condition?.operator === "notExists" ? "selected" : ""}>Not Exists</option>
						</select>
					</div>
					<div class="config-field" id="conditionValueField_${activeStep.id}" style="display: ${activeStep.condition?.operator && !["exists", "notExists"].includes(activeStep.condition.operator) ? "block" : "none"};">
						<label>Value</label>
						<input type="text" id="conditionValue_${activeStep.id}" value="${escapeHtml(activeStep.condition?.value || "")}" placeholder="Expected value" />
					</div>
				</div>
			`;
			configPanel.appendChild(conditionSection);

			// Step fields
			activeDef.fields.forEach((f) => {
				const fieldDiv = document.createElement("div");
				fieldDiv.className = "config-field";

				const lbl = document.createElement("label");
				lbl.textContent = f.label;
				fieldDiv.appendChild(lbl);

				const val = activeStep.config[f.key] ?? "";

				if (f.type === "select" && f.options) {
					const sel = document.createElement("select");
					f.options.forEach((o) => {
						const opt = document.createElement("option");
						opt.value = String(o.value);
						opt.textContent = o.label;
						if (val === o.value) opt.selected = true;
						sel.appendChild(opt);
					});
					sel.addEventListener("change", () => updateConfig(activeStep.id, f.key, sel.value));
					fieldDiv.appendChild(sel);
				} else if (f.type === "textarea") {
					const ta = document.createElement("textarea");
					ta.value = val;
					ta.placeholder = f.placeholder || "";
					ta.addEventListener("input", () => updateConfig(activeStep.id, f.key, ta.value));
					fieldDiv.appendChild(ta);
				} else if (f.type === "number") {
					const inp = document.createElement("input");
					inp.type = "number";
					inp.value = val;
					inp.addEventListener("change", () => updateConfig(activeStep.id, f.key, Number(inp.value)));
					fieldDiv.appendChild(inp);
				} else {
					const inp = document.createElement("input");
					inp.type = "text";
					inp.value = val;
					inp.placeholder = f.placeholder || "";
					inp.addEventListener("input", () => updateConfig(activeStep.id, f.key, inp.value));
					fieldDiv.appendChild(inp);
				}

				configPanel.appendChild(fieldDiv);
			});

			rowDiv.appendChild(configPanel);

			// Condition event listeners
			setTimeout(() => {
				document.getElementById(`conditionEnabled_${activeStep.id}`)?.addEventListener("change", (e) => {
					const checked = (e.target as HTMLInputElement).checked;
					updateCondition(activeStep.id, "enabled", checked);
					const fields = document.getElementById(`conditionFields_${activeStep.id}`);
					if (fields) fields.style.display = checked ? "block" : "none";
				});

				document.getElementById(`conditionField_${activeStep.id}`)?.addEventListener("input", (e) => {
					updateCondition(activeStep.id, "field", (e.target as HTMLInputElement).value);
				});

				document.getElementById(`conditionOperator_${activeStep.id}`)?.addEventListener("change", (e) => {
					const operator = (e.target as HTMLSelectElement).value;
					updateCondition(activeStep.id, "operator", operator);
					const valueField = document.getElementById(`conditionValueField_${activeStep.id}`);
					if (valueField) {
						valueField.style.display = ["exists", "notExists"].includes(operator) ? "none" : "block";
					}
				});

				document.getElementById(`conditionValue_${activeStep.id}`)?.addEventListener("input", (e) => {
					updateCondition(activeStep.id, "value", (e.target as HTMLInputElement).value);
				});
			}, 0);
		}

		app.appendChild(rowDiv);
	});

	const addRowSection = document.createElement("div");
	addRowSection.className = "add-row-section";
	const addRowBtn = document.createElement("button");
	addRowBtn.className = "add-row-btn";
	addRowBtn.textContent = "+ Add New Row";
	addRowBtn.addEventListener("click", addRow);
	addRowSection.appendChild(addRowBtn);
	app.appendChild(addRowSection);

	if (showSettingsPanel) renderSettingsPanel();
	if (showVariablesPanel) renderVariablesPanel();
}

// ─── Helpers ─────────────────────────────
function escapeHtml(str: string): string {
	const div = document.createElement("div");
	div.textContent = str;
	return div.innerHTML;
}

// ─── Init ───────────────────────────────
function init(): void {
	window.addEventListener("message", (e: MessageEvent) => {
		const message = e.data;
		if (message.type === "setContent") {
			try {
				const parsed = JSON.parse(message.content);
				flow = validateAndFixFlow(parsed);
				isDirty = false;
			} catch (error) {
				console.error("Failed to parse flow:", error);
				flow = { version: "2.0", name: "New Flow", rows: [], settings: { ...DEFAULT_SETTINGS }, variables: [] };
			}
			render();
		}
	});

	const savedState = vscode.getState();
	if (savedState) {
		flow = validateAndFixFlow(savedState);
	}

	render();
}

// ─── Keyboard Shortcuts ──────────────────
document.addEventListener("keydown", (e: KeyboardEvent) => {
	if ((e.ctrlKey || e.metaKey) && e.key === "s") {
		e.preventDefault();
		isDirty = false;
		save();
		render();
	}

	if ((e.ctrlKey || e.metaKey) && e.key === ",") {
		e.preventDefault();
		toggleSettings();
	}

	if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "V") {
		e.preventDefault();
		toggleVariables();
	}

	if (e.key === "Escape") {
		if (showSettingsPanel) {
			closeSettingsPanel();
			return;
		}
		if (showVariablesPanel) {
			closeVariablesPanel();
			return;
		}
		if (openDropdownRowId || activeStepId) {
			openDropdownRowId = null;
			activeStepId = null;
			render();
		}
	}
});

document.addEventListener("click", (e: MouseEvent) => {
	const target = e.target as HTMLElement;
	if (!target.closest(".step-type-dropdown") && !target.closest(".add-step-btn") && !target.closest(".settings-modal-content") && !target.closest(".variables-modal-content")) {
		if (openDropdownRowId) {
			openDropdownRowId = null;
			render();
		}
	}
});

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}
