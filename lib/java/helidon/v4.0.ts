export function generate(params: any): string {
	return `server.port=8080
server.host=0.0.0.0

app.greeting=Hello from Helidon

security.providers.0=helidon
security.providers.1=http-signatures

db.source=jdbc
db.source.jdbc.url=jdbc:postgresql://localhost:5432/mydb
db.source.jdbc.user=postgres
db.source.jdbc.password=password

health.enabled=true
metrics.enabled=true
tracing.enabled=true`;
}
