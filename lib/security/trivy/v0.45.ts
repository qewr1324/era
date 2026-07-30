export function generate(params: any): string {
	return `scan:
  scanners:
    - vuln
    - secret
    - misconfig
  skip-dirs:
    - node_modules/
    - vendor/
    - .terraform/
    
severity:
  - HIGH
  - CRITICAL

vulnerability:
  type:
    - os
    - library
  ignore-unfixed: true

secret:
  config:
    rules:
      aws-access-key-id: enable
      aws-secret-access-key: enable
      private-key: enable

misconfiguration:
  scanners:
    - terraform
    - dockerfile
    - kubernetes

output:
  format: json
  file: trivy-results.json`;
}
