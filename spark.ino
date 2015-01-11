////////////////////////////////////////////////////////////////////////////////////////////////////////
// Flare spark demo - https://github.com/baird/flare
////////////////////////////////////////////////////////////////////////////////////////////////////////

// color value storage

int rval = 0;
int gval = 0;
int bval = 0;

// color into string storage

char colorStr[64];
char color[64];

// score into string storage

char scoreStr[64];
int score = 0;

// individual color increments

int r = 0;
int g = 0;
int b = 0;

// timekeeping

unsigned long prevMillis = 0;
unsigned long currentMillis = 0;

// score level ints

const int levelSeven = 150;    // purple
const int levelSix = 125;    // blue
const int levelFive = 100;    // aqua
const int levelFour = 75;    // green
const int levelThree = 50;    // yellow
const int levelTwo = 25;    // orange
const int levelOne = 0;    // red (zero so it starts off red instead of dark)

////////////////////////////////////////////////////////////////////////////////////////////////////////
// Setup
////////////////////////////////////////////////////////////////////////////////////////////////////////

void setup() {

	Serial.begin(9600);

	pinMode(A6, OUTPUT);
	pinMode(A5, OUTPUT);
	pinMode(A4, OUTPUT);

  // set exposed spark variables

  Spark.variable("rval", &rval, INT);
  Spark.variable("gval", &gval, INT);
  Spark.variable("bval", &bval, INT);
  Spark.variable("score", &score, INT);

  // delays for 20 seconds to give system led time to show connected wifi status (breathing cyan)

  delay(20000);

  // take control of system RGB

  RGB.control(true);

  // set system LED to zero

  RGB.color(rval, gval, bval);
}

void loop() {
 
////////////////////////////////////////////////////////////////////////////////////////////////////////
// add to score to test
////////////////////////////////////////////////////////////////////////////////////////////////////////

if (score < 5000) {
  score += 5;
  delay(5000);

  // push score

  sprintf(colorStr, "%s", color);
  Spark.publish("currentColor", colorStr);
  sprintf(scoreStr, "%i", score);
  Spark.publish("currentScore", scoreStr);

  // console if needed

  // Serial.println("Score");
  // Serial.println(score);
} 

////////////////////////////////////////////////////////////////////////////////////////////////////////
// Check on score once every 5 seconds and update LED
////////////////////////////////////////////////////////////////////////////////////////////////////////

currentMillis = millis();

if ((currentMillis - prevMillis) >= 5000) {
   
////////////////////////////////////////////////////////////////////////////////////////////////////////
// Score to color rules
////////////////////////////////////////////////////////////////////////////////////////////////////////

// Rules for LevelOne (Red)
     
if (((score >= levelOne) && (score < levelTwo)) && ( rval != 255 )) {   
  for (int r=0; r <= 255; r++) {
    RGB.color(rval, gval, bval);
    rval = r;
    delay(20);
    prevMillis = currentMillis;
    strcpy(color, "Red!");
  }
}

// Rules for LevelTwo (Orange)
      
else if (((score >= levelTwo) && (score < levelThree)) && (gval != 40) ) {   
  for (int g=0; g <= 40; g++) {
    RGB.color(rval, gval, bval);
    gval = g; 
    delay(20);
    prevMillis = currentMillis;
    strcpy(color, "Orange!");
  }
}
      
// Rules for LevelThree (Yellow)
      
else if (((score >= levelThree) && (score < levelFour)) && (gval != 140) ) {         
  for (int g=40; g <= 140; g++) {
    RGB.color(rval, gval, bval);
    gval = g;
    delay(20);
    prevMillis = currentMillis;
    strcpy(color, "Yellow!");
  } 
}
      
// Rules for LevelFour (Green)
      
else if (((score >= levelFour) && (score < levelFive)) && (gval != 255) ) {
  for (int g=140; g <= 255; g++) {
    RGB.color(rval, gval, bval);
    gval = g;
    delay(20);
    prevMillis = currentMillis;
    strcpy(color, "Green!");
  }
  for (int r=255; r >= 0; r--) {
    RGB.color(rval, gval, bval);
    rval = r;
    delay(20);
    prevMillis = currentMillis;
  }             
}
      
// Rules for LevelFive (Aqua)
      
else if (((score >= levelFive) && (score < levelSix)) && (bval != 253) ) {   
  for (int b=0; b <= 253; b++) {
    RGB.color(rval, gval, bval);
    bval = b;
    delay(20);
    prevMillis = currentMillis;
    strcpy(color, "Aqua!");
  }    
} 
      
// Rules for LevelSix (Blue)
      
else if (((score >= levelSix) && (score < levelSeven)) && (bval != 254) ) {           
  for (int b=253; b <= 254; b++) {
    RGB.color(rval, gval, bval);
    bval = b;
    delay(20);
    prevMillis = currentMillis;
    strcpy(color, "Blue!");
  }     
  for (int g=255; g >= 0; g--) {
    RGB.color(rval, gval, bval);
    gval = g;
    delay(20);
    prevMillis = currentMillis; 
  }             
}
      
// Rules for LevelSeven (Purple)
      
else if ((score >= levelSeven) && (bval != 255)) {   
  for (int b=254; b <= 255; b++) {
    RGB.color(rval, gval, bval);
    bval = b;
    delay(20);
    prevMillis = currentMillis;
    strcpy(color, "Purple!");
  }  
  for (int r=0; r <= 105; r++) {
    RGB.color(rval, gval, bval);
    rval = r;
    delay(20);
    prevMillis = currentMillis;
  }
     
}
}
}
