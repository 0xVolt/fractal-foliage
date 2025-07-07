// Variables: F+-[]
// Axiom: F
// Rules: F -> FF+[+F-F-F]-[-F+F+F]

var axiom = "F";
var sentence = axiom;

var len = 100;

var rules = [];
rules[0] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]"
}

function generate() {
  var newSentence = "";

  for (var i = 0; i < sentence.length; ++i) {
    var current = sentence.charAt(i);
    var found = false;

    for (var j = 0; j < rules.length; ++j) {
      if (current = rules[j].a) {
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
  stroke(255);
  
  // Required since we don't use the draw loop, this makes sure that the translations are always reset when this function is called
  resetMatrix();
  translate(width / 2, height);

  for (var i = 0; i < sentence.length; ++i) {
    var current = sentence.charAt(i);

    // Manually describe operations for each character in the alphabet
    if (current == "F") {
      line(0, 0, 0, -len);
      // Move the frame of reference to the end of the line just drawn
      translate(0, -len);
    } else if (current == "+") {
      rotate(PI / 6);
    } else if (current == "-") {
      rotate(-PI / 6);
    } else if (current == "[") {
      // Function in p5.js to save the transformation state. It creates a drawing group that contains it's own styles and transformations.
      push();
    } else if (current == "]") {
      // Encloses the drawing group that started with push()
      pop();
    }

  }
}

function setup() {
  createCanvas(600, 600);
  background(51);

  createP(axiom);
  turtle();
  
  var button = createButton("Generate!");
  button.mousePressed(generate);
}