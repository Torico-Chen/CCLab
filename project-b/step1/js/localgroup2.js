var mic;
var echosound;
var displayText;
var textContainer;
var buttonContainer;
var buttonVisible = false;

class objects {
  constructor() {
    this.vx = random(-1, 2);
    this.vy = random(-0.2, 1);
    this.x = random(width);
    this.y = random(height);
    this.m = random(height / 0.8, height);
    this.c = random();
    this.w = random(10, 1);
  }
  draw(level) {
    fill(this.c, 0.3 + level, 0.5, 1 - level);
    ellipse(this.x, this.y, this.m * level);

    this.x += this.vx * (1 + level);
    this.y += this.vy * (1 + level);

    if (this.x > width || this.x < 0) {
      this.vx = -this.vx
    }
    if (this.y > height || this.y < 0) {
      this.vy = -this.vy
    }
  }
}

let nBalls = 50;
let balls = [];

function preload() {
  echosound = loadSound('assets/levelup.mp3');
}

function setup() {
  let canvas = createCanvas(500, 350);
  canvas.parent("p5-canvas-container");
  background(50);
  mic = new p5.AudioIn();

  mic.start();
  colorMode(RGB, 6);

  for (let i = 0; i < nBalls; i++) {
    balls.push(new objects());
  }

  displayText = document.getElementById('displayText');
  textContainer = document.getElementById('textContainer');
  buttonContainer = document.getElementById('buttonContainer');
}

function draw() {
  background(0, 0.15);
  micLevel = mic.getLevel(100.9);

  for (let i = 0; i < nBalls; i++) {
    balls[i].draw(micLevel);
  }

  for (var x = 0; x < width; x += 5) {
    var noiseVal = noise((micLevel + x) * 200, micLevel * 100);
    stroke(noiseVal * 100);
    fill(2, 3, 5);
    stroke(random(7, 10), 127, 255, 127);
  }

  if (micLevel > 0.5) {

    echosound.play();
    echosound.loop()

    displayText.textContent = "They heard you.";
    textContainer.style.top = '550px';
    textContainer.style.left = '550px';
    textContainer.style.transform = 'translate(-50%, -50%)';
    textContainer.style.display = 'block';

    if (!buttonVisible) {
      buttonContainer.style.display = 'block';
      buttonVisible = true;
    }
  }


}