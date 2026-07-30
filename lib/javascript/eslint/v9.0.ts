export function generate(params: any): string {
	return JSON.stringify(
		{
			env: {
				browser: true,
				es2022: true,
				node: true,
			},
			extends: ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended", "prettier"],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				ecmaFeatures: {
					jsx: true,
				},
			},
			plugins: ["react", "@typescript-eslint", "react-hooks"],
			rules: {
				"react/react-in-jsx-scope": "off",
				"react-hooks/rules-of-hooks": "error",
				"react-hooks/exhaustive-deps": "warn",
				"no-unused-vars": "warn",
				"no-console": "warn",
				"@typescript-eslint/no-explicit-any": "warn",
			},
			settings: {
				react: {
					version: "detect",
				},
			},
		},
		null,
		2,
	);
}
