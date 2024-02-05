export function rotate(v: number[], theta: number): number[] {
  return [
    v[0] * Math.cos(theta) - v[1] * Math.sin(theta),
    v[0] * Math.sin(theta) + v[1] * Math.cos(theta),
  ];
}

export function distance(point1: number[], point2: number[]) {
  const distanceX = point1[0] - point2[0];
  const distanceY = point1[1] - point2[1];
  return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
}
