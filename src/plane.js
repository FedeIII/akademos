import * as THREE from 'three'

export function renderPlane(scene) {
  const planeSize = 40;

  const loader = new THREE.TextureLoader();
  const texture = loader.load('images/checker.png');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.NearestFilter;
  const repeats = planeSize / 2;
  texture.repeat.set(repeats, repeats);

  const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
  const planeMat = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(planeGeo, planeMat);
  mesh.receiveShadow = true;
  mesh.rotation.x = Math.PI * -.5;
  scene.add(mesh);
}