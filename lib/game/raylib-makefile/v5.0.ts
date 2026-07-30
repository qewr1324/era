export function generate(params: any): string {
	return `CC = gcc
CFLAGS = -Wall -Wextra -O2
LDFLAGS = -lraylib -lGL -lm -lpthread -ldl -lrt -lX11

TARGET = game
SOURCES = main.c player.c enemy.c

ifeq ($(PLATFORM),PLATFORM_WEB)
    CC = emcc
    CFLAGS = -Os -Wall
    LDFLAGS = -s USE_GLFW=3 -s ASYNCIFY --shell-file shell.html
    TARGET = game.html
endif

all: $(TARGET)

$(TARGET): $(SOURCES)
	$(CC) $(CFLAGS) $(SOURCES) -o $(TARGET) $(LDFLAGS)

clean:
	rm -f $(TARGET)

run: $(TARGET)
	./$(TARGET)

.PHONY: all clean run`;
}
