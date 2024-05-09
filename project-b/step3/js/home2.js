let drops = [];
let forms = [];
let formsNum = 20;
let minRadius = 15;
let maxRadius;
let maxFormWidth;
let minFormWidth;
let startX;
let stopX;
let timeStarted = false;
let startTime;
let transitionProgress = 0; // control the transition progress
let rainSound;
let fireStartSound;
let encoreSound;
let buttonVisible = false;

let stars = [];
const starsNum = 30;
let starsSizeMax;
let count = 0;
let isBlendModeAdd = true;
let myAlpha;
let lastChange = -1;

let lines = [
  "We are...here? The Earth?",

  "Yeah, creatures here are more boring than I th...",

  "Wait, what is that?"
];
let currentLineIndex = 0;
let lineDelay = 5000; // Delay between lines in milliseconds???
let currentLineStartTime; // Start time 

function preload() {
  rainSound = loadSound('assets/rain.mp3');
  fireStartSound = loadSound('assets/startfire.mp3');
  encoreSound = loadSound('assets/Travelersencore.mp3')
}

function setup() {
  let canvas = createCanvas(500, 350);
  canvas.parent("p5-canvas-container");
  frameRate(60);
  angleMode(DEGREES);
  colorMode(HSB);


  starsSizeMax = width > height ? width / 20 : height / 20;
  maxRadius = height * 1.3;
  maxFormWidth = width / 8;
  minFormWidth = maxFormWidth / 4;

  for (let i = 0; i < formsNum; i++) {
    forms[i] = new Form(i); //i is order
  }

}

function draw() {
  const buttonContainer = document.getElementById('buttonContainer');
  background(0);

  // Start the timer
  if (!timeStarted) {
    startTime = millis();
    timeStarted = true;
    currentLineStartTime = millis(); // Start the timer for the first line
  }

  // Calculate elapsed time
  let elapsedTime = millis() - startTime;
  let lineElapsedTime = millis() - currentLineStartTime;

  // rain effect
  if (elapsedTime < 15000) {
    if (frameCount % 2 == 0) { // Add a new drop every other frame for variety
      drops.push(new Drop());
    }
    if (!rainSound.isPlaying()) {
      rainSound.loop();
    }
    for (let i = drops.length - 1; i >= 0; i--) {
      drops[i].fall();
      drops[i].show();
      if (drops[i].y > height) {
        drops.splice(i, 1); // Remove drop 
      }
    }

    // opacity
    textSize(20);
    textAlign(CENTER);
    fill(255, calculateLineOpacity(lineElapsedTime));
    text(lines[currentLineIndex], width / 2, height / 2);

    // Check if it's time
    if (lineElapsedTime > lineDelay) {
      currentLineIndex++; // Move to the next line
      currentLineStartTime = millis(); // Start the timer for the next line
    }
  } else {
    // After 10 seconds
    frameRate(20)
    background(0);
    noStroke();
    restoreSettings();
    starsSizeMax = width > height ? width / 20 : height / 20;

    if (transitionProgress < 1) {
      transitionProgress += 0.01;
      if (!fireStartSound.isPlaying()) {
        fireStartSound.play();
        rainSound.stop(); // Stop the rain sound
      }
      if (!fireStartSound.isPlaying()) {
        fireStartSound.play();
      }// Increase the transition progress gradually
    }

    if (fireStartSound.isPlaying() && fireStartSound.currentTime() >= 5 && count === 0) {
      //encoreSound.play()
      encoreSound.loop()
      if (!buttonVisible) {
        buttonContainer.style.display = 'block';
        buttonVisible = true;
      }

      for (let i = 0; i < starsNum; i++) {
        stars.push(new Star());
      }
      count++;

    }

    for (let i = 0; i < formsNum; i++) {
      forms[i].draw(transitionProgress); // Pass the transition progress to the Form draw()
      forms[i].restart();
    }
    drawStars();

    for (let i = 0; i < formsNum; i++) {
      forms[i].draw(transitionProgress); // Pass the transition progress to the Form draw()
      forms[i].restart();
    }
  }
}

function calculateLineOpacity(lineElapsedTime) {
  let opacity = map(lineElapsedTime, 0, lineDelay, 0, 255);
  return constrain(opacity, 0, 255);
}


class Form {
  constructor(order) {
    this.xoffStart = map(order, 0, formsNum, 0, 1000);
    this.xoff = this.xoffStart;
    this.xoffChange = 0.01;
    this.width = map(order, 0, formsNum, maxFormWidth, minFormWidth);
    this.startX = (width - this.width) / 2;
    this.stopX = (width + this.width) / 2;
    this.x = startX;
    this.startDegree = 0;
    this.degree = this.startDegree;
    this.order = order;
    this.hue = map(order, 0, formsNum, 0, 60);
    this.alpha = map(order, 0, formsNum, 0.2, 0.5);
  }

  calcule() {
    this.avrRadius = map(this.order, 0, formsNum, maxRadius, minRadius);
    this.n = noise(this.xoff);

    //vertexCalcule
    this.y = height - (sin(this.degree) * this.avrRadius * this.n);
    this.x = map(this.degree - this.startDegree, 0, 180, this.startX, this.stopX);
  }

  draw(transitionProgress) {
    noStroke();
    fill(this.hue, 100, 100, this.alpha * transitionProgress); //adjust the alpha over time
    beginShape();
    vertex(this.startX, height);
    while (this.degree < 180) {
      this.calcule();
      vertex(this.x, this.y);
      this.update();
    }
    vertex(this.stopX, height);
    endShape();
  }

  update() {
    this.degree++;
    this.xoff += this.xoffChange;
  }

  restart() {
    this.degree = this.startDegree;
    this.xoffStart += 0.5;
    this.xoff = this.xoffStart;
  }
}

class Drop {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.speed = random(4, 10);
    this.gray = map(noise(this.x, this.y), 0, 1, 0, 255);
  }

  fall() {
    this.y += this.speed;
  }

  show() {
    strokeWeight(2);
    stroke(this.gray);
    line(this.x, this.y, this.x, this.y + 10);
  }
}

function drawStars() {
  blendMode(BLEND);
  background(0, 30);

  blendMode(isBlendModeAdd ? ADD : BLEND);
  for (let i = 0; i < stars.length; i++) {
    stars[i].display();
  }

  count++;

  if (count > 15) {
    stars = [];
    for (let i = 0; i < starsNum; i++) {
      stars.push(new Star());
    }
    count = 0;
  }
  if ((lastChange + 20) < frameCount) {
    restoreSettings();
  }
}


function restoreSettings() {
  myAlpha = 5;
  isBlendModeAdd = true;
}

function Star() {
  this.ox = random(width);
  this.oy = random(height);
  this.R = random(10, starsSizeMax);
  this.lightNum = floor(random(10, 60));
  this.c = random(360);
  this.cRange = random(360);

  this.display = function () {
    for (let i = 0; i < this.lightNum; i++) {
      let vertexNum = floor(random(3, 8));
      fill(random(this.c, this.c + this.cRange) % 360, random(50, 100), random(30, 100), myAlpha);

      push();
      translate(this.ox, this.oy);
      beginShape();
      for (let j = 0; j < vertexNum; j++) {
        let r = random(this.R);
        let t = random(628);
        vertex(r * cos(t), r * sin(t));
        mouseMoved();
      }
      endShape(CLOSE);
      pop();
    }
  }
}


function mouseMoved() {
  myAlpha = map(mouseX, 0, 12000, 0, 10);
  recordLastChangeTime();
}

function recordLastChangeTime() {
  lastChange = frameCount;
}