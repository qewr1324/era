export function generate(params: any): string {
	return JSON.stringify(
		{
			$schema: "https://xunit.net/schema/current/xunit.runner.schema.json",
			parallelizeAssembly: true,
			parallelizeTestCollections: true,
			maxParallelThreads: 4,
			preEnumerateTheories: true,
			diagnosticMessages: false,
			methodDisplay: "classAndMethod",
			shadowCopy: false,
		},
		null,
		2,
	);
}
