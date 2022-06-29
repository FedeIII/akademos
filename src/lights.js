import * as THREE from 'three'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

export function renderAmbientLight(scene) {
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.AmbientLight(color, intensity);
  scene.add(light);
}

export function renderHemisphereLight(scene) {
  const skyColor = 0xB1E1FF;  // light blue
  const groundColor = 0xB97A20;  // brownish orange
  const intensity = 0.6;
  const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
  scene.add(light);
}

export function renderDirectionalLight(scene) {
  const color = 0xFFFFFF;
  const intensity = 0.2;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(0, 10, 0);
  light.target.position.set(-5, 0, 0);
  scene.add(light);
  scene.add(light.target);
}

export function renderPointLight(scene) {
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.PointLight(color, intensity);
  light.position.set(0, 10, 0);
  scene.add(light);
}

export function renderSpotLight(scene) {
  const color = 0xFFFFFF;
  const intensity = 1;
  const distance = 0.0;
  const angle = 45;
  const penumbra = 0;
  const decay = 1;
  const light = new THREE.SpotLight(
    color,
    intensity,
    distance,
    angle,
    penumbra,
    decay,
  );

  light.position.set(1, 5, 0);
  light.target.position.set(5, 0, 0);
  light.castShadow = false;

  // light.shadow.mapSize.width = 1024;
  // light.shadow.mapSize.height = 1024;

  // light.shadow.camera.near = 500;
  // light.shadow.camera.far = 4000;
  // light.shadow.camera.fov = 30;

  scene.add(light);
  scene.add(light.target);

  // const helper = new THREE.SpotLightHelper(light);
  // scene.add(helper);

  light.target.updateMatrixWorld();
  // helper.update();
}

export function renderRectAreaLight(scene) {
  RectAreaLightUniformsLib.init();

  const color1 = 0xFF0000;
  const intensity1 = 5;
  const width1 = 12;
  const height1 = 2;
  const light1 = new THREE.RectAreaLight(color1, intensity1, width1, height1);
  light1.position.set(-3, 3, -5);
  light1.rotation.z = THREE.MathUtils.degToRad(90);
  light1.rotation.y = THREE.MathUtils.degToRad(180);
  scene.add(light1);

  const color2 = 0x00FF00;
  const intensity2 = 5;
  const width2 = 12;
  const height2 = 2;
  const light2 = new THREE.RectAreaLight(color2, intensity2, width2, height2);
  light2.position.set(0, 3, -5);
  light2.rotation.z = THREE.MathUtils.degToRad(90);
  light2.rotation.y = THREE.MathUtils.degToRad(180);
  scene.add(light2);

  const color3 = 0x0000FF;
  const intensity3 = 5;
  const width3 = 12;
  const height3 = 2;
  const light3 = new THREE.RectAreaLight(color3, intensity3, width3, height3);
  light3.position.set(3, 3, -5);
  light3.rotation.z = THREE.MathUtils.degToRad(90);
  light3.rotation.y = THREE.MathUtils.degToRad(180);
  scene.add(light3);

  const helper1 = new RectAreaLightHelper(light1);
  const helper2 = new RectAreaLightHelper(light2);
  const helper3 = new RectAreaLightHelper(light3);
  
  scene.add(helper1);
  scene.add(helper2);
  scene.add(helper3);

  // light.add(helper1);
  // light.add(helper2);
  // light.add(helper3);
}
