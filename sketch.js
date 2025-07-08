/* 

Code by Desh Iyer.

p5.js sketch to generate an L-system with the parameters:
    Variables: {F, +, -, [, ]}
    Axiom: F
    Rule: F -> FF+[+F-F-F]-[-F+F+F]

This sketch also contains code to upscale the image and save a copy of the sketch's state. Press the 'e' key to export a high-resolution snapshot of the canvas.

*/

let canvas;
let DIM = 1024; // Dimensions of the initial canvas
let currentScale;
let scaledCanvas;
let outputScale = 8; // For an 8K image [8 * DIM (1024)]

// Setup function runs once
function setup() {
  canvas = createCanvas(DIM, DIM);
  pixelDensity(1);

  scaledCanvas = createGraphics(DIM, DIM);
  scaledCanvas.pixelDensity(1);

  currentScale = 1; // DO NOT TOUCH!
}

function draw() {
  scaledCanvas.clear();

  scaledCanvas.push();
  scaledCanvas.scale(currentScale);
  // customCodeSubroutine();
  scaledCanvas.pop();

  image(scaledCanvas, 0, 0); // Show sketch on main canvas

  noLoop();
}

