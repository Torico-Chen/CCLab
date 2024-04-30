let balls = []; // empty array

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
  background(220);
}

function draw() {
  background(220);

  // generate
  if (mouseIsPressed) {
    balls.push(new Ball(mouseX, mouseY, random(5, 30)));
    balls.push(new Ball(mouseX, mouseY, random(5, 30)));
    balls.push(new Ball(mouseX, mouseY, random(5, 30)));
  }

  // update and display
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i]; // get each ball
    b.move();
    b.slowDown();
    if (mouseIsPressed) {
      //b.speedUp();
    }
    b.display();
  }

  // limit the number of the objects
  while (balls.length > 500) {
    // let's remove the first (oldest) element!
    balls.splice(0, 1);
  }

  text(frameRate().toFixed(2), 10, 20);
  text(balls.length, 10, 40);
}


class Ball {
  constructor(initX, initY, initDia) {
    this.x = initX;
    this.y = initY;
    this.xSpd = random(-1, 1);
    this.ySpd = random(-1, 1);
    this.dia = initDia;
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  speedUp() {
    // +10%
    this.xSpd = this.xSpd * 1.10;
    this.ySpd *= 1.10;
  }
  slowDown() {
    // -5%
    this.xSpd = this.xSpd * 0.95;
    this.ySpd *= 0.95;
  }
  display() {
    push();
    translate(this.x, this.y);
    circle(0, 0, this.dia);
    pop();
  }
}
