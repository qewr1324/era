export function generate(params: any): string {
	return `# Sentry Configuration
dsn=https://your-sentry-dsn@sentry.io/project-id

# Environment
environment=production

# Release
release=my-app@1.0.0

# Sample rate for performance monitoring (0.0 to 1.0)
traces_sample_rate=0.3

# Sample rate for profiling (0.0 to 1.0)
profiles_sample_rate=0.1

# Enable debug mode (not recommended for production)
debug=false

# Maximum breadcrumbs to capture
max_breadcrumbs=100

# Attach stack traces
attach_stacktrace=true

# Send default PII data
send_default_pii=false

# Request body capture policy
request_bodies=medium

# In-app frame prefixes
in_app_include=com.myapp`;
}
