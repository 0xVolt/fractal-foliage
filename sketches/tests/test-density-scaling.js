const c = document.getElementById("C:\Users\deshi\Documents\Code\fractal-foliage\sketches\tests\test-density-scaling.js");
let canvas;
let _w = c.clientWidth;
let _h = c.clientHeight;

function setup() {
  canvas = createCanvas(_w, _h);
  canvas.parent(c);
  console.log("canvas created: w:", _w, " h:", _h);
  console.log("p5 width:", width, "p5 height:", height);
  pixelDensity(1);
}