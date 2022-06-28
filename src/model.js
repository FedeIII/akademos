import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function renderModel(scene) {
  const loader = new GLTFLoader();
  loader.load(
    './models/DamagedHelmet/DamagedHelmet.glft',
    function (gltf) {
      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(error);
    },
  );
}
