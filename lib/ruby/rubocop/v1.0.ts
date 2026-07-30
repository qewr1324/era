export function generate(params: any): string {
	return `AllCops:
  NewCops: enable
  TargetRubyVersion: 3.2
  Exclude:
    - 'db/**/*'
    - 'config/**/*'
    - 'bin/**/*'
    - 'vendor/**/*'
    - 'node_modules/**/*'

Style/Documentation:
  Enabled: false

Style/FrozenStringLiteralComment:
  Enabled: false

Metrics/MethodLength:
  Max: 20

Metrics/AbcSize:
  Max: 20

Metrics/BlockLength:
  Max: 30
  Exclude:
    - 'spec/**/*'

Layout/LineLength:
  Max: 120

Style/StringLiterals:
  EnforcedStyle: single_quotes`;
}
