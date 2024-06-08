/**
 * @typedef { {x: number;y: number;} } Point
 */

const doubleClickDelay = 250;
/** @type { Point | undefined }*/
let previousPoint = undefined;
let previousTime = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cursor("pointer");
}

function draw() {
  clearCanvas();
  drawCorners();

  if (previousPoint) {
    stroke("#aaa");
    strokeWeight(2);
    line(previousPoint.x, previousPoint.y, mouseX, mouseY);
    strokeWeight(16);
    point(previousPoint.x, previousPoint.y);

    angleMode(DEGREES);
    const yDiff = mouseY - previousPoint.y;
    const xDiff = mouseX - previousPoint.x; // What if xDiff is 0?
    const atanAngle = ~~atan(yDiff / xDiff);
    const atan2Angle = ~~atan2(yDiff, xDiff);
    noStroke();
    fill("#fff");
    text(`atanAngle: ${atanAngle}`, 10, 30);
    text(`atan2Angle: ${atan2Angle}`, 10, 50);

    noStroke();
    arc(previousPoint.x, previousPoint.y, 200, 200, atan2Angle, 0);
  }

  strokeWeight(16);
  stroke("#fff");
  point(mouseX, mouseY);
}

function clearCanvas() {
  background("#000");
}

function drawCorners() {
  stroke("#800");
  strokeWeight(8);
  line(0, 0, 0, 20);
  line(0, 0, 20, 0);
  line(width, 0, width, 20);
  line(width, 0, width - 20, 0);
  line(0, height, 0, height - 20);
  line(0, height, 20, height);
  line(width, height, width, height - 20);
  line(width, height, width - 20, height);
}

function touchStarted() {
  const clickInterval = millis() - previousTime;
  if (!previousPoint || clickInterval < doubleClickDelay) {
    previousPoint = { x: mouseX, y: mouseY };
  } else {
    previousTime = millis();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
