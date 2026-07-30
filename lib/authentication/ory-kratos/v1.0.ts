export function generate(params: any): string {
	return `serve:
  public:
    base_url: http://localhost:4433
  admin:
    base_url: http://kratos:4434

selfservice:
  default_browser_return_url: http://localhost:3000/
  allowed_return_urls:
    - http://localhost:3000

  methods:
    password:
      enabled: true
    oidc:
      enabled: true
      config:
        providers:
          - id: google
            provider: google
            client_id: your-client-id
            client_secret: your-client-secret
            mapper_url: file:///etc/config/kratos/oidc.google.jsonnet

identity:
  default_schema_id: default
  schemas:
    - id: default
      url: file:///etc/config/kratos/identity.schema.json

courier:
  smtp:
    connection_uri: smtp://smtp.example.com:587/
    from_address: no-reply@example.com`;
}
