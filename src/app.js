import 'regenerator-runtime/runtime.js';
import * as THREE from 'three';
import gsap from 'gsap';

import Experience from './Experience/Experience';
import { shadersOptions } from './Experience/effects/hoverWaveEffect/hoverWaveEffect';

const experience = new Experience(document.querySelector('canvas.webgl'), {
  activeOrbitControls: false,
  planeOptions: {
    widthSegments: 10,
    heightSegments: 10,
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
    onEnter: onEnter, 
    onLeave: onLeave,
    onMove: () => {},
    onScroll: () => {},
    onTimeRunning: onTimeRunning,
  }
});

console.log(experience);

function onEnter(intersect) {
  gsap.to(intersect.object.material.uniforms.uHoverState, {
    duration: 1,
    value: 1.0,
    ease: 'power3.out'
  });
}

function onLeave(intersect) {
  gsap.to(intersect.object.material.uniforms.uHoverState, {
    duration: 1,
    value: 0.0,
    ease: 'power3.out'
  });
}

function onTimeRunning() {
  experience.DOMImages.imageParameters;
  if(experience.DOMImages.imageParameters) {
    experience.DOMImages.imageParameters.forEach(imageParameter => {
      imageParameter.mesh.material.uniforms.uTime.value = experience.time.elapsed * 0.002;
    });
  }
}