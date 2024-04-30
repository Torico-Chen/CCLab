let img;

function preload() {
  img = loadImage("assets/emoji.png");
}

function setup() {
  let canvas = createCanvas(500, 281);
  canvas.parent("p5-canvas-container");
  background(220);
  noCursor();
}

function draw() {
  background(255, 255, 0);

  imageMode(CENTER);
  image(img, mouseX, mouseY, 30, 30);
}