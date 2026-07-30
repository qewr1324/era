export function generate(params: any): string {
	return `[submodule "lib/dependency1"]
	path = lib/dependency1
	url = https://github.com/user/dependency1.git
	branch = main

[submodule "lib/dependency2"]
	path = lib/dependency2
	url = https://github.com/user/dependency2.git
	branch = develop`;
}
