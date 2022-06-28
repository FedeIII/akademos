import * as THREE from 'three'

let cube;

export function renderCube(scene) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
}

export function animateCube() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
}
