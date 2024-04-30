let img;
let cam;

function preload() {
  img = loadImage("assets/tree.png");
}

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent("p5-canvas-container");
  background(255, 255, 220);

  cam = createCapture(VIDEO);
  cam.hide();
}

function draw() {
  //background(255, 255, 220);
  //image(img, 0, 0);
  //image(cam, 0, 0);

  //let c = color(255, 0, 0);

  for (let i = 0; i < 50; i++) {

    let x = floor(random(width));
    let y = floor(random(height));
    let dia = random(3, 30);
    let c = cam.get(x, y);

    let r = red(c);
    let g = green(c);
    let b = blue(c);
    let a = alpha(c);

    //let avg = (r + g + b) / 3;

    noStroke();
    fill(r + 50, g + 50, b + 50, 255);
    circle(x, y, dia);
  }
}