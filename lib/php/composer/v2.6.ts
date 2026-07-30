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
			"autoload-dev": {
				"psr-4": {
					"Tests\\": "tests/",
				},
			},
			require: {
				php: "^8.2",
				"laravel/framework": "^10.0",
				"guzzlehttp/guzzle": "^7.8",
			},
			"require-dev": {
				"phpunit/phpunit": "^10.5",
				"laravel/pint": "^1.13",
				"laravel/sail": "^1.26",
				"mockery/mockery": "^1.6",
				"fakerphp/faker": "^1.23",
			},
			scripts: {
				test: "phpunit",
				lint: "pint",
				analyse: "phpstan analyse",
			},
			config: {
				"optimize-autoloader": true,
				"preferred-install": "dist",
				"sort-packages": true,
			},
			"minimum-stability": "stable",
			preferStable: true,
		},
		null,
		2,
	);
}
