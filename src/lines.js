import * as THREE from 'three'

let lines;

export function renderLines(scene) {
  const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
  const points = [
    new THREE.Vector3(-10, 0, 0),
    new THREE.Vector3(0, 10, 0),
    new THREE.Vector3(10, 0, 0),
  ];
  const geometry = new THREE.BufferGeometry().setFromPoints( points );
  lines = new THREE.Line( geometry, material );
  scene.add( lines );
}

export function animateLines() {
  lines.geometry.attributes.position.array[0] += 0.1;
  lines.geometry.attributes.position.array[4] += 0.1;
  lines.geometry.attributes.position.array[8] += 0.1;
  lines.geometry.attributes.position.needsUpdate = true;
}
