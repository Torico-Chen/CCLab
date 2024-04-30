let img;

function preload() {
  img = loadImage("assets/sprite.png");
}

function setup() {
  let canvas = createCanvas(500, 281);
  canvas.parent("p5-canvas-container");
  background(0);
  noCursor();
}

function draw() {
  //background(0);

  blendMode(ADD);
  tint(15, 80, 120, 50);
  imageMode(CENTER);
  image(img, mouseX, mouseY, 30, 30);
}