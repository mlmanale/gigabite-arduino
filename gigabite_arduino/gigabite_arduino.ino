int buttonPin = 2;
int buttonState = 0;
#include <Mouse.h>

void setup() {
  pinMode(buttonPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  buttonState = digitalRead(buttonPin);
  if(buttonState == HIGH) {
    Serial.println("on");
  } else {
    Serial.println("off");
  }

  // while (Serial.available() > 0) {
  // if(Serial.parseInt() == 1) {
  //   digitalWrite(ledPin, HIGH);
  // } else {
  //   digitalWrite(ledPin, LOW);
  // }
}

