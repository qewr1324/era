export function generate(params: any): string {
	return JSON.stringify(
		{
			model: {
				name: "my_model",
				type: "sequential",
				layers: [
					{
						type: "Conv2D",
						filters: 32,
						kernel_size: [3, 3],
						activation: "relu",
						input_shape: [224, 224, 3],
					},
					{
						type: "MaxPooling2D",
						pool_size: [2, 2],
					},
					{
						type: "Flatten",
					},
					{
						type: "Dense",
						units: 128,
						activation: "relu",
					},
					{
						type: "Dense",
						units: 10,
						activation: "softmax",
					},
				],
			},
			training: {
				optimizer: {
					type: "adam",
					learning_rate: 0.001,
				},
				loss: "categorical_crossentropy",
				metrics: ["accuracy"],
				batch_size: 32,
				epochs: 100,
			},
			data: {
				train_path: "./data/train",
				validation_split: 0.2,
				shuffle: true,
				augmentation: {
					rotation_range: 20,
					width_shift_range: 0.2,
					height_shift_range: 0.2,
					horizontal_flip: true,
				},
			},
		},
		null,
		2,
	);
}
