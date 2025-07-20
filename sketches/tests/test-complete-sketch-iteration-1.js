/* 
Code by Desh Iyer.

p5.js sketch to generate an L-system with the parameters:
    Variables: {F, +, -, [, ]}
    Axiom: F
    Rule: F -> FF+[+F-F-F]-[-F+F+F]

This sketch also contains code to upscale the image and save a copy of the sketch's state. Press the 'e' key to export a high-resolution snapshot of the canvas.

All the logic for the L-system is rendered to the scaled up canvas and then put on screen in the browser with p5.js's image() function.


? Ideas:
- Apply scaling factor not just to len but to angle/alpha value
- Change canvas to higher resolution and set fractal length to be a factor of canvas dims  

*/

let canvas;
let DIM = 512; // Dimensions of the initial canvas
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

//! Effectively your "main()" function!
function draw() {
  scaledCanvas.clear();

  //* Wrapper code for the scaledCanvas
  scaledCanvas.push();
  scaledCanvas.scale(currentScale);
  scaledCanvasSubroutine();
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
    console.log("Starting export...");
    exportHighResolutionImage();
    console.log("Done!");
}

// The rest of the code handles the logic to create and render the L-system into the scaled canvas. Notice how all drawing functions begin with "scaledCanvas."
let axiom = "F";
let sentence = axiom;
let NUM_GENERATIONS = 4;

let lineLen = 250;
let angle;

let rules = [];
rules[0] = {
  a: "F", // Input string
  b: "FF+[+F-F-F]-[-F+F+F]" // Output string
}

function runTurtleOnce() {
  scaledCanvas.background(51);
  scaledCanvas.resetMatrix(); // Required for no draw loop, this makes sure that the translations are always reset when this function is called
  scaledCanvas.translate(width / 2.5, height);
  scaledCanvas.stroke(255, 100);

  for (var i = 0; i < sentence.length; ++i) {
    var current = sentence.charAt(i);

    // Manually describe operations for each character in the alphabet
    if (current == "F") {
      scaledCanvas.line(0, 0, 0, -lineLen); // Move the frame of reference to the end of the line just drawn
      scaledCanvas.translate(0, -lineLen);
    } else if (current == "+") {
      scaledCanvas.rotate(angle);
    } else if (current == "-") {
      scaledCanvas.rotate(-angle);
    } else if (current == "[") {
      // Function in p5.js to save the transformation state. It creates a drawing group that contains it's own styles and transformations.
      scaledCanvas.push();
    } else if (current == "]") {
      // Encloses the drawing group that started with push()
      scaledCanvas.pop();
    }
  }
}

function runFractalForOneGeneration() {
  // Shrink the line by some scaling factor every time function is called
  lineLen *= 0.5;
  let newSentence = "";

  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;

    for (let j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        newSentence += rules[j].b;
        break;
      }
    }

    if (!found) {
      newSentence += current;
    }
  }

  sentence = newSentence;

  // scaledCanvas.createP(sentence);
  runTurtleOnce();
}

function scaledCanvasSubroutine() {
  scaledCanvas.background(51);

  angle = radians(25);

  runTurtleOnce();

  for (let i = 0; i < NUM_GENERATIONS; i++) {
    runFractalForOneGeneration();
  }
}