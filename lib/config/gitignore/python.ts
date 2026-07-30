export function generate(params: any): string {
	return `# Byte-compiled
__pycache__/
*.py[cod]
*$py.class

# Virtual Environment
venv/
env/
.env
.venv

# Distribution
dist/
build/
*.egg-info/
*.egg

# Unit test / coverage
htmlcov/
.coverage
.pytest_cache/

# IDE
.vscode/
.idea/

# Jupyter
.ipynb_checkpoints

# Environment
.env

# OS
.DS_Store
Thumbs.db`;
}
