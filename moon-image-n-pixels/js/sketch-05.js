let img;

function preload() {
  img = loadImage("assets/tree.png");
}

function setup() {
  let canvas = createCanvas(800, 800);
  canvas.parent("p5-canvas-container");
  background(255, 255, 220);

}

function draw() {
  background(255, 255, 220);
  image(img, 0, 0);

  //let c = color(255, 0, 0);
  let c = img.get(mouseX, mouseY);
  fill(c);
  rect(10, 10, 100, 100);
}