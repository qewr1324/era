export function generate(params: any): string {
	return `filebeat.inputs:
- type: log
  enabled: true
  paths:
    - /var/log/app/*.log
    - /var/log/nginx/access.log
    - /var/log/nginx/error.log
  
  fields:
    app: my-application
    env: production
  
  fields_under_root: true
  
  multiline:
    pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}'
    negate: true
    match: after

- type: container
  paths:
    - '/var/lib/docker/containers/*/*.log'
  
  processors:
    - add_docker_metadata:
        host: "unix:///var/run/docker.sock"

processors:
  - drop_fields:
      fields: ["agent.ephemeral_id", "agent.id", "input.type"]
  
  - add_cloud_metadata:
      provider: aws

output.logstash:
  hosts: ["logstash:5044"]
  loadbalance: true
  
output.elasticsearch:
  hosts: ["https://elasticsearch:9200"]
  username: "elastic"
  password: "changeme"
  ssl.verification_mode: none
  
  indices:
    - index: "filebeat-%{[agent.version]}-%{+yyyy.MM.dd}"
  
logging.level: info
logging.to_files: true
logging.files:
  path: /var/log/filebeat
  name: filebeat
  keepfiles: 7
  permissions: 0644`;
}
