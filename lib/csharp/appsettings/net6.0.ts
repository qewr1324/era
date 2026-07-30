export function generate(params: any): string {
	return JSON.stringify(
		{
			Logging: {
				LogLevel: {
					Default: "Information",
					Microsoft: "Warning",
				},
			},
			AllowedHosts: "*",
			ConnectionStrings: {
				DefaultConnection: "Server=localhost;Database=MyDb;User Id=sa;Password=YourPassword;",
			},
		},
		null,
		2,
	);
}
