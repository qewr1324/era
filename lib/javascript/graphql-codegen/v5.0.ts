export function generate(params: any): string {
	return `schema: 'http://localhost:4000/graphql'
documents: './src/**/*.graphql'
generates:
  ./src/generated/graphql.ts:
    plugins:
      - typescript
      - typescript-operations
      - typescript-react-apollo
    config:
      withHooks: true
      withComponent: false
      withHOC: false
      withRefetchFn: true
      skipTypename: false
      dedupeOperationSuffix: true
      scalars:
        DateTime: string
        JSON: Record<string, unknown>
  ./src/generated/schema.json:
    plugins:
      - introspection`;
}
