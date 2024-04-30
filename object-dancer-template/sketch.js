/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/


function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
  R = random(100, 255);
  // ...except to adjust the dancer's name on the next line:
  dancer = new cupcakee(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class cupcakee {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.angle = 0;
    this.R = random(100, 255);
    // add properties for your dancer here:
    //..
    //..
    //..
  }
  update() {
    this.angle += 0.1
    // update properties here to achieve
    // your dancer's desired moves and behaviour
  }
  display() {

    let vibration = sin(this.angle) * 5;
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️
    noFill();
    fill(this.R, 152, 208);
    stroke(this.R - 30, 113, 158);
    strokeWeight(4);
    ellipse(0, 0, 150, 130);
    strokeWeight(4);
    fill(242, 210, 181);
    stroke(210, 156, 106);
    quad(
      0 - 65 + vibration,
      0 + vibration,
      0 - 50 + vibration,
      0 + 83 + vibration,
      0 + 50,
      0 + 83 + vibration,
      0 + 65,
      0 + vibration
    );

    fill(this.R, 152, 208);
    stroke(this.R - 30, 113, 158);
    strokeWeight(4);
    ellipse(0 - 60, 0 + 20, 30, 70);
    ellipse(0 - 30, 0 + 20, 40, 45);
    ellipse(0 + 5, 0 + 20, 30, 45);
    ellipse(0 + 60, 0 + 20, 30, 70);
    ellipse(0 + 40, 0 + 20, 40, 45);

    noStroke();
    quad(
      0 - 70,
      0 - 20,
      0 + 72,
      0 - 20,
      0 + 65,
      0 + 20,
      0 - 70,
      0 + 20
    );

    // Eye socket
    fill(249, 238, 242);
    stroke(211, 210, 210);
    ellipse(0 - 30, 0, 50, 50);
    stroke(255)
    line(50, -20, 20, 0)
    line(20, 0, 45, 10)

    // Eyeball rotation
    let eyeRotation = (sin(this.angle) * PI) / 8; // Controls the rotation angle of the eyeballs within the socket

    push();
    translate(0 - 30, 0);
    rotate(eyeRotation);
    fill(254, 232, 144);
    stroke(247, 209, 120);
    ellipse(0, 0, 30, 30);
    fill(62, 54, 41);
    stroke(46, 34, 25);
    ellipse(0, 0, 18, 18);
    fill(249, 238, 242, 200);
    noStroke();
    ellipse(-10, -4, 15, 13);
    ellipse(-16, 6, 6, 6);
    pop();



    rect(0 - 10, 0 - 65 + vibration, 18, 35);
    stroke(247, 209, 120);
    line(
      0 - 10,
      0 - 60 + vibration,
      0 + 10,
      0 - 50 + vibration
    );
    line(
      0 - 10,
      0 - 40 + vibration,
      0 + 10,
      0 - 30 + vibration
    );
    line(
      0 - 10,
      0 - 30 + vibration,
      0,
      0 - 15 + vibration
    );

    stroke(239, 149, 78);
    fill(252, 185, 88);
    ellipse(0, 0 - 70 + vibration, 18, 30);
    stroke(252, 185, 88);
    triangle(
      0 - 7,
      0 - 70 + vibration,
      0 + 7,
      0 - 70 + vibration,
      0,
      0 - 90 + vibration
    );


    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    this.drawReferenceShapes()

    pop();
  }

  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }

}


/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/