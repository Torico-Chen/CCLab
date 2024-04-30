let chars = [" ", ".", "-", "=", "+", "%", "O", "0", "$", "#", "@"];

let img;
let cam;

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent("p5-canvas-container");
  background(220);
  cam = createCapture(VIDEO);
  cam.hide();
  img = createImage(width, height);
}

function draw() {
  background(0);

  cam.loadPixels();
  img.loadPixels();

  let gridSize = 15;

  noStroke();
  for (let y = 0; y < img.height; y += gridSize) {
    for (let x = 0; x < img.width; x += gridSize) {
      let index = (x + y * img.width) * 4;

      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];

      let avg = (r + g + b) / 3;

      let cIndex = floor(
        constrain(map(avg, 0, 255, 0, chars.length), 0, chars.length - 1)
      );
      fill(255);
      text(chars[cIndex], x, y);
    }
  }
}
