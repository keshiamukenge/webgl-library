import * as THREE from 'three';

import vertex from './shaders/vertex.glsl';
import fragment from './shaders/fragment.glsl';

export default class Plane {
  constructor(experience) {
    this.experience = experience;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.mouseTracking = this.experience.mouseTracking;
    this.time = this.experience.time;
    this.resources = this.experience.resources;
    this.mousePosition = {
      x: this.mouseTracking.coordinates.x,
      y: this.mouseTracking.coordinates.y,
    };
    
    this.isIntersected = false;
    
    this.resources.on('loaded', () => {
      console.log('is loaded', this.resources.items.poire);
      this.geometry = new THREE.PlaneBufferGeometry(0.4, 0.6, 16, 16);
      this.count = this.geometry.attributes.position.count;
      this.random = new Float32Array(this.count);
      
      for(let i = 0; i < this.count; i++) {
        this.random[i] = Math.random();
      }
      
      this.geometry.setAttribute('aRandom', new THREE.BufferAttribute(this.random, 1));
      
      this.material = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: {
          uTexture: {
            value: this.resources.items.poire
          },
          uMouse: {
            value: this.mousePosition
          },
          uTime: {
            value: 0.0
          },
          uIsIntersected: {
            value: true
          }
        }
      });
      this.plane = new THREE.Mesh(this.geometry, this.material);
      
      this.scene.add(this.plane);
      this.onMouseMove();
      this.updateTime();
    });
  }

  checkIsIntersected() {
    if(this.mouseTracking.intersects.length === 0) {
      this.isIntersected = this.material.uniforms.uIsIntersected.value = false;
    } else {
      this.isIntersected = this.material.uniforms.uIsIntersected.value = true;
    }
  }

  onMouseMove() {
    this.mouseTracking.on('mousemove', () => {
      this.mousePosition = {
        x: this.mouseTracking.coordinates.x,
        y: this.mouseTracking.coordinates.y,
      };
      this.material.uniforms.uMouse.value.x = this.mousePosition.x;
      this.material.uniforms.uMouse.value.y = this.mousePosition.y;

      this.checkIsIntersected();
    });
  }

  onMouseEnter() {
    this.mouseTracking.on('mouseenter', () => {
      this.updateTime();
    });
  }

  onMouseLeave() {
    console.log('is out');
  }


  updateTime() {
    this.time.on('tick', () => {
      if(this.isIntersected) {
        this.material.uniforms.uTime.value = this.time.elapsed * 0.001;
        this.material.uniformsNeedUpdate = true;
      }

      return;
    });
  }
}