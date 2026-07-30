export function generate(params: any): string {
	return `source 'https://rubygems.org'

ruby '3.0'

gem 'rails', '~> 7.0'
gem 'pg', '~> 1.4'
gem 'puma', '~> 6.0'

group :development, :test do
  gem 'rspec-rails', '~> 6.0'
end`;
}
