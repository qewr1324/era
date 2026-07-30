export function generate(params: any): string {
	return `[flake8]
max-line-length = 100
max-complexity = 10
extend-ignore = E203, W503
exclude =
    .git,
    __pycache__,
    .venv,
    venv,
    migrations,
    node_modules
per-file-ignores =
    __init__.py:F401
    tests/*:S101`;
}
