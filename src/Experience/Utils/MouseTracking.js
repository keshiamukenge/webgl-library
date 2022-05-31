import * as THREE from 'three';

import EventEmitter from './EventEmitter';

export default class MouseTracking extends EventEmitter {
  constructor(experience) {
    super();

    this.experience = experience;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.renderer = this.experience.renderer;

    this.setInstances();
    this.update();

    window.addEventListener('mousemove', (event) => {
      this.onMouseMove(event);

      this.trigger('mousemove');
    });
  }

  setInstances() {
    this.raycaster = new THREE.Raycaster();
    this.coordinates = new THREE.Vector2();
  }

  onMouseMove(event) {
    this.coordinates.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.coordinates.y = - (event.clientY / window.innerHeight) * 2 + 1;
  }

  update() {
    this.raycaster.setFromCamera(this.coordinates, this.camera.instance);
    this.intersects = this.raycaster.intersectObjects(this.scene.children);
	
    if(this.intersects.length>0) {
      this.trigger('mouseenter');
    }

    this.trigger('mouseleave');
  }
}