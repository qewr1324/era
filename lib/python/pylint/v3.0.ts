export function generate(params: any): string {
	return `[MASTER]
ignore=migrations,tests,venv,.venv
init-hook='import sys; sys.path.append(".")'

[MESSAGES CONTROL]
disable=
    C0114,
    C0115,
    C0116,
    R0903,
    W0212

[FORMAT]
max-line-length=100

[DESIGN]
max-args=7
max-attributes=10
max-locals=20

[IMPORTS]
allow-wildcard-with-all=yes

[SIMILARITIES]
min-similarity-lines=8`;
}
