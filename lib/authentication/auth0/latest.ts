export function generate(params: any): string {
	return JSON.stringify(
		{
			domain: "your-tenant.auth0.com",
			clientId: "your-client-id",
			clientSecret: "your-client-secret",
			audience: "https://api.example.com",
			issuer: "https://your-tenant.auth0.com/",
			algorithms: ["RS256"],
			jwt: {
				expiresIn: "1h",
			},
			connections: ["Username-Password-Authentication", "google-oauth2"],
			rules: ["add-roles-to-tokens"],
		},
		null,
		2,
	);
}
