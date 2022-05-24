import 'regenerator-runtime/runtime.js';
import * as THREE from 'three';

import EventEmitter from './EventEmitter';

export default class DOMImages extends EventEmitter {
  constructor(experience, { actions }) {
    super();

    this.experience = experience;
    this.time = this.experience.time;
    this.scroll = this.experience.scroll;
    this.resources = this.experience.resources;
    this.mouseTracking = this.experience.mouseTracking;
    this.mousePosition = {
      x: this.mouseTracking.coordinates.x,
      y: this.mouseTracking.coordinates.y,
    };

    this.isIntersected = false;
    this.images = [
      ...document.querySelectorAll('img')
    ];
    this.cameraOptions = {
      fov: 70,
      instance: {
        x: 1,
        y: 1,
        z: 600,
      },
      lookAt: new THREE.Vector3(),
    };

    this.rendererOptions = {
      alpha: true,
    };

    this.onScroll(actions.onScroll);
    this.onMouseMove(actions.onMove);
    this.onMouseEnter(actions.onEnter);
    this.onMouseLeave(actions.onLeave);
    this.onTick(actions.onTimeRunning);
  }

  onScroll(onScroll) {
    window.addEventListener('scroll', () => {
      this.trigger('scroll');
      onScroll();
    });
  }

  createPlane({ planeOptions, shaderOptions, uniformsOptions }) {
    this.imageParameters = this.images.map(image => {
      let bounds = image.getBoundingClientRect();
      this.geometry = new THREE.PlaneBufferGeometry(
        image.width,
        image.height,
        planeOptions.widthSegments,
        planeOptions.heightSegments
      );
      this.material = new THREE.ShaderMaterial({
        ...shaderOptions,
        side: THREE.DoubleSide,
        uniforms: {
          ...uniformsOptions,
          uMouse: {
            value: this.mousePosition
          },
          uTime: {
            value: 0.0
          },
          uHover: {
            value: new THREE.Vector2(0.5, 0.5),
          },
          uHoverState: {
            value: 1.0,
          },
        }
      });
      this.material.clone();
      this.material.uniforms = {
        ...this.material.uniforms,
        uTexture: {
          value: new THREE.TextureLoader().load(image.src),
        },
      };
      this.material.uniformsNeedUpdate = true;
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      
      this.experience.scene.add(this.mesh);

      return {
        image,
        mesh: this.mesh,
        top: bounds.top,
        left: bounds.left,
        width: bounds.width,
        height: bounds.height,
        hoverState: false,
      };
    });
  }

  setPlanePosition() {
    this.imageParameters.forEach(image => {
      image.mesh.position.y = this.currentScroll -image.top + this.experience.sizes.height / 2 - image.height / 2;
      image.mesh.position.x = image.left - this.experience.sizes.width / 2 + image.width / 2;
    });
  }

  onMouseMove(onMove) {
    this.mouseTracking.on('mousemove', () => {
      this.mousePosition = {
        x: this.mouseTracking.coordinates.x,
        y: this.mouseTracking.coordinates.y,
      };
      onMove();
    });
  }

  onMouseEnter(onEnter) {
    this.time.on('tick', () => {
      this.mouseTracking.intersects.forEach(intersect => {
        onEnter(intersect);
      });
    });
  }
  
  onMouseLeave(onLeave) {
    this.mouseTracking.on('mouseleave', () => {
      this.mouseTracking.intersects.forEach(intersect => {
        onLeave(intersect);
      });
    });
  }

  onTick(onTimeRunning) {
    this.time.on('tick', () => {
      onTimeRunning();
    });
  }

  updatePlanePosition() {
    this.currentScroll = 0;
    // this.currentScroll = window.scrollY;
    this.setPlanePosition();
  }

  update() {
    this.experience.camera.instance.fov = 2 * Math.atan((this.experience.sizes.height / 2) / 600 ) * (180 / Math.PI);
    this.scroll.render();
    this.currentScroll = this.scroll.scrollToRender;

    if(this.imageParameters) {
      this.setPlanePosition();
    }
  }
}