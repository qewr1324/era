export function generate(params: any): string {
	return JSON.stringify(
		{
			extends: ["stylelint-config-standard", "stylelint-config-tailwindcss"],
			plugins: ["stylelint-order", "stylelint-scss"],
			rules: {
				"order/properties-alphabetical-order": true,
				"at-rule-no-unknown": null,
				"scss/at-rule-no-unknown": true,
				"selector-class-pattern": "^[a-z][a-zA-Z0-9]+$",
				"max-nesting-depth": 4,
				"no-descending-specificity": null,
				"declaration-block-no-redundant-longhand-properties": true,
				"color-hex-length": "long",
			},
			ignoreFiles: ["**/node_modules/**", "dist/**"],
		},
		null,
		2,
	);
}
