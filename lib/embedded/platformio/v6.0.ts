export function generate(params: any): string {
	return `[env:esp32dev]
platform = espressif32
board = esp32dev
framework = arduino
monitor_speed = 115200
upload_speed = 921600
board_build.partitions = default.csv

lib_deps =
    adafruit/Adafruit NeoPixel @ ^1.11.0
    bblanchon/ArduinoJson @ ^6.21.3

[env:nodemcuv2]
platform = espressif8266
board = nodemcuv2
framework = arduino
monitor_speed = 115200

[env:uno]
platform = atmelavr
board = uno
framework = arduino`;
}
