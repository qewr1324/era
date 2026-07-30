export function generate(params: any): string {
	return JSON.stringify(
		{
			source: {
				include: ["src"],
				exclude: ["src/generated", "node_modules"],
				includePattern: ".+\\.js(doc|x)?$",
				excludePattern: "(^|\\/|\\\\)_",
			},
			plugins: ["plugins/markdown"],
			templates: {
				cleverLinks: true,
				monospaceLinks: true,
				default: {
					outputSourceFiles: true,
				},
			},
			opts: {
				destination: "./docs",
				recurse: true,
				readme: "./README.md",
			},
		},
		null,
		2,
	);
}
