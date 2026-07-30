export function generate(params: any): string {
	return `--require spec_helper
--format documentation
--color
--order random`;
}
