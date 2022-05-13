import * as THREE from 'three';

import Environment from './Environment';

export default class World {
  constructor(experience) {
    this.experience = experience;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    const test = new THREE.Mesh(
      new THREE.BoxGeometry,
      new THREE.MeshStandardMaterial({
        color: 'red',
      })
    );
    this.scene.add(test);

    /* this.resources.on('ready', () => {
      console.log('finished loaded');
      this.environment = new Environment(this.experience);
    }); */
    this.environment = new Environment(this.experience);
  }
}