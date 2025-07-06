// Variables -> (a, b)
// Axiom -> A
// Ruleset: {
//    (A -> AB),
//    (B -> A)
// }

// Start out with our axiom
var axiom = "A";

// To model our ruleset, we can use JS objects
var rule1 = {
  a: "A", // Input
  b: "AB" // Output
}

var rule2 = {
  a: "B",
  b: "A"
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
