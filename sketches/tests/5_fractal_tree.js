// Variables: F+-[]
// Axiom: F
// Rules: F -> FF+[+F-F-F]-[-F+F+F]

var axiom = "F";
var sentence = axiom;

var len = 200;
var angle;

var rules = [];
rules[0] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]"
}

function generate() {
  // Shrink the line by some scaling factor every time function is called
  len *= 0.5;
  var newSentence = "";

  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    var found = false;

    for (var j = 0; j < rules.length; j++) {
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

  createP(sentence);
  turtle();
}

function turtle() {
  background(51);
  resetMatrix(); // Required for no draw loop, this makes sure that the translations are always reset when this function is called
  translate(width / 2, height);
  stroke(255, 100);

  for (var i = 0; i < sentence.length; ++i) {
    var current = sentence.charAt(i);

    // Manually describe operations for each character in the alphabet
    if (current == "F") {
      line(0, 0, 0, -len); // Move the frame of reference to the end of the line just drawn
      translate(0, -len);
    } else if (current == "+") {
      rotate(angle);
    } else if (current == "-") {
      rotate(-angle);
    } else if (current == "[") {
      // Function in p5.js to save the transformation state. It creates a drawing group that contains it's own styles and transformations.
      push();
    } else if (current == "]") {
      // Encloses the drawing group that started with push()
      pop();
    }
  }
}

function saveSketch() {
  saveCanvas('fractal', 'png');
  console.log("Sketch saved!");
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  // createCanvas(1400, 600);
  background(51);

  angle = radians(25);

  createP(axiom);
  turtle();
  
  var generateButton = createButton("Generate");
  generateButton.mousePressed(generate);

  var saveButton = createButton("Save");
  saveButton.mousePressed(saveSketch);
}