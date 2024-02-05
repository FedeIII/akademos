import { Circle, canvasEl, ctx } from "./canvas";
import { rotate } from "./geometry";
import { randomColor, randomSpeed, randomX, randomY } from "./random";

const NUMBER_OF_CIRCLES = 2;

const circles: Circle[] = [];

let start: number = -1;

function updatePhysCb(this: Circle) {
  const width = canvasEl.width;
  const height = canvasEl.height;

  for (let circle of circles) {
    if (this.distance(circle) < this.radius + circle.radius) {
      const relativeVelocity = [this.dx - circle.dx, this.dy - circle.dy];
      const relativePosition = [circle.x - this.x, circle.y - this.y];
      const dotProduct =
        relativeVelocity[0] * relativePosition[0] +
        relativeVelocity[1] * relativePosition[1];
      if (dotProduct >= 0) {
        const angleOfContact = -Math.atan2(
          relativePosition[1],
          relativePosition[0]
        );
        const rotatedThisVelocity = rotate([this.dx, this.dy], angleOfContact);
        const rotatedCircleVelocity = rotate(
          [circle.dx, circle.dy],
          angleOfContact
        );
        const thisVelocityAfterCollision = rotate(
          [rotatedCircleVelocity[0], rotatedThisVelocity[1]],
          -angleOfContact
        );
        const circleVelocityAfterCollision = rotate(
          [rotatedThisVelocity[0], rotatedCircleVelocity[1]],
          -angleOfContact
        );

        this.dx = thisVelocityAfterCollision[0];
        this.dy = thisVelocityAfterCollision[1];
        circle.dx = circleVelocityAfterCollision[0];
        circle.dy = circleVelocityAfterCollision[1];
      }
    }
  }

  const other = <Circle>circles.find((c) => c !== this);
  const futureX = this.x + this.dx;
  const futureY = this.y + this.dy;
  if (
    Math.sqrt((futureX - other.x) ** 2 + (futureY - other.y) ** 2) <
    this.radius + other.radius
  ) {
    const otherDx = other.dx;
    const otherDy = other.dy;

    const angleOfContact = Math.acos(
      (other.x - this.x) /
        Math.sqrt((other.x - this.x) ** 2 + (other.y - this.y) ** 2)
    );

    const otherAngle = Math.acos(
      otherDx / Math.sqrt(otherDx ** 2 + otherDy ** 2)
    );

    const thisAngle = Math.acos(
      this.dx / Math.sqrt(this.dx ** 2 + this.dy ** 2)
    );

    const thisDFactor1 =
      Math.cos(thisAngle - angleOfContact) * Math.cos(angleOfContact);

    const otherDFactor1 = Math.sin(otherAngle - angleOfContact);

    other.dx = thisDFactor1 * this.dx + otherDFactor1 * otherDx;
    other.dy = thisDFactor1 * this.dy + otherDFactor1 * otherDy;

    const thisDFactor2 =
      Math.cos(otherAngle - angleOfContact) * Math.cos(angleOfContact);

    const otherDFactor2 = Math.sin(thisAngle - angleOfContact);

    this.dx = thisDFactor2 * otherDx + otherDFactor2 * this.dx;
    this.dy = thisDFactor2 * otherDy + otherDFactor2 * this.dy;
  }

  if (this.x + this.radius >= width || this.x - this.radius <= 0) {
    this.dx = -this.dx;
  }
  if (this.x + this.radius > width) {
    this.x = width - this.radius;
  }
  if (this.x - this.radius < 0) {
    this.x = this.radius;
  }
  if (this.y + this.radius >= height || this.y - this.radius <= 0) {
    this.dy = -this.dy;
  }
  if (this.y + this.radius > height) {
    this.y = height - this.radius;
  }
  if (this.y - this.radius < 0) {
    this.y = this.radius;
  }

  this.x += this.dx;
  this.y += this.dy;
}

function init(): void {
  start = -1;

  for (let i of Array(NUMBER_OF_CIRCLES)) {
    const circle = new Circle(
      randomX(),
      randomY(),
      50,
      randomSpeed(),
      randomSpeed(),
      randomColor()
    );
    circle.setPhys(updatePhysCb);
    circles.push(circle);
  }
}

export default function animateGas(timeStamp: number) {
  canvasEl.style.display = "block";
  if (start === -1) {
    start = timeStamp;
  }

  const elapsed = timeStamp - start;

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let circle of circles) {
    circle.update(elapsed);
  }

  requestAnimationFrame(animateGas);
}

init();
