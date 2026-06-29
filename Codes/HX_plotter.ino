
#include "HX711.h"

HX711 scale;


uint8_t dataPin = 25;
uint8_t clockPin = 26;

void setup()
{
  Serial.begin(115200);
  scale.begin(dataPin, clockPin);
  scale.set_scale(2804);
  scale.tare();
}


void loop()
{
  long weight = scale.get_units();
  weight = -weight;
  Serial.print("Weight:");
  Serial.println(weight);
  delay(1000);

}