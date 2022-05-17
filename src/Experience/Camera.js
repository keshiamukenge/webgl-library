import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera {
  constructor(experience, { activeOrbitControls, cameraOptions }) {
    this.experience = experience;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setInstance({ cameraOptions });

    if(activeOrbitControls) {
      this.setOrbitcontrols();
    }

    this.resize();
  }

  setInstance({ cameraOptions }) {
    this.instance = new THREE.PerspectiveCamera(
      cameraOptions.fov,
      this.sizes.width / this.sizes.height,
      0.1,
      100,
    );
    this.instance.position.set(cameraOptions?.instance?.x, cameraOptions?.instance?.y, cameraOptions?.instance?.z);
    if(cameraOptions.lookAt) {
      this.instance.lookAt(cameraOptions.lookAt);
    }
    this.scene.add(this.instance);
  }

  setOrbitcontrols() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}