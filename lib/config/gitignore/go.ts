export function generate(params: any): string {
	return `# Binaries
*.exe
*.exe~
*.dll
*.so
*.dylib
main

# Test binary
*.test

# Output of go coverage
*.out

# Dependencies
vendor/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Environment
.env`;
}
