let img;

function preload() {
  img = loadImage("assets/colorful.jpg");
}

function setup() {
  let canvas = createCanvas(500, 281);
  canvas.parent("p5-canvas-container");
  background(220);
}

function draw() {
  background(220);

  let r = map(mouseX, 0, width, 0, 255);
  let g = map(mouseY, 0, height, 0, 255);
  let b = map(mouseX, 0, width, 255, 0);

  tint(r, g, b);
  image(img, 0, 0);

  //filter(GRAY);
  //filter(INVERT);
  //filter(THRESHOLD, 0.5);
  if (mouseIsPressed == false) {
    filter(BLUR, 5);
  }
  //THRESHOLD, GRAY, OPAQUE, INVERT, POSTERIZE, BLUR, ERODE, DILATE or BLUR.
}