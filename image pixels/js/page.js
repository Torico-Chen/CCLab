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
  // background(200)

  tint(200, 200, 0)//image rgb
  blendMode(ADD)
  imageMode(CENTER)
  image(img, mouseX, mouseY, 30, 50)//x and y
  // let blurrr = map(mouseX, 0, width, 0, 10)
  //filter(GRAY)//or invert//or (threshold,0.8) white and black //(blur,3 )
  // fliter(blur, blurrr)
  // img.filter
}