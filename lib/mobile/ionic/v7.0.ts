export function generate(params: any): string {
	return JSON.stringify(
		{
			name: "My Ionic App",
			integrations: {
				capacitor: {},
			},
			type: "angular",
			id: "com.example.myapp",
		},
		null,
		2,
	);
}
