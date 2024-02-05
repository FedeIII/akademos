import { canvasEl } from "./canvas";

export function randomX(): number {
  return Math.random() * canvasEl.width;
}

export function randomY(): number {
  return Math.random() * canvasEl.height;
}

export function randomSpeed(): number {
  return Math.floor(Math.random() * 10 - 5);
}

export function randomColor(): string {
  const colors = [
    "#ffd152",
    "#ff7e57",
    "#c8fa64",
    "#64fadf",
    "#647dfa",
    "#cb64fa",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
