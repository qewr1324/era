export function generate(params: any): string {
	return `version: 2.1

orbs:
  node: circleci/node@5.1.0
  docker: circleci/docker@2.2.0

jobs:
  test:
    executor: node/default
    steps:
      - checkout
      - node/install-packages:
          cache-path: ~/project/node_modules
      - run:
          name: Run linter
          command: npm run lint
      - run:
          name: Run tests
          command: npm test -- --coverage
      - store_artifacts:
          path: coverage
  
  build:
    executor: docker/machine
    steps:
      - checkout
      - run:
          name: Build application
          command: npm run build
      - run:
          name: Build Docker image
          command: docker build -t my-app:$CIRCLE_SHA1 .
      - run:
          name: Push Docker image
          command: |
            echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
            docker push my-app:$CIRCLE_SHA1

workflows:
  test-and-build:
    jobs:
      - test
      - build:
          requires:
            - test
          filters:
            branches:
              only: main`;
}
