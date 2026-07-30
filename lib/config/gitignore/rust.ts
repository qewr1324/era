export function generate(params: any): string {
	return `# Build output
target/
debug/
release/

# Cargo
.cargo/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Environment
.env`;
}
