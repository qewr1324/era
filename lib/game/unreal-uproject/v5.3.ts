export function generate(params: any): string {
	return JSON.stringify(
		{
			FileVersion: 3,
			EngineAssociation: "5.3",
			Category: "Games",
			Description: "My Unreal Game",
			Modules: [
				{
					Name: "MyGame",
					Type: "Runtime",
					LoadingPhase: "Default",
				},
			],
			Plugins: [
				{
					Name: "EnhancedInput",
					Enabled: true,
				},
				{
					Name: "Niagara",
					Enabled: true,
				},
			],
		},
		null,
		2,
	);
}
