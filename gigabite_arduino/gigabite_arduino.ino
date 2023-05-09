int buttonPin = 2;
int buttonState = 0;
int ledPin1 = 12;


void setup() {
  Serial.begin(9600);
  pinMode(buttonPin, INPUT);
  pinMode(ledPin1, OUTPUT);
}

void loop() {

  buttonState = digitalRead(buttonPin);
  if(buttonState == HIGH) {
    Serial.println("on");
  } else {
    Serial.println("off");
  }
  
  
  while (Serial.available() > 0) {
  if(Serial.parseInt() == 1) {
    digitalWrite(ledPin1, HIGH);
  } else {
    digitalWrite(ledPin1, LOW);
    }
  }
  
}
