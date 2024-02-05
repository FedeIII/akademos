import animateGravity from "./gravity";
import animateGas from "./gas";

const menu = <HTMLElement>document.getElementById("menu");
const gravity = <HTMLElement>document.getElementById("gravity");
const gas = <HTMLElement>document.getElementById("gas");

gravity.addEventListener("click", () => {
  menu.style.display = "none";
  animateGravity(0);
});

gas.addEventListener("click", () => {
  menu.style.display = "none";
  animateGas(0);
});
