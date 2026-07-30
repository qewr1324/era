export function generate(params: any): string {
	return `default: &default
  adapter: postgresql
  encoding: unicode
  pool: 5

development:
  <<: *default
  database: myapp_development
  username: postgres
  password: password

test:
  <<: *default
  database: myapp_test
  username: postgres
  password: password

production:
  <<: *default
  database: myapp_production`;
}
