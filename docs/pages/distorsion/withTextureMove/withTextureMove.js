import 'regenerator-runtime/runtime.js';
import * as THREE from 'three';
import gsap from 'gsap';
import { Power4 } from 'gsap';

import Experience from '../../../../src/Experience/Experience';
import { shadersOptions } from '../../../../src/Experience/effects/distorsionEffect/moveTextureDistorsion/moveTextureDistorsionEffect';

const experience = new Experience(document.querySelector('canvas.webgl'), {
  activeOrbitControls: false,
  planeOptions: {
    widthSegments: 8,
    heightSegments: 8,
  },
  shaderOptions: {
    vertexShader: shadersOptions.vertex,
    fragmentShader: shadersOptions.fragment,
    transparent: true,
  },
  uniformsOptions: {
    uOffset: {
      value: new THREE.Vector2(0.0, 0.0)
    },
    uAlpha: {
      value: 0.0
    }
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
    onEnter: () => {}, 
    onLeave: () => {},
    onMove: () => onMove(),
    onScroll: () => {},
    onTimeRunning: () => {},
  }
});

const options = {
  strength: 0.25,
};

const position = new THREE.Vector3(0, 0, 0);
const title = document.querySelector('h4');

function onHovered() {
  title.addEventListener('mouseenter', () => {
    gsap.to(experience.DOMImages.imageParameters[0].mesh.material.uniforms.uAlpha, 0.5, {
      value: 1.0,
      ease: Power4.easeOut
    });
  });
}

onHovered();

function onLeave() {
  title.addEventListener('mouseleave', () => {
    gsap.to(experience.DOMImages.imageParameters[0].mesh.material.uniforms.uAlpha, 0.5, {
      value: 0.0,
      ease: Power4.easeOut
    });
  });
}

onLeave();

function onMove() {
  let x = experience.mouseTracking.coordinates.x.map(
    -1,
    1,
    - experience.sizes.width / 2,
    experience.sizes.width / 2
  );

  let y = experience.mouseTracking.coordinates.y.map(
    -1,
    1,
    -experience.sizes.height / 2,
    experience.sizes.height / 2
  );
    
  position.set(x, y, 0);
  gsap.to(experience.DOMImages.imageParameters[0].mesh.position, 1, {
    x: x,
    y: y,
    ease: Power4.easeOut,
    onUpdate: () => onPositionUpdate(),
  });
}

function onPositionUpdate() {
  let offset = experience.DOMImages.imageParameters[0].mesh.position
    .clone()
    .sub(position)
    .multiplyScalar(-options.strength);
  experience.DOMImages.imageParameters[0].mesh.material.uniforms.uOffset.value = offset;
}


// mappage des coordonnées pour deplacement dans la scene 3d
Number.prototype.map = function(in_min, in_max, out_min, out_max) {
  return ((this - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

console.log(experience);