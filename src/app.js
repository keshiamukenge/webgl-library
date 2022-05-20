import 'regenerator-runtime/runtime.js';
import * as THREE from 'three';

import Experience from './Experience/Experience';
import { shadersOptions } from './Experience/effects/rippleEffect/rippleEffect';

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
  isMoving: () => {
    console.log('moooove');
  },
  action: {
    onEnter: onEnter, 
    onLeave: onLeave,
    onMove: () => {},
    onScroll: () => {},
  }
});

console.log(experience);

function onEnter(intersect) {
  intersect.object.material.uniforms.uTime.value = experience.time.elapsed * 0.002;
  intersect.object.material.uniformsNeedUpdate = true;
}

function onLeave(intersect) {
  intersect.object.material.uniforms.uTime.value = 0.0;
  intersect.object.material.uniformsNeedUpdate = true;
}