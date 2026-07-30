export function generate(params: any): string {
	return JSON.stringify(
		{
			verticles: {
				"com.example.MainVerticle": {
					instances: 4,
					worker: false,
				},
				"com.example.WorkerVerticle": {
					instances: 2,
					worker: true,
					workerPoolSize: 10,
				},
			},
			http: {
				port: 8080,
				host: "0.0.0.0",
			},
			cors: {
				allowedOriginPattern: "*",
				allowedMethods: "GET,POST,PUT,DELETE",
			},
			database: {
				url: "jdbc:postgresql://localhost:5432/mydb",
				user: "postgres",
				password: "password",
				maxPoolSize: 10,
			},
		},
		null,
		2,
	);
}
