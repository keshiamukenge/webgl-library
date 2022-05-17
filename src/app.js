import 'regenerator-runtime/runtime.js';
import * as THREE from 'three';

import Experience from './Experience/Experience';

const geometry = new THREE.PlaneBufferGeometry(0.4, 0.6, 16, 16);
const material = new THREE.MeshBasicMaterial({ color: 'red'});
const mesh = new THREE.Mesh(geometry, material);

const experience = new Experience(document.querySelector('canvas.webgl'), {
  activeOrbitControls: true,
  cameraOptions: {
    fov: 50,
    instance: {
      x: 0,
      y: 0,
      z: 1,
    },
    lookAt: mesh.position
  },
  rendererOptions: {
    alpha: true,
  }
});

experience.scene.add(mesh);