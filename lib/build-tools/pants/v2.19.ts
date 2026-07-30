export function generate(params: any): string {
	return `[GLOBAL]
pants_version = "2.19.0"

backend_packages = [
    "pants.backend.python",
    "pants.backend.shell",
    "pants.backend.docker",
]

[python]
interpreter_constraints = [">=3.10,<3.13"]

[source]
root_patterns = [
    "/src/python",
]

[test]
output = "all"
use_coverage = true`;
}
