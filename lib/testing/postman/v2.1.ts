export function generate(params: any): string {
	return JSON.stringify(
		{
			info: {
				name: "My API",
				description: "API Collection",
				schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
			},
			item: [
				{
					name: "Users",
					item: [
						{
							name: "Get All Users",
							request: {
								method: "GET",
								url: "{{baseUrl}}/api/users",
								header: [
									{
										key: "Authorization",
										value: "Bearer {{token}}",
									},
								],
							},
						},
						{
							name: "Create User",
							request: {
								method: "POST",
								url: "{{baseUrl}}/api/users",
								header: [
									{
										key: "Content-Type",
										value: "application/json",
									},
								],
								body: {
									mode: "raw",
									raw: '{\n  "username": "john",\n  "email": "john@example.com",\n  "password": "password123"\n}',
								},
							},
						},
					],
				},
			],
			variable: [
				{
					key: "baseUrl",
					value: "http://localhost:3000",
				},
				{
					key: "token",
					value: "",
				},
			],
		},
		null,
		2,
	);
}
