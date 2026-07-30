export function generate(params: any): string {
	return `project: my-project
entity: my-team

job_type: training
tags:
  - baseline
  - v1

notes: "Initial experiment with baseline model"

settings:
  _disable_stats: false
  _disable_meta: false
  _disable_service: false

sweep:
  method: bayes
  metric:
    name: validation_loss
    goal: minimize
  parameters:
    learning_rate:
      min: 0.0001
      max: 0.1
    batch_size:
      values: [16, 32, 64, 128]
    optimizer:
      values: ["adam", "sgd", "rmsprop"]`;
}
