import 'regenerator-runtime/runtime.js';
import * as THREE from 'three';

import Experience from './Experience/Experience';
import { shadersOptions } from './Experience/effects/revealImageEffect/revealImageEffect';

const experience = new Experience(document.querySelector('canvas.webgl'), {
  activeOrbitControls: false,
  planeOptions: {
    widthSegments: 16,
    heightSegments: 16,
  },
  shaderOptions: {
    vertexShader: shadersOptions.vertex,
    fragmentShader: shadersOptions.fragment,
  },
  cameraOptions: {
    fov: 70,
    instance: {
      x: 1,
      y: 1,
      z: 600,
    },
    lookAt: new THREE.Vector3(),
  },
  rendererOptions: {
    alpha: true,
  },
  actions: {
    onEnter: () => {}, 
    onLeave: () => {},
    onMove: () => {},
    onScroll: () => {},
    onTimeRunning: onTimeRunning,
  }
});

console.log(experience);

function onTimeRunning() {
  experience.DOMImages.imageParameters;
  if(experience.DOMImages.imageParameters) {
    experience.DOMImages.imageParameters.forEach(imageParameter => {
      imageParameter.mesh.material.uniforms.uTime.value = experience.time.elapsed * 0.002;
    });
  }
}