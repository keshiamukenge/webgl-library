import * as THREE from 'three';

import Environment from './Environment';

export default class World {
  constructor(experience) {
    this.experience = experience;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    
    this.geometry = new THREE.PlaneBufferGeometry(1, 1);
    this.material = new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    
    this.scene.add(this.mesh);
    
    this.resources.on('loaded', () => {
      this.environment = new Environment(this.experience);
      this.material.map = this.resources.items.environmentMapTexture;
    });
  }
}