let gradient = 100
let fireflies = [];

function setup() {
  createCanvas(600, 600);
  canvas.parent("p5-canvas-container");
  background(10, 30, 50);
}

function mouseClicked() {
  let x = mouseX;
  let y = mouseY;
  let newFirefly = new Firefly(x, y);
  fireflies.push(newFirefly);

  while (fireflies.length > 20) {
    fireflies.splice(0, 1);
  }
}

function draw() {
  background(10, 30, 50, 200);

  //moonlight
  for (let moonlight = gradient; moonlight > 0; moonlight--) {
    let moonlightSize = map(moonlight, gradient, 0, width / 0.5, 100);
    noStroke();
    fill(lerpColor(color(0), color(0, 70, 200), 0.8 - moonlight / gradient));
    ellipse(width / 5 * 3.3, height / 5 * 1, moonlightSize, moonlightSize);
  }

  push();
  noStroke();
  fill(255);
  ellipse(400, 120, 100, 100);
  pop();

  for (let i = 0; i < fireflies.length; i++) {
    fireflies[i].move();
    fireflies[i].speedUp();
    fireflies[i].updateFacing();
    fireflies[i].update();
    fireflies[i].display();
  }
}



class Firefly {
  constructor(x, y) {
    this.light = color(255, 255, 0);
    this.dim = color(55);
    this.t = 0;
    this.x = x;
    this.y = y;
    this.a = map(sin(this.t), -1, 1, 0, 1);
    this.dF = random(1000);
    this.facing = map(noise(this.dF), 0, 1, -TAU, TAU);
    this.size = random(0.1, 0.25);
    this.speed = random(0.5, 1) * this.size * 4;
  }

  gather(x, y) {
    let dx = x - this.x;
    let dy = y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 1) {
      let speed = 0.9;
      let ratio = speed / distance;
      this.x += dx * ratio;
      this.y += dy * ratio;
    }
  }

  move() {
    if (mouseIsPressed) {
      this.gather(mouseX, mouseY);
    } else {
      this.x += this.speed * 2 * Math.cos(this.facing);
      this.y += this.speed * 2 * Math.sin(this.facing);
      if (this.x > width + 50) {
        this.x = -50;
      } else if (this.x < -50) {
        this.x = width + 50;
      }
      if (this.y > height + 50) {
        this.y = -50;
      } else if (this.y < -50) {
        this.y = height + 50;
      }
    }
  }

  speedUp() {
    this.t += this.speed * 0.1;
    this.a = map(Math.sin(this.t), -1, 1, 0, 1);
  }

  updateFacing() {
    this.dF += 0.0025;
    this.facing = map(noise(this.dF), 0, 1, -Math.PI, Math.PI);
  }

  update() {
    this.speedUp();
    this.move();
    this.updateFacing();
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.facing);
    scale(this.size);
    stroke(35);
    strokeWeight(2);
    line(0, 0, 30 * cos(PI / 6), 30 * sin(PI / 6));
    line(0, 0, 30 * cos(-PI / 6), 30 * sin(-PI / 6));
    strokeWeight(5);
    point(30 * cos(PI / 6), 30 * sin(PI / 6));
    point(30 * cos(-PI / 6), 30 * sin(-PI / 6));
    noStroke();
    fill(35);
    ellipse(-5, 0, 40, 40);
    fill(this.light);
    ellipse(-50, 0, 100, 50);
    fill(30);
    stroke(30);
    rotate(-this.a);
    ellipse(-50, 0, 100, 50);
    rotate(2 * this.a);
    ellipse(-50, 0, 100, 50);
    pop();
  }
}
