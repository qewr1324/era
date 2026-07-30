export function generate(params: any): string {
	return `version: v1.22.1

exclude:
  global:
    - tests/**
    - docs/**
    - examples/**

ignore:
  SNYK-JS-LODASH-567746:
    - '*':
        reason: No fix available
        expires: '2024-12-31T00:00:00.000Z'
  SNYK-JS-AXIOS-6032459:
    - 'axios@>1.0.0':
        reason: Being tracked in issue #123
        expires: '2024-06-30T00:00:00.000Z'

severity-threshold: high

policy:
  ignore-policy:
    max-expiry-days: 90`;
}
