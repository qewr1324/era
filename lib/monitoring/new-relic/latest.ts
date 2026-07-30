export function generate(params: any): string {
	return `common:
  license_key: your-new-relic-license-key
  app_name: My Application
  log_level: info
  enable_auto_transaction_naming: true

  distributed_tracing:
    enabled: true

  transaction_tracer:
    enabled: true
    transaction_threshold: apdex_f
    record_sql: obfuscated
    stack_trace_threshold: 0.5
    explain_threshold: 0.5

  error_collector:
    enabled: true
    ignore_errors:
      - ActionController::RoutingError

  browser_monitoring:
    enabled: true
    auto_instrument: true

  application_logging:
    enabled: true
    forwarding:
      enabled: true
      max_samples_stored: 10000`;
}
