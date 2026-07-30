export function generate(params: any): string {
	return `language: node_js
node_js:
  - "20"

cache:
  directories:
    - node_modules

services:
  - docker

before_install:
  - npm ci

script:
  - npm run lint
  - npm test -- --coverage
  - npm run build

after_success:
  - bash <(curl -s https://codecov.io/bash)

deploy:
  - provider: script
    script: |
      docker build -t my-app:$TRAVIS_COMMIT .
      echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
      docker push my-app:$TRAVIS_COMMIT
    on:
      branch: main

notifications:
  email:
    on_success: never
    on_failure: always`;
}
