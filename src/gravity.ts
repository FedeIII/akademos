import { Circle, canvasEl, ctx } from "./canvas";
import { randomColor, randomSpeed } from "./random";

const G = 0.3;
const Fr = 0.9;

const circles: Circle[] = [];

let start: number = -1;

window.addEventListener("click", function (event) {
  start = -1;
  const circle = new Circle(
    event.x,
    event.y,
    30,
    randomSpeed(),
    0,
    randomColor()
  );
  circle.setPhys(function (this: Circle, elapsed: number): void {
    const width = canvasEl.width;
    const height = canvasEl.height;

    if (this.x + this.radius >= width || this.x - this.radius <= 0) {
      this.dx = -(this.dx * Fr);
    }
    if (this.x + this.radius > width) {
      this.x = width - this.radius;
    }
    if (this.x - this.radius < 0) {
      this.x = this.radius;
    }
    if (this.y + this.radius >= height || this.y - this.radius <= 0) {
      this.dy = -(this.dy * Fr);
      this.dx = this.dx * Fr;
    }
    if (this.y + this.radius > height) {
      this.y = height - this.radius;
    }
    if (this.y - this.radius < 0) {
      this.y = this.radius;
    }
    this.dy += G;
    this.x += this.dx;
    this.y += this.dy;
  });
  circles.push(circle);
});

export default function animateGravity(timeStamp: number) {
  canvasEl.style.display = "block";
  if (start === -1) {
    start = timeStamp;
  }

  const elapsed = timeStamp - start;

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let circle of circles) {
    circle.update(elapsed);
  }

  requestAnimationFrame(animateGravity);
}
