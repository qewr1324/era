export function generate(params: any): string {
	return `input {
  beats {
    port => 5044
    host => "0.0.0.0"
  }
  
  tcp {
    port => 5000
    codec => json_lines
    type => "app-logs"
  }
  
  file {
    path => "/var/log/app/*.log"
    start_position => "beginning"
    sincedb_path => "/dev/null"
  }
}

filter {
  if [type] == "app-logs" {
    grok {
      match => { 
        "message" => "%{TIMESTAMP_ISO8601:timestamp} %{LOGLEVEL:level} %{DATA:service} %{GREEDYDATA:message}" 
      }
    }
    
    date {
      match => ["timestamp", "ISO8601"]
      target => "@timestamp"
    }
    
    mutate {
      remove_field => ["timestamp"]
      add_field => {
        "environment" => "production"
      }
    }
    
    if [level] == "ERROR" {
      mutate {
        add_tag => ["error", "alert"]
      }
    }
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "app-logs-%{+YYYY.MM.dd}"
    user => "elastic"
    password => "changeme"
  }
  
  stdout { 
    codec => rubydebug 
  }
}`;
}
