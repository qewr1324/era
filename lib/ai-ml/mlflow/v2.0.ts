export function generate(params: any): string {
	return `tracking_uri: http://localhost:5000
experiment_name: my-experiment
artifact_location: ./mlruns

registry_uri: http://localhost:5000

log_input_examples: true
log_model_signatures: true

store_artifacts_in_s3: false

s3_endpoint_url: http://localhost:9000
s3_bucket: mlflow`;
}
