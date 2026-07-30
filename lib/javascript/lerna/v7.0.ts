export function generate(params: any): string {
	return JSON.stringify(
		{
			$schema: "node_modules/lerna/schemas/lerna-schema.json",
			version: "independent",
			npmClient: "npm",
			command: {
				publish: {
					conventionalCommits: true,
					message: "chore(release): publish",
					registry: "https://npm.pkg.github.com",
				},
			},
		},
		null,
		2,
	);
}
