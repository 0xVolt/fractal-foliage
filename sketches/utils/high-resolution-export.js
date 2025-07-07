// Reference -> https://editor.p5js.org/golan/sketches/qKJcoNHXX

// Exports a high-resolution image when 'e' key is pressed

let outputScale = 8;
let currentScale;
let myScaledCanvas;
let canvas;
let DIM = 1024;

//=================================================================
function setup() { // setup
  canvas = createCanvas(DIM, DIM);
  pixelDensity(1); 
  myScaledCanvas = createGraphics(DIM, DIM);
  myScaledCanvas.pixelDensity(1); 
  currentScale = 1; // initialize to 1; don't touch
}

function draw() {
  // Don't touch the contents of the draw loop!
  // Instead, modify the guts of the drawMyDesign() function.
  myScaledCanvas.clear();
  myScaledCanvas.push();
  myScaledCanvas.scale(currentScale);
  drawMyDesign();
  myScaledCanvas.pop();
  image(myScaledCanvas, 0, 0); // Show on the main canvas
  noLoop();
}

// Scale up graphics before exporting
function exportHighResolution() {
  currentScale = outputScale; // High-Res Export
  myScaledCanvas = createGraphics(currentScale * DIM, currentScale * DIM);
  draw();
  save(myScaledCanvas, "highResImage", 'png');
  currentScale = 1; // Reset to default scale 1:1
  myScaledCanvas = createGraphics(DIM, DIM);
  draw();
}

function keyReleased() { if (key == 'e') exportHighResolution(); }
function mousePressed() { loop(); }

//=================================================================
function drawMyDesign() {
  // Draw your design in this function -- into the scaled canvas.
  // Notice how all drawing functions begin with "myScaledCanvas."
  
  myScaledCanvas.background("pink");
  for (var i = 0; i < 20; i++) {
    var px = random(0, width);
    var py = random(0, height);
    myScaledCanvas.circle(px, py, width * 0.15);
  }
}