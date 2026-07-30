export function generate(params: any): string {
	return `apiVersion: v1
kind: Namespace
metadata:
  name: my-application
  labels:
    name: my-application
    environment: production
  annotations:
    description: "Namespace for My Application"`;
}
