import * as THREE from 'three'
import React from 'react';

import { renderCube, animateCube } from './cube';
import { renderLines, animateLines } from './lines';
import { renderModel } from './model';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// renderLines(scene);
// renderCube(scene);
renderModel(scene);

// CAMERA
const camera = new THREE.PerspectiveCamera(
  1,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);


const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

function animate() {
  requestAnimationFrame(animate);
  controls.update()

  // console.log(line.geometry.attributes.position.array);

  // animateLines();
  // animateCube();

  renderer.render(scene, camera);
}


function App() {
  animate();
  return <div id="info"></div>;
}

export default App;
