let spaceshipImg;
let asteroidImg;
let backgroundImg;

let explosionImg; // The explosion image

let spaceship;
let asteroids = [];
let lasers = [];
let explosions = []; // The explosions
let laserSpeed = 10; // You can adjust this to change the length of the laser beams
let initialAsteroidNum = 5;
let addedAsteroids = 0;
let maxAsteroids = 50;
let startTime; // The time when the game starts
let elapsedTime; // The elapsed time since the game started
let gameover = false; // Whether the game is over

function preload() {
  spaceshipImg = loadImage("images/ufo.jpg");
  asteroidImg = loadImage("images/asteroid.jpg");
  backgroundImg = loadImage("images/milkyway.jpg");

  explosionImg = loadImage("images/explosion.gif");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  spaceship = new Spaceship();
  for (let i = 0; i < initialAsteroidNum; i++) {
    asteroids.push(new Asteroid());
  }
  startTime = millis(); // Record the time when the game starts
}

function draw() {
  clear(); // Clear the canvas

  push(); // Save the current drawing style
  imageMode(CORNER); // Set the image mode to 'CORNER'
  image(backgroundImg, 0, 0, width, height); // Scale the background image to the canvas size
  pop(); // Restore the saved drawing style

  imageMode(CENTER);

  spaceship.show();
  spaceship.rotate();

  // Add more asteroids over time
  if (frameCount % 60 === 0 && asteroids.length < maxAsteroids) { // Add an asteroid every second (assuming 60 FPS)
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
        // Create a new explosion at the location of the asteroid
        explosions.push({ img: explosionImg, x: asteroids[j].pos.x, y: asteroids[j].pos.y, time: millis() });
        lasers.splice(i, 1);
        asteroids.splice(j, 1);
        break;
      }
    }
  }

  // Show all explosions
  for (let i = explosions.length - 1; i >= 0; i--) {
    push(); // Save the current drawing style
    translate(explosions[i].x, explosions[i].y); // Translate to the explosion location
    scale(2.0); // Scale the image by a factor of 2
    image(explosions[i].img, 0, 0); // Display the explosion image
    pop(); // Restore the saved drawing style
    if (millis() - explosions[i].time > 600) { // Display the explosion image for 0,6 seconds
      explosions.splice(i, 1);
    }
  }

  for (let asteroid of asteroids) {
    asteroid.show();
    asteroid.move();
    if (spaceship.hits(asteroid)) {
      gameover = true;
      fill(255)
      textSize(32);
      text('Game Over', spaceship.pos.x, spaceship.pos.y + 50); // Display 'Game Over' below the spaceship
      noLoop();
    }
  }

  if (asteroids.length === 0 && addedAsteroids >= maxAsteroids) {
    gameover = true;
    fill(255)
    textSize(32);
    text('You Win!', spaceship.pos.x, spaceship.pos.y + 50); // Display 'You Win!' below the spaceship
    noLoop();
  }

  if (!gameover) {
    // Calculate the elapsed time and convert it to seconds
    elapsedTime = floor((millis() - startTime) / 1000);
  }
  // Display the timer
  textFont(myFont);
  textSize(32);
  textAlign(CENTER, CENTER);
  text('Time: ' + elapsedTime, width / 2, height - 50);
  fill(0, 102, 153);

}


function mousePressed() {
  if (mouseButton === LEFT) {
    lasers.push(new Laser(createVector(spaceship.pos.x, spaceship.pos.y), spaceship.angle));
  }
}

function Spaceship() {
  this.pos = createVector(width / 2, height / 2);
  this.angle = 0;
  this.show = function () {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(spaceshipImg, 0, 0);
    pop();
  };
  this.rotate = function () {
    let mouseVec = createVector(mouseX - this.pos.x, mouseY - this.pos.y);
    this.angle = mouseVec.heading();
  };
  this.hits = function (asteroid) {
    let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    return d < spaceshipImg.width / 2 + asteroidImg.width / 2 / 4; // Assuming asteroid image is 4 times bigger than actual size.
  };
}

function Asteroid() {
  let edge = floor(random(4)); // Pick a random edge (0 = top, 1 = right, 2 = bottom, 3 = left)
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
  this.vel = p5.Vector.sub(createVector(width / 2, height / 2), this.pos).setMag(random(0.5, 2)); // Move towards spaceship at random speed
  this.show = function () {
    imageMode(CENTER);
    image(asteroidImg, this.pos.x, this.pos.y, asteroidImg.width / 4, asteroidImg.height / 4); // Displaying asteroids at quarter size.
  };
  this.move = function () {
    this.pos.add(this.vel);
  };
}

function Laser(shipPos, angle) {
  this.pos = createVector(shipPos.x, shipPos.y);
  this.vel = p5.Vector.fromAngle(angle).mult(laserSpeed);
  this.show = function () {
    push();
    stroke(255);
    strokeWeight(5);
    line(this.pos.x, this.pos.y, this.pos.x - this.vel.x, this.pos.y - this.vel.y); // Draw a line to represent the laser beam
    pop();
  };
  this.move = function () {
    this.pos.add(this.vel);
  };
  this.hits = function (asteroid) {
    let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    return d < asteroidImg.width / 2 / 4; // Assuming asteroid image is 4 times bigger than actual size.
  };
  this.offscreen = function () {
    return this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height;
  };
}