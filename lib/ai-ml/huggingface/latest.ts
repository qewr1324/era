export function generate(params: any): string {
	return JSON.stringify(
		{
			model_type: "bert",
			architectures: ["BertForSequenceClassification"],
			attention_probs_dropout_prob: 0.1,
			hidden_act: "gelu",
			hidden_dropout_prob: 0.1,
			hidden_size: 768,
			initializer_range: 0.02,
			intermediate_size: 3072,
			max_position_embeddings: 512,
			num_attention_heads: 12,
			num_hidden_layers: 12,
			type_vocab_size: 2,
			vocab_size: 30522,
			num_labels: 2,
			id2label: {
				"0": "NEGATIVE",
				"1": "POSITIVE",
			},
			label2id: {
				NEGATIVE: 0,
				POSITIVE: 1,
			},
		},
		null,
		2,
	);
}
