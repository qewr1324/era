export function generate(params: any): string {
	return `# Build results
[Dd]ebug/
[Rr]elease/
x64/
x86/
bld/
[Bb]in/
[Oo]bj/

# Visual Studio files
.vs/
*.suo
*.user
*.userosscache
*.sln.docstates

# JetBrains Rider
.idea/

# VS Code
.vscode/

# NuGet
**/[Pp]ackages/*
*.nupkg
**/[Pp]ackages/repositories.config

# OS
.DS_Store
Thumbs.db`;
}
