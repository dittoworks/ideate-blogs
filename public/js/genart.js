const colors = [
    "#D1FF17",  // Neon Green
    "#3BAEF6",  // Sky Blue
    "#80FA82",  // Lime Green
    "#F0F63B",  // Lemon Yellow
    "#703BF6"   // Royal Purple
];

let currentColor;
let targetColor;
let colorTransitionProgress = 0;
let colorTransitionDuration = 300; // Transition over 5 seconds

let particles = [];
let rings = [];
let orbitingStars = [];
let noiseOffset = 0;

function setup() {
    const canvasContainer = select("#landing-canva");
    const canvas = createCanvas(canvasContainer.width, canvasContainer.height);
    canvas.parent("landing-canva");
    frameRate(60);

    currentColor = color(random(colors));
    targetColor = color(random(colors));

    // Create particles
    for (let i = 0; i < 200; i++) {
        particles.push(new Particle());
    }

    // Create rings
    for (let i = 0; i < 3; i++) {
        rings.push(new Ring(180 + i * 40, i * 0.5));
    }

    // Create orbiting stars
    for (let i = 0; i < 20; i++) {
        orbitingStars.push(new OrbitingStar(random(rings).radius, random(TWO_PI)));
    }
}

function draw() {
    background(0, 20);

    // Color transition
    colorTransitionProgress += 1 / colorTransitionDuration;
    if (colorTransitionProgress >= 1) {
        currentColor = targetColor;
        targetColor = color(random(colors));
        colorTransitionProgress = 0;
    }
    let transitionColor = lerpColor(currentColor, targetColor, colorTransitionProgress);

    // Draw particles
    for (let particle of particles) {
        particle.update();
        particle.display();
    }

    push();
    translate(width / 2, height / 2);

    // Draw rings
    for (let ring of rings) {
        ring.update();
        ring.display(transitionColor);
    }

    // Draw orbiting stars
    for (let star of orbitingStars) {
        star.update();
        star.display(transitionColor);
    }

    // Draw morphing sphere
    drawMorphingSphere(transitionColor);

    pop();

    noiseOffset += 0.02;
}

function drawMorphingSphere(baseColor) {
    // Draw aura
    for (let i = 8; i > 0; i--) {
        let auraColor = color(red(baseColor), green(baseColor), blue(baseColor), 10);
        fill(auraColor);
        noStroke();
        ellipse(0, 0, 300 + i * 20 + sin(frameCount * 0.05) * 20);
    }

    // Draw morphing sphere
    noFill();
    strokeWeight(2);
    let radius = 150;
    
    for (let i = 0; i < 50; i++) {
        let angleOffset = noise(i * 0.1, noiseOffset) * TWO_PI;
        let r = radius + sin(frameCount * 0.1 + i * 0.5) * 20;
        stroke(red(baseColor), green(baseColor), blue(baseColor), 150);
        arc(0, 0, r * 2, r * 2, angleOffset, angleOffset + PI);
    }
}

class Particle {
    constructor() {
        this.resetPosition();
        this.size = random(1, 3);
        this.alpha = random(100, 255);
        this.blinkSpeed = random(0.02, 0.05);
    }

    resetPosition() {
        this.x = random(width);
        this.y = random(height);
    }

    update() {
        this.alpha = 127 + 127 * sin(frameCount * this.blinkSpeed);
        
        // Slowly move particles
        this.x += random(-0.5, 0.5);
        this.y += random(-0.5, 0.5);

        // Wrap around edges
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }

    display() {
        noStroke();
        fill(255, this.alpha);
        ellipse(this.x, this.y, this.size);
    }
}

class Ring {
    constructor(radius, rotationSpeed) {
        this.radius = radius;
        this.rotationSpeed = rotationSpeed;
        this.rotation = 0;
    }

    update() {
        this.rotation += this.rotationSpeed;
    }

    display(baseColor) {
        push();
        rotate(this.rotation);
        noFill();
        strokeWeight(2);
        stroke(red(baseColor), green(baseColor), blue(baseColor), 100);
        ellipse(0, 0, this.radius * 2);
        pop();
    }
}

class OrbitingStar {
    constructor(orbitRadius, startAngle) {
        this.orbitRadius = orbitRadius;
        this.angle = startAngle;
        this.speed = random(0.01, 0.03);
        this.size = random(2, 4);
    }

    update() {
        this.angle += this.speed;
    }

    display(baseColor) {
        let x = cos(this.angle) * this.orbitRadius;
        let y = sin(this.angle) * this.orbitRadius;
        fill(red(baseColor), green(baseColor), blue(baseColor), 200);
        noStroke();
        ellipse(x, y, this.size);
    }
}

function windowResized() {
    const canvasContainer = select("#landing-canva");
    resizeCanvas(canvasContainer.width, canvasContainer.height);
    particles = [];
    for (let i = 0; i < 200; i++) {
        particles.push(new Particle());
    }
}