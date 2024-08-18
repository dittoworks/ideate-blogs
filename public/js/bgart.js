const colors = [
    "#D1FF17",  // Neon Green
    "#3BAEF6",  // Sky Blue
    "#80FA82",  // Lime Green
    "#F0F63B",  // Lemon Yellow
    "#703BF6"   // Royal Purple
];

let particles = [];
let currentColor;
let targetColor;
let colorTransitionProgress = 0;
let colorTransitionDuration = 300; // Transition over 5 seconds

function setup() {
    const canvasContainer = select("#post-bg");
    const canvas = createCanvas(canvasContainer.width, canvasContainer.height);
    canvas.parent("post-bg");
    frameRate(60);

    currentColor = color(random(colors));
    targetColor = color(random(colors));

    // Create particles
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(0, 10);  // Very subtle trail effect

    // Color transition
    colorTransitionProgress += 1 / colorTransitionDuration;
    if (colorTransitionProgress >= 1) {
        currentColor = targetColor;
        targetColor = color(random(colors));
        colorTransitionProgress = 0;
    }
    let transitionColor = lerpColor(currentColor, targetColor, colorTransitionProgress);

    // Update and display particles
    for (let particle of particles) {
        particle.update();
        particle.display(transitionColor);
    }
}

class Particle {
    constructor() {
        this.resetPosition();
        this.size = random(1, 3);
        this.alpha = random(50, 150);
        this.blinkSpeed = random(0.02, 0.05);
    }

    resetPosition() {
        this.x = random(width);
        this.y = random(height);
    }

    update() {
        this.alpha = 75 + 75 * sin(frameCount * this.blinkSpeed);
        
        // Slowly move particles
        this.x += random(-0.2, 0.2);
        this.y += random(-0.2, 0.2);

        // Wrap around edges
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }

    display(baseColor) {
        noStroke();
        let particleColor = color(red(baseColor), green(baseColor), blue(baseColor), this.alpha);
        fill(particleColor);
        ellipse(this.x, this.y, this.size);
    }
}

function windowResized() {
    const canvasContainer = select("#post-bg");
    resizeCanvas(canvasContainer.width, canvasContainer.height);
    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}