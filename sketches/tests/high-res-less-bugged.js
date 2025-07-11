// --- L-System Variables ---
let axiom = "F";
let sentence = axiom;
let len;
let angle;
let rules = [{ a: "F", b: "FF+[+F-F-F]-[-F+F+F]" }];
let generationCount = 0;

// --- Export Variables ---
let outputScale = 8;
let currentScale = 1;
let myScaledCanvas;
let canvas;
let DIM = 1024;

//=================================================================
function setup() {
  canvas = createCanvas(DIM, DIM);
  pixelDensity(1); 
  myScaledCanvas = createGraphics(DIM, DIM);
  myScaledCanvas.pixelDensity(1);

  angle = radians(25);
  len = height / Math.pow(2.5, generationCount); // initial length based on canvas height

  drawTurtle(myScaledCanvas); // Initial draw

  // Generate button only
  createButton("Generate").mousePressed(() => {
    generate();
    drawTurtle(myScaledCanvas);
  });
}

// --- Draw Loop (only used for export) ---
function draw() {
  myScaledCanvas.clear();
  myScaledCanvas.push();
  myScaledCanvas.scale(currentScale);
  drawMyDesign();
  myScaledCanvas.pop();
  image(myScaledCanvas, 0, 0);
  noLoop();
}

// --- High-Res Export on 'e' key ---
function keyReleased() {
  if (key === 'e') exportHighResolution();
}

function exportHighResolution() {
  currentScale = outputScale;
  myScaledCanvas = createGraphics(currentScale * DIM, currentScale * DIM);
  draw();
  save(myScaledCanvas, "highResImage", 'png');

  // Reset canvas
  currentScale = 1;
  myScaledCanvas = createGraphics(DIM, DIM);
  draw();
}

//=================================================================
// --- Draw L-System onto Graphics Buffer ---
function drawMyDesign() {
  drawTurtle(myScaledCanvas);
}

function drawTurtle(pg) {
  pg.background(51);
  pg.resetMatrix();
  pg.translate(pg.width / 2, pg.height * 0.95); // Lower center with margin
  pg.stroke(255, 100);

  for (let i = 0; i < sentence.length; ++i) {
    let current = sentence.charAt(i);
    if (current === "F") {
      pg.line(0, 0, 0, -len);
      pg.translate(0, -len);
    } else if (current === "+") {
      pg.rotate(angle);
    } else if (current === "-") {
      pg.rotate(-angle);
    } else if (current === "[") {
      pg.push();
    } else if (current === "]") {
      pg.pop();
    }
  }
}

//=================================================================
// --- L-System Sentence Generation ---
function generate() {
  generationCount++;
  len = myScaledCanvas.height / Math.pow(2.5, generationCount);

  let newSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for (let j = 0; j < rules.length; j++) {
      if (current === rules[j].a) {
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
}
