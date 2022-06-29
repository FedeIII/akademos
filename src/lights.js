import * as THREE from 'three'

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
