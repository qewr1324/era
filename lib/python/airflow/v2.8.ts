export function generate(params: any): string {
	return `[core]
dags_folder = /opt/airflow/dags
executor = CeleryExecutor
sql_alchemy_conn = postgresql+psycopg2://airflow:airflow@postgres/airflow
parallelism = 32
dag_concurrency = 16
max_active_runs_per_dag = 16

[celery]
broker_url = redis://redis:6379/0
result_backend = db+postgresql://airflow:airflow@postgres/airflow

[scheduler]
min_file_process_interval = 30
dag_dir_list_interval = 60

[webserver]
web_server_port = 8080
web_server_host = 0.0.0.0

[logging]
base_log_folder = /opt/airflow/logs
remote_logging = False

[metrics]
statsd_on = True
statsd_host = localhost
statsd_port = 8125`;
}
