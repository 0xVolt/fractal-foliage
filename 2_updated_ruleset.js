// Variables -> (a, b)
// Axiom -> A
// Ruleset: {
//    (A -> AB),
//    (B -> A)
// }

// Start out with our axiom
var axiom = "A";
var sentence = axiom;

// Creating an array of objects to store our ruleset
var rules = [];

rules[0] = {
  a: "A", // Input
  b: "AB" // Output
} 

rules[1] = {
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
    
    for (var j = 0; j < rules.length; ++j) {
      if (current = rules[j].a) {
        nextSentence += rules[j].b;
        break;
      }
    }
  }

  // Update the old sentence
  sentence = nextSentence;

  // Render the sentence as a paragraph element
  createP(sentence);
}

function setup() {
  noCanvas();

  // Creates a paragraph element with the characters in axiom/sentence
  createP(axiom);

  // Create button to let the user walk through the generations of string changes
  var button = createButton("Generate!")
  button.mousePressed(generate);
}