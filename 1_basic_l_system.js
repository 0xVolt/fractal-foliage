// Variables -> (a, b)
// Axiom -> A
// Ruleset: {
//    (A -> AB),
//    (B -> A)
// }

// Start out with our axiom
var axiom = "A";
var sentence = axiom;

// To model our ruleset, we can use JS objects
var rule1 = {
  a: "A", // Input
  b: "AB" // Output
}

var rule2 = {
  a: "B",
  b: "A"
}

function generate() {
  // Initialize new string as empty
  var nextSentence = "";
  
  // Loop through every character in the sentence
  // Let's go! First for loop in over a year!
  for (var i = 0; i < sentence.length; ++i) {
    var current = sentence.charAt(i);

    // If the character matches one of the rules, do this...
    if (current == rule1.a) {
      nextSentence += rule1.b;
    } else if (current == rule2.a) {
      nextSentence += rule2.b;
    } else {
      nextSentence += current;
    }
  }
}

function setup() {
  noCanvas();

  // Creates a paragraph element with the characters in axiom
  createP(axiom);
}