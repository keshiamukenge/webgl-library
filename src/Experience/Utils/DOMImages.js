import * as THREE from 'three';

import EventEmitter from './EventEmitter';

export default class DOMImages extends EventEmitter {
  constructor(experience) {
    super();

    this.experience = experience;

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

    this.onScroll();
  }

  onScroll() {
    window.addEventListener('scroll', () => {
      this.trigger('scroll');
    });
  }

  createPlane() {
    this.imageParameters = this.images.map(image => {
      let bounds = image.getBoundingClientRect();
      this.geometry = new THREE.PlaneBufferGeometry(image.width, image.height, 1, 1);
      this.texture = new THREE.Texture(image);
      this.texture.needsUpdate = true;
      this.material = new THREE.MeshBasicMaterial({ map: this.texture });
      this.mesh = new THREE.Mesh(this.geometry, this.material);

      this.experience.scene.add(this.mesh);

      return {
        image,
        mesh: this.mesh,
        top: bounds.top,
        left: bounds.left,
        width: bounds.width,
        height: bounds.height,
      };
    });
  }

  setPlanePosition() {
    this.imageParameters.forEach(image => {
      image.mesh.position.y = this.currentScroll -image.top + this.experience.sizes.height / 2 - image.height / 2;
      image.mesh.position.x = image.left - this.experience.sizes.width / 2 + image.width / 2;
    });
  }

  updatePlanePosition() {
    this.currentScroll = 0;
    this.currentScroll = window.scrollY;
    this.setPlanePosition();
  }

  update() {
    this.experience.camera.instance.fov = 2 * Math.atan((this.experience.sizes.height / 2) / 600 ) * (180 / Math.PI);
  }
}