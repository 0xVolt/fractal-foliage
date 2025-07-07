// Variables: F+-[]
// Axiom: F
// Rules: F -> FF+[+F-F-F]-[-F+F+F]

var axiom = "F";
var sentence = axiom;

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
}

function turtle() {
  for (var i = 0; i < sentence.length; ++i) {
    var current = sentence.charAt(i);

    if (current == "F") {
      line(0, 0, 0, -len);
    } else if (current == "+") {
      rotate(PI/6);
    }

  }
}

function setup() {
  createCanvas(400, 400);
  background(51);

  createP(axiom);
  
  var button = createButton("Generate!");
  button.mousePressed(generate);
}