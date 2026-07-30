export function generate(params: any): string {
	return JSON.stringify(
		{
			dashboard: {
				id: null,
				uid: "my-app-dashboard",
				title: "My Application Dashboard",
				tags: ["app", "production"],
				timezone: "browser",
				schemaVersion: 38,
				version: 0,
				refresh: "30s",
				panels: [
					{
						id: 1,
						title: "Request Rate",
						type: "graph",
						gridPos: { x: 0, y: 0, w: 12, h: 8 },
						targets: [
							{
								expr: "rate(http_requests_total[5m])",
								legendFormat: "{{method}} {{endpoint}}",
							},
						],
						yaxes: [{ format: "reqps", label: "Requests/s" }],
					},
					{
						id: 2,
						title: "Error Rate",
						type: "graph",
						gridPos: { x: 12, y: 0, w: 12, h: 8 },
						targets: [
							{
								expr: "rate(http_errors_total[5m])",
								legendFormat: "{{status_code}}",
							},
						],
					},
					{
						id: 3,
						title: "Response Time",
						type: "graph",
						gridPos: { x: 0, y: 8, w: 12, h: 8 },
						targets: [
							{
								expr: "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))",
								legendFormat: "p95",
							},
						],
						yaxes: [{ format: "s", label: "Seconds" }],
					},
					{
						id: 4,
						title: "CPU Usage",
						type: "gauge",
						gridPos: { x: 12, y: 8, w: 6, h: 4 },
						targets: [
							{
								expr: "rate(process_cpu_seconds_total[1m]) * 100",
							},
						],
					},
					{
						id: 5,
						title: "Memory Usage",
						type: "gauge",
						gridPos: { x: 18, y: 8, w: 6, h: 4 },
						targets: [
							{
								expr: "process_resident_memory_bytes / 1024 / 1024",
							},
						],
						yaxes: [{ format: "decbytes", label: "MB" }],
					},
				],
			},
			overwrite: false,
		},
		null,
		2,
	);
}
