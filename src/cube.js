import * as THREE from 'three'

let cube, cube2;

const loader = new THREE.TextureLoader();

export function renderCube(scene) {
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // cube = new THREE.Mesh(geometry, material);

  const cubeSize = 1;
  const cubeGeo = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
  const cubeMat = new THREE.MeshStandardMaterial({ color: '#8AC' });
  cube = new THREE.Mesh(cubeGeo, cubeMat);
  cube.castShadow = true;
  cube.receiveShadow = true;
  cube.position.set(0, cubeSize, 0);

  scene.add(cube);

  const cubeSize2 = 1;
  const cubeGeo2 = new THREE.BoxBufferGeometry(cubeSize2, cubeSize2, cubeSize2);
  const cubeMat2 = new THREE.MeshStandardMaterial({ color: '#8AC' });
  cube2 = new THREE.Mesh(cubeGeo2, cubeMat2);
  cube2.castShadow = true;
  cube2.receiveShadow = true;
  cube2.position.set(0.5, cubeSize2 + 2, 0.5);

  scene.add(cube2);
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
  if (cube) {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }

  if (cube2) {
    cube2.rotation.x += 0.01;
    cube2.rotation.y += 0.01;
  }
}
