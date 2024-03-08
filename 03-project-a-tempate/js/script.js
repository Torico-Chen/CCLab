console.log("torico")
alert("Torico")


let stars = [];
let moveX = 10;
let moveY = 0;
let PATHLEN = 12;
let pathX = new Array(PATHLEN);
let pathY = new Array(PATHLEN);
let meteors = [];
let isDrawing = false;
let t = 0;
let blendModeAdd = false;

let PATHLEN2 = 40;
let xmetspeed = -4;
let ymetspeed = 5;
let pathX2 = new Array(PATHLEN);
let pathY2 = new Array(PATHLEN);

let meteorX = 177;
let meteorY = 25;

// let creatureX = 0,
//   creatureY = 0;


function pVertex(r, theta) {
    vertex(r * cos(theta), r * sin(theta));
}

function starburst(x, y, r1, r2, theta, n) {
    push();
    translate(x, y);
    beginShape();
    for (let i = 0; i < n; i++) {
        pVertex(r1, (i * PI * 2) / n - theta);
        pVertex(r2, ((i + 0.5) * PI * 2) / n - theta);
    }
    endShape(CLOSE);
    pop();
}

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.parent("p5-canvas-container")
    canvas.addEventListener("mousedown", () => {
        isDrawing = true;

        let newMeteor = {
            x: random(width),
            y: random(height),
            xmetspeed: random(-2, 2),
            ymetspeed: random(-2, 2),
        };
        meteors.push(newMeteor);
    });
    noStroke();

    for (let i = 0; i < 100; i++) {
        let x = random(width);
        let y = random(height);
        let starsize = random(1, 5);
        let opacity = random(20, 255);
        stars.push({ x, y, starsize, opacity });
    }
}

function draw() {
    if (mouseIsPressed) {
        background(0, 10);
    } else {
        background(0, 50);
    }
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        fill(255, star.opacity);
        circle(star.x, star.y, star.starsize);

        if (random() < 0.01) {
            star.opacity = random(100, 255);
        }
    }

    if (keyIsPressed && key == "m") {
        angry();
    } else {
        normall();
    }

    if (!isDrawing) {
        return;
    }
    for (let i = 0; i < meteors.length; i++) {
        let meteor = meteors[i];
        // let t = millis();
        let k = frameCount % PATHLEN;
        pathX[k] = meteor.x;
        pathY[k] = meteor.y;
        meteor.x += meteor.xmetspeed;
        meteor.y += meteor.ymetspeed;
        if (meteor.x < 0 || meteor.x > width) {
            meteor.xmetspeed *= -1;
        }

        if (meteor.y < 0 || meteor.y > height) {
            meteor.ymetspeed *= -1;
        }

        for (let i = 0; i < PATHLEN; i++) {
            let p = i / PATHLEN;
            let r2 = map(i, 0, PATHLEN - 1, 200, 255);
            let g2 = map(i, 0, PATHLEN - 1, 0, 230);
            let b2 = map(i, 0, PATHLEN - 1, 50, 0);
            fill(r2, g2, b2);
            let j = (i + k + 1) % PATHLEN;
            let theta = sin((4 * (t - j)) / TWO_PI) * PI;
            starburst(pathX[j], pathY[j], 20, 10, theta, 8);
        }
    }

    push();
    if (blendModeAdd) {
        blendMode(ADD);
    } else {
        blendMode(BLEND);
    }

    t += 0.0005;
    let X = noise(t) * width;
    let Y = noise(t * 0.009) * height;

    for (let d = -252; d <= 300; d += 1.2) {
        fill(250, 200, 140);
        let A = t * 30 + d / 1.2;
        let posX = (X + cos(A) * d * 1.5 + width) % width;
        let posY = (Y + sin(A) * d * 1.5 + height) % height;
        circle(posX, posY, 3);
    }
    pop();
}

function keyPressed() {
    if (key === "s") {
        blendModeAdd = !blendModeAdd;
    }
}

function normall() {
    push();
    creatureX = sin(frameCount * 0.008) * 150 + 150 + moveX;
    creatureY = cos(frameCount * 0.01) * 200 + 250 + moveY;

    translate(creatureX, creatureY);
    let numLines = 6;
    for (let i = 0; i < numLines; i++) {
        let diameter = map(i, 0, numLines - 1, 70, 10);
        let r = map(i, 0, numLines - 1, 200, 255);
        let g = map(i, 0, numLines - 1, 0, 230);
        let b = map(i, 0, numLines - 1, 50, 0);
        fill(r, g, b);

        for (let x = -sin(frameCount * 0.008) * 180; x < 180; x += 5) {
            let y =
                sin(frameCount * 0.08 + map(x, -200, 100, 0, 2 * PI)) *
                sin(frameCount * 0.01) *
                50 +
                random(0, sin(frameCount * 0.01) * 5);
            circle(x, y, diameter);
        }
    }
    pop();
}


function angry() {
    push();
    translate(creatureX, creatureY);
    let t = millis();
    let k = frameCount % PATHLEN2;
    pathX2[k] = meteorX;
    pathY2[k] = meteorY;
    meteorX = meteorX + xmetspeed;
    meteorY = meteorY + ymetspeed;
    if (meteorX < -creatureX || meteorX > width - creatureX) {
        xmetspeed *= -1;
    }

    if (meteorY < -creatureY || meteorY > height - creatureY) {
        ymetspeed *= -1;
    }

    noStroke();

    for (let i = 0; i < PATHLEN2; i++) {
        let p = i / PATHLEN2;
        let r2 = map(i, 0, PATHLEN2 - 1, 200, 255);
        let g2 = map(i, 0, PATHLEN2 - 1, 0, 230);
        let b2 = map(i, 0, PATHLEN2 - 1, 50, 0);
        fill(r2, g2, b2);
        let j = (i + k + 1) % PATHLEN2;
        let theta = sin((4 * (t - j)) / TWO_PI) * PI;
        starburst(pathX2[j], pathY2[j], 40, 30, theta, 10);
    }
    pop();
}

