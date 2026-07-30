export function generate(params: any): string {
	return JSON.stringify(
		{
			ir_version: 8,
			opset_import: [
				{
					domain: "",
					version: 17,
				},
			],
			producer_name: "pytorch",
			producer_version: "2.0",
			graph: {
				name: "main_graph",
				inputs: [
					{
						name: "input",
						type: {
							tensor_type: {
								elem_type: 1,
								shape: {
									dim: [{ dim_value: 1 }, { dim_value: 3 }, { dim_value: 224 }, { dim_value: 224 }],
								},
							},
						},
					},
				],
				outputs: [
					{
						name: "output",
						type: {
							tensor_type: {
								elem_type: 1,
								shape: {
									dim: [{ dim_value: 1 }, { dim_value: 1000 }],
								},
							},
						},
					},
				],
			},
		},
		null,
		2,
	);
}
