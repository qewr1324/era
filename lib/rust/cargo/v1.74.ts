export function generate(params: any): string {
	return `[package]
name = "my-project"
version = "1.0.0"
edition = "2021"

[dependencies]
tokio = { version = "1.34", features = ["full"] }
axum = "0.7"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
sqlx = { version = "0.7", features = ["runtime-tokio", "postgres"] }`;
}
