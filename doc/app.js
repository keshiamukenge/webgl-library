import 'regenerator-runtime/runtime.js';
import * as THREE from 'three';

import Experience from '../src/Experience/Experience';
import { shadersOptions } from '../src/Experience/effects/wavesEffect/wavesEffect';

const experience = new Experience(document.querySelector('canvas.webgl'), {
  activeOrbitControls: false,
  planeOptions: {
    widthSegments: 8,
    heightSegments: 8,
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
  loaderState: {
    startLoader: () => {},
    stopLoader: () => {},
  },
  actions: {
    onEnter: onEnter, 
    onLeave: onLeave,
    onMove: () => {},
    onScroll: () => {},
    onTimeRunning: onTimeRunning,
  }
});

function onEnter(intersect) {
  intersect.object.material.uniforms.uHover.value = intersect.uv;
  intersect.object.material.uniformsNeedUpdate = true;
}

function onLeave(intersect) {
  intersect.object.material.uniforms.uTime.value = 0.0;
  intersect.object.material.uniformsNeedUpdate = true;
}

function onTimeRunning() {
  experience.DOMImages.imageParameters;
  if(experience.DOMImages.imageParameters) {
    experience.DOMImages.imageParameters.forEach(imageParameter => {
      imageParameter.mesh.material.uniforms.uTime.value = experience.time.elapsed * 0.002;
    });
  }
}

console.log(experience);