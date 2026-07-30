export function generate(params: any): string {
	return JSON.stringify(
		{
			Logging: {
				LogLevel: {
					Default: "Information",
					"Microsoft.AspNetCore": "Warning",
				},
			},
			AllowedHosts: "*",
			ConnectionStrings: {
				DefaultConnection: "Server=localhost;Database=MyDb;User Id=sa;Password=YourPassword;TrustServerCertificate=true;",
			},
			Jwt: {
				Secret: "your-super-secret-key-with-minimum-32-characters",
				Issuer: "MyApplication",
				Audience: "MyApplication",
				ExpirationInMinutes: 60,
			},
			Serilog: {
				MinimumLevel: "Information",
				WriteTo: [{ Name: "Console" }, { Name: "File", Args: { path: "logs/log-.txt", rollingInterval: "Day" } }],
			},
		},
		null,
		2,
	);
}
