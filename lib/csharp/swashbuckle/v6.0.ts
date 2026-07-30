export function generate(params: any): string {
	return JSON.stringify(
		{
			Swagger: {
				Title: "My API",
				Version: "v1",
				Description: "ASP.NET Core Web API",
				Contact: {
					Name: "Developer",
					Email: "dev@example.com",
				},
				License: {
					Name: "MIT",
					Url: "https://opensource.org/licenses/MIT",
				},
			},
			Security: {
				Bearer: {
					Type: "http",
					Scheme: "bearer",
					BearerFormat: "JWT",
				},
			},
		},
		null,
		2,
	);
}
