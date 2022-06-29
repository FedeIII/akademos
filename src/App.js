import * as THREE from 'three'
import React from 'react';

import { renderCube, renderTextureCube, animateCube } from './cube';
import { renderLines, animateLines } from './lines';
import { renderModel } from './model';
import { renderPlane } from './plane';
import {
  renderAmbientLight,
  renderHemisphereLight,
  renderDirectionalLight,
  renderPointLight,
  renderSpotLight,
  renderRectAreaLight,
} from './lights';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { animateSpheres, renderSpheres } from './spheres';

const scene = new THREE.Scene();
scene.background = new THREE.Color('white');

const renderer = new THREE.WebGLRenderer();
renderer.physicallyCorrectLights = true;
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// renderLines(scene);
renderCube(scene);
renderPlane(scene);
// renderModel(scene);
// renderTextureCube(scene);
// renderSpheres(scene)

// renderAmbientLight(scene);
renderHemisphereLight(scene);
renderDirectionalLight(scene);
// renderPointLight(scene);
// renderSpotLight(scene);
// renderRectAreaLight(scene);

// CAMERA
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 10, 20);
camera.lookAt(0, 0, 0);


const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

function animate(time) {
  requestAnimationFrame(animate);
  controls.update()

  // console.log(line.geometry.attributes.position.array);

  // animateLines();
  animateCube();
  // animateCube();
  // animateSpheres(time);

  renderer.render(scene, camera);
}


function App() {
  animate();
  return <div id="info"></div>;
}

export default App;
