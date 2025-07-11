/* 
Code by Desh Iyer.

p5.js sketch to generate an L-system with the parameters:
    Variables: {F, +, -, [, ]}
    Axiom: F
    Rule: F -> FF+[+F-F-F]-[-F+F+F]

This sketch also contains code to upscale the image and save a copy of the sketch's state. Press the 'e' key to export a high-resolution snapshot of the canvas.

All the logic for the L-system is rendered to the scaled up canvas and then put on screen in the browser with p5.js's image() function.
*/

let canvas;
let DIM = 1024; // Dimensions of the initial canvas
let currentScale; // Tracks the active scale factor for drawing, switching between screen and export resolution
let scaledCanvas; // p5 graphics object for the offscreen graphics buffer
let outputScale = 8; // For an 8K image [8 * DIM (1024)]

// Setup function runs once
function setup() {
  canvas = createCanvas(DIM, DIM);
  pixelDensity(1);

  scaledCanvas = createGraphics(DIM, DIM); // https://p5js.org/reference/p5/createGraphics/
  scaledCanvas.pixelDensity(1); // Prevent any unwanted upscaling by the browser or display; maintain consistency

  currentScale = 1; // DO NOT TOUCH!
}

function draw() {
  scaledCanvas.clear();

  scaledCanvas.push();
  scaledCanvas.scale(currentScale);
  // customCodeSubroutine();
  scaledCanvas.pop();

  image(scaledCanvas, 0, 0); // Copy sketch from graphics buffer to main canvas 

  noLoop();
}

function exportHighResolutionImage() {
  currentScale = outputScale;

  scaledCanvas = createGraphics(currentScale * DIM, currentScale * DIM);

  draw();
  save(scaledCanvas, "high_resolution_image", 'png');
  currentScale = 1; // Reset to default scale 1:1
  // Lower-powered machines or browsers have strict memory limits; a huge buffer always active may cause crashes or degraded interaction
  scaledCanvas = createGraphics(DIM, DIM); 
  draw();
}

function keyReleased() { 
  if (key == 'e') 
    exportHighResolutionImage(); 
}

// The rest of the code handles the logic to create and render the L-system into the scaled canvas. Notice how all drawing functions begin with "scaledCanvas."

let axiom = "F";
let sentence = axiom;

let lineLen = 200;
let angle;

let rules = [];
rules[0] = {
  a: "F", // Input string
  b: "FF+[+F-F-F]-[-F+F+F]" // Output string
}

function setupParameters() {
}

function customCodeSubroutine() {
}