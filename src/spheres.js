import * as THREE from 'three';

const sphereShadowBases = [];

export function renderSpheres(scene) {
  const loader = new THREE.TextureLoader();
  const shadowTexture = loader.load('images/roundshadow.png');

  const sphereRadius = 1;
  const sphereWidthDivisions = 32;
  const sphereHeightDivisions = 16;
  const sphereGeo = new THREE.SphereBufferGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);

  const planeSize = 1;
  const shadowGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);

  const numSpheres = 15;
  for (let i = 0; i < numSpheres; ++i) {
    const base = new THREE.Object3D();
    scene.add(base);

    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });

    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.y = 0.001;
    shadowMesh.rotation.x = Math.PI * -.5;
    const shadowSize = sphereRadius * 4;
    shadowMesh.scale.set(shadowSize, shadowSize, shadowSize);
    base.add(shadowMesh);

    const u = i / numSpheres;   // goes from 0 to 1 as we iterate the spheres.
    const sphereMat = new THREE.MeshPhongMaterial();
    sphereMat.color.setHSL(u, 1, .75);
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereMesh.position.set(0, sphereRadius + 2, 0);
    base.add(sphereMesh);

    sphereShadowBases.push({
      base,
      sphereMesh,
      shadowMesh,
      y: sphereMesh.position.y,
    });
  }
}

export function animateSpheres(time) {
  time *= 0.001;

  sphereShadowBases.forEach((sphereShadowBase, ndx) => {
    const { base, sphereMesh, shadowMesh, y } = sphereShadowBase;

    // u is a value that goes from 0 to 1 as we iterate the spheres
    const u = ndx / sphereShadowBases.length;

    // compute a position for the base. This will move
    // both the sphere and its shadow
    const speed = time * .2;
    const angle = speed + u * Math.PI * 2 * (ndx % 1 ? 1 : -1);
    const radius = Math.sin(speed - ndx) * 10;
    base.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);

    // yOff is a value that goes from 0 to 1
    const yOff = Math.abs(Math.sin(time * 2 + ndx));
    // move the sphere up and down
    sphereMesh.position.y = y + THREE.MathUtils.lerp(-2, 2, yOff);
    // fade the shadow as the sphere goes up
    shadowMesh.material.opacity = THREE.MathUtils.lerp(1, .25, yOff);
  });
}