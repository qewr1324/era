export function generate(params: any): string {
	return `image: node:20-alpine

stages:
  - test
  - build
  - deploy

variables:
  DOCKER_HOST: tcp://docker:2375
  DOCKER_DRIVER: overlay2

cache:
  paths:
    - node_modules/

before_script:
  - npm ci

test:
  stage: test
  script:
    - npm run lint
    - npm test -- --coverage
  coverage: /All files[^|]*\|[^|]*\s+([\d\.]+)/
  artifacts:
    paths:
      - coverage/
    expire_in: 30 days

build:
  stage: build
  only:
    - main
  script:
    - npm run build
    - docker build -t registry.example.com/my-app:$CI_COMMIT_SHA .
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker push registry.example.com/my-app:$CI_COMMIT_SHA

deploy:
  stage: deploy
  only:
    - main
  script:
    - |
      ssh $DEPLOY_USER@$DEPLOY_HOST "
        docker pull registry.example.com/my-app:$CI_COMMIT_SHA
        docker stop my-app || true
        docker rm my-app || true
        docker run -d --name my-app -p 80:3000 registry.example.com/my-app:$CI_COMMIT_SHA
      "`;
}
