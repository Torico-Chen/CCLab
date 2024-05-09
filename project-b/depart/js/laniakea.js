let objs = [];
let colors = ['#f70640', '#f78e2c', '#fdd903', '#63be93', '#ffffff', '#299dbf', '#f654a9'];


function setup() {
  let canvas = createCanvas(500, 350);
  canvas.parent("p5-canvas-container");
  for (let i = 0; i < 600; i++) {
    objs.push(new Objct());
  }
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = 20;
}

function draw() {
  background('#000000');
  for (let i of objs) {
    i.show();
    i.move();
  }
}

function mousePressed() {

  for (let i of objs) {
    i.moveTo(mouseX, mouseY);
  }
}

class Objct {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.d = 0;
    this.col = random(colors);
    this.init();
    this.t = -int(random(100));
  }

  show() {
    push();
    fill(this.col);
    drawingContext.shadowColor = this.col;
    noStroke();
    circle(this.x, this.y, this.d);
    pop();
  }

  move() {
    this.t++;
    if (0 < this.t && this.t < this.t1) {
      let n = norm(this.t, 0, this.t1 - 1);
      this.d = this.dMax * sin(n * PI);
    }
    if (this.t > this.t1) {
      this.init();
    }
    this.y -= this.yStep;

    if (this.targetX !== undefined && this.targetY !== undefined) {
      this.x += (this.targetX - this.x) * 0.05;
      this.y += (this.targetY - this.y) * 0.05;
    }
  }

  moveTo(x, y) {
    this.targetX = x;
    this.targetY = y;
  }

  init() {
    this.t = 0;
    this.x = random(width);
    this.y = random(height);
    this.t1 = int(random(25, 30));
    this.yStep = random(4);
    this.dMax = random(8, 22);
  }
}
