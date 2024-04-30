let img;

function preload() {
  img = loadImage("assets/sprite.png")
}

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
  background(220);
}

function draw() {
  //   background(200)
  // image(img,0,0)
  let c = img.get(mouseX, mouseY)
  fill(c)
  circle(mouseX, mouseY, 100)

}