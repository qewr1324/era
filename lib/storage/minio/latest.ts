export function generate(params: any): string {
	return JSON.stringify(
		{
			version: "1",
			address: ":9000",
			"console-address": ":9001",
			"root-user": "minioadmin",
			"root-password": "minioadmin",
			region: "us-east-1",
			buckets: [
				{
					name: "uploads",
					versioning: true,
					policy: "public",
				},
				{
					name: "backups",
					versioning: true,
					policy: "private",
				},
			],
		},
		null,
		2,
	);
}
