let spaceshipImg;
let asteroidImg;
let backgroundImg;
let explosionImg;
let buttonVisible = false;
let buttonnVisible = false;

let spaceship;
let asteroids = [];
let lasers = [];
let explosions = [];
let laserSpeed = 10;
let initialAsteroidNum = 3;
let addedAsteroids = 0;
let maxAsteroids = 9;
let startTime;
let elapsedTime;
let gameover = false;

let laserSound;

function preload() {
  spaceshipImg = loadImage("images/ufo.jpg");
  asteroidImg = loadImage("images/asteroid.jpg");
  backgroundImg = loadImage("images/milkyway.jpg");

  explosionImg = loadImage("images/explosion.gif");

  laserSound = loadSound("assets/laser.mp3");
}

function setup() {
  let canvas = createCanvas(500, 350);
  canvas.parent("p5-canvas-container");
  spaceship = new Spaceship();
  for (let i = 0; i < initialAsteroidNum; i++) {
    asteroids.push(new Asteroid());
  }
  startTime = millis(); // Record the time 
}

function draw() {
  const buttonContainer = document.getElementById('buttonContainer');
  const buttonnContainer = document.getElementById('buttonnContainer');
  clear();

  push();
  imageMode(CORNER); //??
  image(backgroundImg, 0, 0, width, height); // Scale the background image to the canvas size
  pop();

  imageMode(CENTER);


  spaceship.show();
  spaceship.rotate();


  if (frameCount % 60 === 0 && asteroids.length < maxAsteroids) { //every second (assuming 60 FPS)
    asteroids.push(new Asteroid());
    addedAsteroids++;
  }

  for (let i = lasers.length - 1; i >= 0; i--) {
    lasers[i].show();
    lasers[i].move();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
      continue;
    }
    for (let j = asteroids.length - 1; j >= 0; j--) {
      if (lasers[i].hits(asteroids[j])) {
        // Create a explosion 
        explosions.push({ img: explosionImg, x: asteroids[j].pos.x, y: asteroids[j].pos.y, time: millis() });
        lasers.splice(i, 1);
        asteroids.splice(j, 1);
        break;
      }
    }
  }

  // Show explosions
  for (let i = explosions.length - 1; i >= 0; i--) {
    push();
    translate(explosions[i].x, explosions[i].y);
    scale(0.5);
    image(explosions[i].img, 0, 0);
    pop();
    if (millis() - explosions[i].time > 600) {
      explosions.splice(i, 1);
    }
  }

  for (let asteroid of asteroids) {
    asteroid.show();
    asteroid.move();
    if (spaceship.hits(asteroid)) { //spaceship.hits(asteroid)
      gameover = true;

      textSize(12);
      text('Game Over', spaceship.pos.x, spaceship.pos.y + 50);
      if (!buttonnVisible) {
        buttonnContainer.style.display = 'block';
        buttonnVisible = true;
        noLoop();

      }
    }
    console.log(asteroids.length, addedAsteroids, maxAsteroids);

    if (asteroids.length <= 2 && addedAsteroids >= maxAsteroids) {
      console.log(gameover);
      gameover = true;
      textSize(12);
      text('You Win!', spaceship.pos.x, spaceship.pos.y + 50);
      if (!buttonVisible) {
        buttonContainer.style.display = 'block';
        buttonVisible = true;
      }
      noLoop();
    }

    if (!gameover) {
      // Calculate
      elapsedTime = floor((millis() - startTime) / 1000);
    }
    //timer
    textSize(12);
    textAlign(CENTER, CENTER);
    text('Time: ' + elapsedTime, width / 2, height - 50);
    fill(0, 102, 153);
  }
}

function mousePressed() {
  if (mouseButton === LEFT) {
    laserSound.play();
    lasers.push(new Laser(createVector(spaceship.pos.x, spaceship.pos.y), spaceship.angle));

  }
}

class Spaceship {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.angle = 0;
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(spaceshipImg, 0, 0, spaceshipImg.width / 4, spaceshipImg.height / 4);
    pop();
  }

  rotate() {
    let mouseVec = createVector(mouseX - this.pos.x, mouseY - this.pos.y);
    this.angle = mouseVec.heading();
  }


  hits(asteroid) {
    let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    return d < (spaceshipImg.width / 2 + asteroidImg.width / 2) / 4 - 50;
  }
}

class Asteroid {
  constructor() {
    let edge = floor(random(4));
    let x = random(width);
    let y = random(height);
    if (edge === 0) {
      y = 0;
    } else if (edge === 1) {
      x = width;
    } else if (edge === 2) {
      y = height;
    } else if (edge === 3) {
      x = 0;
    }
    this.pos = createVector(x, y);
    this.vel = p5.Vector.sub(createVector(width / 2, height / 2), this.pos).setMag(random(0.5, 2));
    this.show = function () {
      imageMode(CENTER);
      image(asteroidImg, this.pos.x, this.pos.y, asteroidImg.width / 4, asteroidImg.height / 4);
    };
    this.move = function () {
      this.pos.add(this.vel);
    };
    this.show = function () {
      imageMode(CENTER);
      image(asteroidImg, this.pos.x, this.pos.y, asteroidImg.width / 8, asteroidImg.height / 8);
    }
  }
}

class Laser {
  constructor(shipPos, angle) {
    this.pos = createVector(shipPos.x, shipPos.y);
    this.vel = p5.Vector.fromAngle(angle).mult(laserSpeed);
    this.show = function () {
      push();
      stroke(255);
      strokeWeight(5);
      line(this.pos.x, this.pos.y, this.pos.x - this.vel.x, this.pos.y - this.vel.y); //laser beam
      pop();
    };
    this.move = function () {
      this.pos.add(this.vel);
    };
    this.hits = function (asteroid) {
      let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
      return d < asteroidImg.width / 2 / 4;
    };
    this.offscreen = function () {
      return this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height;
    };
  }
}