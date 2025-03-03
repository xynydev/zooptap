let arcSize;

let arcStart;
let arcStop;

let score = 0;
let newScore = score;

let ballTheta = 0;
const baseBallSpeed = 0.04;
let ballSpeed = baseBallSpeed;

function newArc() {
  arcStart = random(0, PI);
  arcStop = arcStart + random(0.5, HALF_PI);
}

function polar(r, theta) {
  let x = r * cos(theta);
  let y = r * sin(theta);
  return { x, y };
}

function mousePressed() {
  if (arcStart < ballTheta && ballTheta < arcStop) {
    newScore = score + floor(100 * (ballSpeed - baseBallSpeed)) + 1;
    localStorage.setItem(
      'highscore',
      Math.max(newScore, localStorage.getItem('highscore'))
    );
    document.querySelector('#score').innerText =
      localStorage.getItem('highscore');
    newArc();
    ballSpeed = 0.1;
  } else {
    newScore = 0;
  }
}

function setup() {
  arcSize = min(window.innerWidth - 100, window.innerHeight - 100, 500);
  createCanvas(window.innerWidth, window.innerHeight);
  newArc();
  document.querySelector('#score').innerText =
    localStorage.getItem('highscore');
}

function draw() {
  colorMode(HSL);

  if (newScore < score) background(0, 20, 90 - score * 5);
  else background(40, 10, 90);

  noFill();
  stroke(color(score * 2, 60, 50));
  strokeWeight(30);
  arc(width / 2, height / 2, arcSize, arcSize, arcStart, arcStop);

  let ballPos = polar(arcSize / 2, ballTheta);
  noStroke();
  fill(color(score * 2 + 300, 60, 60));
  circle(width / 2 + ballPos.x, height / 2 + ballPos.y, 30);

  fill(color(10, 10, 30));
  textSize(42);
  textAlign(CENTER, CENTER);
  if (frameCount % 3 == 0) {
    if (newScore > score) score++;
    else if (newScore < score) score -= ceil(score / 3);
  }
  text(score, width / 2, height / 2);

  ballTheta += ballSpeed;
  ballTheta = ballTheta % TWO_PI;
  ballSpeed = lerp(ballSpeed, baseBallSpeed, 0.05);
}
