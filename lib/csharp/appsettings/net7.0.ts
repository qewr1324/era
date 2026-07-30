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
				DefaultConnection: "Server=localhost;Database=MyDb;User Id=sa;Password=YourPassword;",
			},
			Jwt: {
				Secret: "your-super-secret-key",
				Issuer: "MyApplication",
				Audience: "MyApplication",
				ExpirationInMinutes: 60,
			},
		},
		null,
		2,
	);
}
