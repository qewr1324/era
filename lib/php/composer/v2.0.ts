export function generate(params: any): string {
	return JSON.stringify(
		{
			name: "myvendor/myproject",
			description: "A PHP project",
			type: "project",
			license: "MIT",
			autoload: {
				"psr-4": {
					"App\\": "src/",
				},
			},
			require: {
				php: "^8.0",
				"laravel/framework": "^8.0",
			},
			"require-dev": {
				"phpunit/phpunit": "^9.5",
			},
		},
		null,
		2,
	);
}
