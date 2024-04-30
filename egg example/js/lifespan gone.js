let particles = [];

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
  background(220);
}

function draw() {
  background(50);

  // generate
  if (random() < 0.75) {
    particles.push(new Particle(random(width), height, random(2, 10)));
  }


  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.move();
    p.checkBoundaries();
    p.age();
    p.display();
  }

  // FLIP THE FOR-LOOP
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    if (p.isDone) {
      // let's remove!
      let index = i;
      particles.splice(index, 1);
    }
  }

  // limit the number of objects
  while (particles.length > 1500) {
    let index = 0;
    particles.splice(index, 1);
  }

  // display the number of particles
  text(particles.length, 10, 20);
}

///// CLASS /////

class Particle {
  constructor(x, y, rad) {
    this.x = x;
    this.y = y;
    this.xSpd = 0;
    this.ySpd = random(-3, -1);
    this.rad = rad
    this.isDone = false;
    //
    this.lifespan = 1.00; // 100%
    this.lifeReduction = random(0.005, 0.015);
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  age() {
    this.lifespan -= this.lifeReduction;
    if (this.lifespan < 0) {
      this.lifespan = 0;
      this.isDone = true;
    }
  }
  checkBoundaries() {
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      // out of canvas
      this.isDone = true;
    }
  }
  display() {
    push();
    translate(this.x, this.y);

    noStroke();
    fill(255, 255 * this.lifespan);
    circle(0, 0, this.rad * 2 * this.lifespan);

    //text(this.lifespan.toFixed(2), 20, 0);
    pop();
  }
}
