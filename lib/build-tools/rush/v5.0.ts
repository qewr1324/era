export function generate(params: any): string {
	return JSON.stringify(
		{
			$schema: "https://developer.microsoft.com/json-schemas/rush/v5/rush.schema.json",
			rushVersion: "5.112.2",
			pnpmVersion: "8.12.0",
			projectFolderMinDepth: 1,
			projectFolderMaxDepth: 3,
			projects: [
				{
					packageName: "my-app",
					projectFolder: "apps/my-app",
					reviewCategory: "production",
				},
				{
					packageName: "shared-lib",
					projectFolder: "libs/shared-lib",
					reviewCategory: "libraries",
				},
			],
		},
		null,
		2,
	);
}
