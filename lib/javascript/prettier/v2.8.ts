export function generate(params: any): string {
	return JSON.stringify(
		{
			semi: true,
			trailingComma: "es5",
			singleQuote: true,
			printWidth: 80,
			tabWidth: 2,
			useTabs: false,
		},
		null,
		2,
	);
}
