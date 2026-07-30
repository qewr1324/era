export function generate(params: any): string {
	return `model:
  name: resnet50
  pretrained: true
  num_classes: 1000

training:
  epochs: 100
  batch_size: 32
  learning_rate: 0.001
  optimizer: adam
  scheduler: cosine
  weight_decay: 0.0001
  early_stopping: 10

data:
  train_path: ./data/train
  val_path: ./data/val
  num_workers: 4
  augmentation: true
  normalize:
    mean: [0.485, 0.456, 0.406]
    std: [0.229, 0.224, 0.225]

logging:
  wandb: true
  checkpoint_dir: ./checkpoints
  save_every: 5`;
}
