export function generate(params: any): string {
	return `[tool.black]
line-length = 100
target-version = ['py312']
include = '\\.pyi?$'
extend-exclude = '''
/(
    \\.eggs
  | \\.git
  | \\.venv
  | _build
  | buck-out
  | build
  | dist
  | migrations
)/
'''`;
}
