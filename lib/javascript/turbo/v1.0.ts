export function generate(params: any): string {
	return JSON.stringify(
		{
			$schema: "https://turbo.build/schema.json",
			globalDependencies: ["**/.env.*local"],
			pipeline: {
				build: {
					dependsOn: ["^build"],
					outputs: ["dist/**", ".next/**", "!.next/cache/**"],
				},
				lint: {
					dependsOn: ["^lint"],
				},
				test: {
					dependsOn: ["build"],
					inputs: ["src/**/*.tsx", "src/**/*.ts", "test/**/*.ts"],
					outputs: ["coverage/**"],
				},
				dev: {
					cache: false,
					persistent: true,
				},
			},
		},
		null,
		2,
	);
}
