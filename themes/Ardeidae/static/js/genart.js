const colors = [
    "#D1FF17",  // Neon Green
    "#3BAEF6",  // Sky Blue
    "#80FA82",  // Lime Green
    "#F0F63B",  // Lemon Yellow
    "#703BF6"   // Royal Purple
];

let arcSize = 100;
let yStep = 10;
let padding = arcSize * 4;
let phi = 0;
let phiIncrement = 0.5; // Slowed down from original 3

let rotation = 0;

let currentColor;
let targetColor;
let colorTransitionProgress = 0;
let colorTransitionDuration = 600; // Transition over 10 seconds (assuming 60 fps)

function setup() {
    const canvaContainer = select("#landing-canva");
    const canva = createCanvas(canvaContainer.width, canvaContainer.height);
    canva.parent("landing-canva");
    frameRate(60);

    // random vars (kept from original)
    rotation = random(PI / 2);
    arcSize = random(50, 150);
    yStep = random(8, 12);
    phiIncrement = random(0.2, 0.8); // Slowed down range from original 1, 5

    currentColor = color(random(colors));
    targetColor = color(random(colors));
}

function draw() {
    background(0); // Always black background
    noFill();

    // Color transition
    colorTransitionProgress += 1 / colorTransitionDuration;
    if (colorTransitionProgress >= 1) {
        currentColor = targetColor;
        targetColor = color(random(colors));
        colorTransitionProgress = 0;
    }
    let transitionColor = lerpColor(currentColor, targetColor, colorTransitionProgress);
    stroke(transitionColor);

    // Original animation structure
    rotate(rotation);
    translate(0, -(Math.sin(rotation) * width));

    for (let y = -padding; y < (height) + padding; y += yStep) {
        let sw1 = map(sin(radians(y + phi)), -1, 1, 2, yStep);
        strokeWeight(sw1);
        for (let x1 = -padding; x1 < width + padding; x1 += arcSize * 2) {
            arc(x1, y, arcSize, arcSize, 0, PI);
        }

        let sw2 = map(sin(radians(y - phi)), -1, 1, 2, yStep);
        strokeWeight(sw2);
        for (let x2 = -padding; x2 < width + padding; x2 += arcSize * 2) {
            arc(x2 + arcSize, y, arcSize, arcSize, PI, TWO_PI);
        }
    }
    phi += phiIncrement;
}