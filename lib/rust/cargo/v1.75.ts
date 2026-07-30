export function generate(params: any): string {
	return `[package]
name = "my-project"
version = "1.0.0"
edition = "2021"
description = "A Rust project"
license = "MIT"

[dependencies]
tokio = { version = "1.35", features = ["full"] }
axum = "0.7"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
sqlx = { version = "0.7", features = ["runtime-tokio", "postgres"] }
dotenv = "0.15"
tracing = "0.1"
tracing-subscriber = "0.3"
uuid = { version = "1.6", features = ["v4"] }
chrono = { version = "0.4", features = ["serde"] }

[dev-dependencies]
tokio-test = "0.4"
mockall = "0.12"`;
}
