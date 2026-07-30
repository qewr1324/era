export function generate(params: any): string {
	return `.PHONY: all build test clean run install

APP_NAME = myapp
BUILD_DIR = build
SRC_DIR = src

CC = gcc
CFLAGS = -Wall -Wextra -O2 -std=c11

all: build

build: $(BUILD_DIR)/$(APP_NAME)

$(BUILD_DIR)/$(APP_NAME): $(SRC_DIR)/main.c
	@mkdir -p $(BUILD_DIR)
	$(CC) $(CFLAGS) $< -o $@

test:
	./run_tests.sh

run: build
	./$(BUILD_DIR)/$(APP_NAME)

install: build
	install -m 755 $(BUILD_DIR)/$(APP_NAME) /usr/local/bin/$(APP_NAME)

clean:
	rm -rf $(BUILD_DIR)
	rm -f *.o`;
}
