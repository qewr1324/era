export function generate(params: any): string {
	return `source 'https://rubygems.org'

ruby '3.2'

gem 'rails', '~> 7.1'
gem 'pg', '~> 1.5'
gem 'puma', '~> 6.4'
gem 'devise', '~> 4.9'
gem 'rack-cors', '~> 2.0'
gem 'jbuilder', '~> 2.11'
gem 'sidekiq', '~> 7.2'

group :development, :test do
  gem 'rspec-rails', '~> 6.1'
  gem 'factory_bot_rails', '~> 6.4'
  gem 'faker', '~> 3.2'
  gem 'pry-rails', '~> 0.3'
end

group :development do
  gem 'rubocop', '~> 1.59'
  gem 'rubocop-rails', '~> 2.23'
end

group :test do
  gem 'shoulda-matchers', '~> 6.1'
  gem 'database_cleaner-active_record', '~> 2.1'
end`;
}
