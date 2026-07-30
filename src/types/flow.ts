export interface StepCondition {
	enabled: boolean;
	field: string;
	operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "exists" | "notExists";
	value: string;
}

export interface FlowVariable {
	name: string;
	value: string;
	description: string;
}

export interface FlowSettings {
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

export interface FlowStep {
	id: string;
	type: string;
	label: string;
	config: Record<string, any>;
	condition?: StepCondition;
}

export interface FlowRow {
	id: string;
	steps: FlowStep[];
}

export interface Flow {
	version: string;
	name: string;
	rows: FlowRow[];
	settings: FlowSettings;
	variables: FlowVariable[];
}

export interface StepType {
	type: string;
	label: string;
	icon: string;
	color: string;
	category: string;
	fields: FieldDef[];
}

export interface FieldDef {
	key: string;
	label: string;
	type: "text" | "number" | "select" | "textarea";
	default?: any;
	options?: { label: string; value: any }[];
	placeholder?: string;
}
