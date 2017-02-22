// Canvas dimensions
var cWidth, cHeight;

// Boundary
var boundsX, boundsY, boundsW, boundsH;

var bubbles = [];

var chue = 1;
var hueStep = 1;

function setup() {
  cWidth = windowWidth;
  cHeight = windowHeight;
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  bubbles = [];
  chue = 1;
  hueStep = 1;
}

// display new circles at where you click
function draw() {
  background(0);
  
  for(var i =0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }
  
  if (bubbles.length > 10000) {
    bubbles.splice(0, 1);
  }
  
}

function touchMoved () {
  var newHue = chue;
  bubbles.push(new Bubble(mouseX, mouseY, newHue));
  chue = chue + hueStep;
  if (chue === 255) {
    hueStep = -1; 
  }
  if (chue === 0) {
    hueStep = 1;
  }
  return false;
}

function mouseDragged () {
  var newHue = chue;
  bubbles.push(new Bubble(mouseX, mouseY, newHue));
  chue = chue + hueStep;
  if (chue === 255) {
    hueStep = -1; 
  }
  if (chue === 0) {
    hueStep = 1;
  }
}

function keyPressed() {
  bubbles.splice(0, 1);
}

function Bubble (x, y, newHue) {
  this.x = x;
  this.y = y;
  this.chue = newHue;
  
  this.move = function() {
    this.x += random(-0.5, 0.5);
    this.y += random(-0.5, 0.5);
  }
  
  this.display = function() {
    
    //fill(this.chue, 200, 200, 10);
    var h = map(this.x, 0, windowWidth, 0, 255);
    var ch;
    if (h > 180) { ch = h - 180; }
    else { ch = h + 180; }
    
    stroke(10, 10, 10, 10);
    fill(map(this.x, 0, windowWidth, 0, 255), 200, 200, 10);
    ellipse(this.x, this.y, 24, 24);
  }
}