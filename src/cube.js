import * as THREE from 'three'

let cube;

const loader = new THREE.TextureLoader();

export function renderCube(scene) {
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // cube = new THREE.Mesh(geometry, material);

  const cubeSize = 4;
  const cubeGeo = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
  const cubeMat = new THREE.MeshStandardMaterial({ color: '#8AC' });
  const mesh = new THREE.Mesh(cubeGeo, cubeMat);
  mesh.position.set(cubeSize + 1, cubeSize / 2, 0);

  scene.add(mesh);
}

export function renderTextureCube(scene) {
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshBasicMaterial({
  //   map: loader.load('images/wall.jpg'),
  // });
  // cube = new THREE.Mesh(geometry, material);
  // cube.position.x = -1;
  // cube.position.y = 1;

  const cubeSize = 1;
  const cubeGeo = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
  // const cubeMat = new THREE.MeshStandardMaterial({
  //   map: loader.load('images/wall.jpg'),
  // });
  // cube = new THREE.Mesh(cubeGeo, cubeMat);
  const materials = [
    new THREE.MeshStandardMaterial({ map: loader.load('images/flower-1.jpg') }),
    new THREE.MeshStandardMaterial({ map: loader.load('images/flower-2.jpg') }),
    new THREE.MeshStandardMaterial({ map: loader.load('images/flower-3.jpg') }),
    new THREE.MeshStandardMaterial({ map: loader.load('images/flower-4.jpg') }),
    new THREE.MeshStandardMaterial({ map: loader.load('images/flower-5.jpg') }),
    new THREE.MeshStandardMaterial({ map: loader.load('images/flower-6.jpg') }),
  ];
  cube = new THREE.Mesh(cubeGeo, materials);
  cube.position.set(0, cubeSize, 0);

  scene.add(cube);
}

export function animateCube() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
}
