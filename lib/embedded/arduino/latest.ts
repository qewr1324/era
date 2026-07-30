export function generate(params: any): string {
	return `void setup() {
  Serial.begin(9600);
  
  pinMode(LED_BUILTIN, OUTPUT);
  
  Serial.println("Arduino initialized!");
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
  
  Serial.println("Heartbeat");
}`;
}
