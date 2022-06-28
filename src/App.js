import * as THREE from 'three'
import React from 'react';

import { renderCube, animateCube } from './cube';
import { renderLines, animateLines } from './lines';

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderLines(scene);
renderCube(scene);

// CAMERA
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

function animate() {
  requestAnimationFrame(animate);

  // console.log(line.geometry.attributes.position.array);
  
  animateLines();
  animateCube();

  renderer.render(scene, camera);
}


function App() {
  animate();
  return <h1>Hello World From React-Rollup</h1>;
}

export default App;
