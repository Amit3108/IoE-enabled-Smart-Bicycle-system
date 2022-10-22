#define BLYNK_PRINT Serial
#define BLYNK_TEMPLATE_ID "TMPLlrPPaq9a"
#define BLYNK_DEVICE_NAME "Quickstart Template"


#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>
#include <FirebaseArduino.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

#define FIREBASE_HOST "smart-bicycle-ioe-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "3T87fLF0XBEJbPLw4shL2aS9UfpGG2w2QSUj7jK0"
//
StaticJsonBuffer<256> jsonBuffer;
JsonArray& acc_detail = jsonBuffer.createArray();
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");
// defines pins numbers
const int trigPin = D1;
const int echoPin = D2;
const int buzzer = D3;
const int ledPin = D6;
// You should get Auth Token in the Blynk App.
// Go to the Project Settings (nut icon).
char auth[] = "JuUcP6YwnEd3vIvbGwWscWitGNZWcNOg";

// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "Redmi Note 7S";//your wifi name
char pass[] = "paru2001"; //your wifi password

//Declaring location
String acc_location = "Panvel";

WidgetLCD lcd(V1);
BlynkTimer timer;
// defines variables
long duration;
int distance;
int safetyDistance;

//
int vs = D0; // vibration sensor
int sdata = 0; // sensor data will be stored in this variable.
//


void setup() {
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input
  pinMode(buzzer, OUTPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600); // Starts the serial communication
  Blynk.begin(auth, ssid, pass);
  timer.setInterval(1000L, sendSensor);
  // connect to wifi.
  WiFi.begin(ssid, pass);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  // Initialize a NTPClient to get time
  timeClient.begin();
  // Set offset time in seconds to adjust for your timezone
  timeClient.setTimeOffset(19800);
}

void loop() {
  Blynk.run();
  timer.run();
  timeClient.update();
}
void sendSensor() {
  lcd.clear();
  lcd.print(0, 0, "");
  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);

  // Calculating the distance
  distance = duration * 0.034 / 2;
  //sdsdsd
  long measurement = vibration();
  //delay(50);
  Serial.println(measurement);
  //
  safetyDistance = distance;
  if (safetyDistance <= 5 & measurement > 1000) {
    //digitalWrite(buzzer, HIGH);
    tone(buzzer, 500, 45);
    digitalWrite(ledPin, HIGH);
    lcd.print(0, 0, "very close");
    Serial.println("Accident Detected at:" + acc_location);
    Blynk.logEvent("accident_alert", "Accident detected at " + acc_location );
    //get time and date
    time_t epochTime = timeClient.getEpochTime();
    String formattedTime = timeClient.getFormattedTime();
    //Get a time structure
    struct tm *ptm = gmtime ((time_t *)&epochTime); 
    int monthDay = ptm->tm_mday;
    int currentMonth = ptm->tm_mon+1;
    int currentYear = ptm->tm_year+1900;
    String currentDate = String(currentYear) + "-" + String(currentMonth) + "-" + String(monthDay);
    
    //Firebase.pushString("acc_location", acc_location);
    acc_detail.add(acc_location);
    acc_detail.add(formattedTime);
    acc_detail.add(currentDate);
    Firebase.push("acc_data", acc_detail);
    // handle error
    if (Firebase.failed()) {
      Serial.print("setting /message failed:");
      Serial.println(Firebase.error());
      return;
    }
  }
  else if (safetyDistance <= 9) {
    //digitalWrite(buzzer, HIGH);
    tone(buzzer, 600, 200);
    digitalWrite(ledPin, HIGH);
    lcd.print(0, 0, "close");
  }
  else if (safetyDistance <= 12) {
    //digitalWrite(buzzer, LOW);
    tone(buzzer, 1000, 200);
    digitalWrite(ledPin, LOW);
    lcd.print(0, 0, "getting closer");
  }
  else {
    //  digitalWrite(buzzer, LOW);
    tone(buzzer, 0, 0);
    digitalWrite(ledPin, LOW);
    lcd.print(0, 0, "safe");
  }

  // Prints the distance on the Serial Monitor
  Serial.print("Distance: ");
  Serial.println(distance);
  Blynk.virtualWrite(V2, distance);

  delay(1000);
}

long vibration() {
  long measurement = pulseIn (vs, HIGH); //wait for the pin to get HIGH and returns measurement
  return measurement;
}
