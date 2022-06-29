import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FirstPersonControls } from './FirstPersonControls';

let controls;
const clock = new THREE.Clock();

export function useOrbitControls(camera, renderer) {
  controls = new OrbitControls(camera, renderer.domElement);
  updateControls();
}

export function useFirstPersonControls(camera, renderer) {
  controls = new FirstPersonControls(camera, renderer.domElement);
  controls.movementSpeed = 20;
  controls.lookSpeed = 0.5;
}

export function updateControls() {
  controls.update(clock.getDelta());
}
