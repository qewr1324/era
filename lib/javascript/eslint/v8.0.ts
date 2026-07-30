export function generate(params: any): string {
	return JSON.stringify(
		{
			env: {
				browser: true,
				es2021: true,
				node: true,
			},
			extends: ["eslint:recommended", "plugin:react/recommended"],
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				ecmaFeatures: {
					jsx: true,
				},
			},
			plugins: ["react"],
			rules: {
				"react/react-in-jsx-scope": "off",
				"no-unused-vars": "warn",
				"no-console": "warn",
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
