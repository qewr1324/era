export function generate(params: any): string {
	return JSON.stringify(
		{
			$schema: "https://raw.githubusercontent.com/microsoft/vcpkg-tool/main/docs/vcpkg.schema.json",
			name: "my-project",
			version: "1.0.0",
			dependencies: [
				"fmt",
				"spdlog",
				{
					name: "nlohmann-json",
					"version>=": "3.11.2",
				},
				{
					name: "openssl",
					features: ["tools"],
				},
			],
			"builtin-baseline": "a42af01b72c28a8e1d7b48107b33e4f286a55ef6",
			overrides: [
				{
					name: "fmt",
					version: "10.1.1",
				},
			],
		},
		null,
		2,
	);
}
