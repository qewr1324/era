export function generate(params: any): string {
	return `api_key: your-datadog-api-key

site: datadoghq.com

hostname: my-app-host

tags:
  - env:production
  - app:my-app
  - team:backend

logs_enabled: true

logs_config:
  container_collect_all: true
  processing_rules:
    - type: mask_sequences
      name: mask_sensitive_data
      pattern: '(password|secret|token|key)=[^&]+'
      replace_placeholder: '[REDACTED]'

apm_config:
  enabled: true
  apm_non_local_traffic: true
  env: production
  analyzed_spans:
    my-app|http.request:
      service_name: my-app
      operation_name: http.request

process_config:
  enabled: true
  blacklist_patterns:
    - 'chrome$'
    - 'firefox$'

network_config:
  enabled: true

dogstatsd:
  non_local_traffic: true
  statsd_metrics_stats_enable: true`;
}
