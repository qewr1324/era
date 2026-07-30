export function generate(params: any): string {
	return JSON.stringify(
		{
			semi: true,
			trailingComma: "all",
			singleQuote: true,
			printWidth: 100,
			tabWidth: 2,
			useTabs: false,
			bracketSpacing: true,
			arrowParens: "always",
			endOfLine: "lf",
			bracketSameLine: false,
			singleAttributePerLine: true,
		},
		null,
		2,
	);
}
