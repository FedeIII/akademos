import { distance } from "./geometry";

export const canvasEl = <HTMLCanvasElement>document.getElementById("canvas");
canvasEl.width = window.innerWidth;
canvasEl.height = window.innerHeight;
export const ctx = <CanvasRenderingContext2D>canvasEl.getContext("2d");

class Phys {
  update: (elapsed: number) => void;
  constructor(updateCb: (elapsed: number) => void, circle: Circle) {
    this.update = updateCb.bind(circle);
  }
}

export class Circle {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
  color: string;
  phys: Phys | null = null;

  constructor(
    x: number,
    y: number,
    radius: number,
    dx: number,
    dy: number,
    color: string
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
  }

  #draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fillStyle = this.color + "80";
    ctx.strokeStyle = this.color;
    ctx.fill();
    ctx.stroke();
  }

  distance(circle: Circle) {
    return distance([this.x, this.y], [circle.x, circle.y]);
  }

  setPhys(updateCb: (elapsed: number) => void): void {
    this.phys = new Phys(updateCb, this);
  }

  update(elapsed: number) {
    this.phys?.update(elapsed);
    this.#draw();
  }
}
