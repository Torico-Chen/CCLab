let sound1
let sound2

let x = 100
let y = 120
let w = 150
let h = 110

let r = 255
let g = 255
let b = 255

function preload() {
  sound1 = loadSound("assets/beat.mp3")
  sound1 = loadSound("assets/kick.mp3")
}

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
  background(220);
}

function draw() {
  background(220)

  let distance = dist(x, y, mouseX, mouseY)
  if (distance < rad)
    if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
      r = 255
      g = 255
      b = 0
      if (mouseIsPressed) {
        r = 255
        g = 0
        b = 0
        if (sound1.isPlaying() == false)
    }
    } else {
      r = 255
      g = 255
      b = 255
    }
}
function mousePressed() {
  sound1.play()
}