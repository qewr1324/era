export function generate(params: any): string {
	return JSON.stringify(
		{
			type: "postgres",
			host: "localhost",
			port: 5432,
			username: "postgres",
			password: "password",
			database: "mydb",
			synchronize: false,
			logging: true,
			entities: ["src/entities/**/*.ts"],
			migrations: ["src/migrations/**/*.ts"],
			subscribers: ["src/subscribers/**/*.ts"],
			cli: {
				entitiesDir: "src/entities",
				migrationsDir: "src/migrations",
				subscribersDir: "src/subscribers",
			},
			extra: {
				max: 20,
				idleTimeoutMillis: 30000,
			},
		},
		null,
		2,
	);
}
