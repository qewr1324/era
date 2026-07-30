export function generate(params: any): string {
	return `syntax: glob

*.pyc
*.pyo
__pycache__/
*.class

node_modules/
dist/
build/
.next/
target/

.env
.env.*

.vscode/
.idea/

.DS_Store
Thumbs.db

*.log

coverage/
htmlcov/`;
}
