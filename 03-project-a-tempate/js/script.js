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

let creatureX = 0;
let creatureY = 0;

let meteorX = 177;
let meteorY = 25;
let isAngry = false;

let tbh = 0;

let scl = 1.0;
let sclReduction = 0.01;
let initialScl = 1


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
    let cnv = createCanvas(800, 500);
    cnv.parent("p5-canvas-container")
    console.log("hello")

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
    //bg stars
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        fill(255, star.opacity);
        circle(star.x, star.y, star.starsize);

        if (random() < 0.01) {
            star.opacity = random(100, 255);
        }
    }

    if (isAngry == true) {
        //change mode
        angry();
        //blackhole
        push();
        // blendMode(BLEND);
        blendMode(ADD);
        noFill();
        let nTriangles = 500;
        translate(mouseX, mouseY);
        for (let i = nTriangles; i > 0; i--) {
            push();
            if (i % 3 === 0) {
                stroke(100, 0, 0, 255 * (1 - i / nTriangles));
            } else if (i % 3 === 1) {
                stroke(0, 100, 0, 255 * (1 - i / nTriangles));
            } else {
                stroke(0, 0, 100, 255 * (1 - i / nTriangles));
            }
            let angle = (-i / nTriangles) * TWO_PI + radians(tbh);
            rotate(angle);
            drawTriangle(i / 2.5);
            pop();
        }
        tbh += 1;
        pop();
    } else {
        normall();
    }

    //blackhole
    function drawTriangle(size) {
        let h1 = size / (2 * cos(radians(30)));
        let h2 = h1 * sin(radians(30));
        triangle(0, -h1, -size / 2, h2, size / 2, h2);
    }
    if (!isDrawing) {
        return;
    }

    push();
    if (blendModeAdd) {
        blendMode(ADD);
    } else {
        blendMode(BLEND);
    }

    //generate stars
    push()
    //shrink
    translate(mouseX, mouseY); // move the origin to the center

    if (isAngry == true) {
        scl -= sclReduction;
        if (scl < 0) {
            scl = 0;
        }
        scale(scl);
    } else {
        scl = initialScl; // Reset scale value when isAngry is false
    }

    translate(-mouseX, -mouseY); // put it back!
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
            starburst(pathX[j], pathY[j], 20, 10, theta, 7);
        }
    }

    pop()
    //star trail
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

//switch off
function keyPressed() {
    if (key === "s") {
        blendModeAdd = !blendModeAdd;
    } else if (key == " ") {
        isAngry = !isAngry; // toggle
        if (isAngry == true) {
            pathX2 = []; // empty the array: empty the path
            pathY2 = [];
            meteorX = creatureX; // set the position of the meteor
            meteorY = creatureY;
        }
    }
}

//normal version
function normall() {
    push();
    let offsetX = sin(frameCount * 0.008) * 150 + 150 + moveX;
    let offsetY = cos(frameCount * 0.01) * 200 + 250 + moveY;

    translate(offsetX, offsetY);

    let numLines = 6;
    for (let i = 0; i < numLines; i++) {
        let diameter = map(i, 0, numLines - 1, 70, 10);
        let r = map(i, 0, numLines - 1, 200, 255);
        let g = map(i, 0, numLines - 1, 0, 230);
        let b = map(i, 0, numLines - 1, 50, 0);
        fill(r, g, b);

        for (let x = -sin(frameCount * 0.008) * 180; x <= 180; x += 5) {
            let y =
                sin(frameCount * 0.08 + map(x, -200, 100, 0, 2 * PI)) *
                sin(frameCount * 0.01) *
                50 +
                random(0, sin(frameCount * 0.01) * 5);
            circle(x, y, diameter);
            creatureY = offsetY + y;
        }
    }
    pop();

    creatureX = offsetX + 180;
}

//angry version
function angry() {
    push();
    if (blendModeAdd) {
        blendMode(ADD);
    } else {
        blendMode(BLEND);
    }
    let t = millis();
    let k = frameCount % PATHLEN2;
    pathX2[k] = meteorX;
    pathY2[k] = meteorY;
    meteorX = meteorX + xmetspeed;
    meteorY = meteorY + ymetspeed;
    if (meteorX < 0 || meteorX > width) {
        xmetspeed *= -1;
    }

    if (meteorY < 0 || meteorY > height) {
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
