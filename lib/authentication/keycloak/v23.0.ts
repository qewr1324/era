export function generate(params: any): string {
	return JSON.stringify(
		{
			id: "my-realm",
			realm: "my-realm",
			enabled: true,
			sslRequired: "external",
			registrationAllowed: true,
			loginWithEmailAllowed: true,
			duplicateEmailsAllowed: false,
			resetPasswordAllowed: true,
			editUsernameAllowed: false,
			bruteForceProtected: true,
			clients: [
				{
					clientId: "my-app",
					enabled: true,
					publicClient: false,
					redirectUris: ["http://localhost:3000/*"],
					webOrigins: ["http://localhost:3000"],
					protocol: "openid-connect",
				},
			],
			users: [
				{
					username: "admin",
					enabled: true,
					credentials: [
						{
							type: "password",
							value: "admin",
						},
					],
				},
			],
		},
		null,
		2,
	);
}
