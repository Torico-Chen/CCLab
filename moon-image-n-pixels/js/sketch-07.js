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
  //background(255, 255, 220);
  //image(img, 0, 0);

  //let c = color(255, 0, 0);

  for (let i = 0; i < 50; i++) {

    let x = floor(random(width));
    let y = floor(random(height));
    let dia = random(3, 10);
    let c = img.get(x, y);

    let r = red(c);
    let g = green(c);
    let b = blue(c);
    let a = alpha(c);

    noStroke();
    fill(r + 50, g, b, a);
    circle(x, y, dia);
  }


}