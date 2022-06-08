import 'regenerator-runtime/runtime.js';
import * as THREE from 'three';

import brush from './brush.png';

export default class BackgroundTexture {
  constructor(experience) {
    this.experience = experience;

    this.scene = new THREE.Scene();

    this.frustumSize = experience.sizes.height;
    this.aspect = experience.sizes.width / experience.sizes.height;

    this.max = 50;
    // const geometry = new THREE.PlaneBufferGeometry(40, 40, 1, 1);
    this.geometryFullScreen = new THREE.PlaneBufferGeometry(this.experience.sizes.width, this.experience.sizes.height, 1, 1);
    this.meshes = [];

    this.prevMousePosition = new THREE.Vector2(0, 0);

    this.currentWave = 0;

    this.setRenderer();
    this.setCamera();
    this.setMaterial();
    this.createMeshes();
  }
  
  setRenderer() {
    this.renderer = new THREE.WebGLRenderTarget(this.experience.sizes.height, this.experience.sizes.width, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat
    });
  }
  
  setCamera() {
    this.camera = new THREE.OrthographicCamera(this.frustumSize * this.aspect / -2, this.frustumSize * this.aspect / 2, this.frustumSize / 2, this.frustumSize / -2, -1000, 1000);
  }

  setMaterial() {
    this.material =  new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(brush),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false
    });
  }

  createMeshes() {
    for(let i = 0; i < this.max; i++) {
      let quad = new THREE.Mesh(
        this.geometryFullScreen, this.material,
      );
			
      quad.rotation.z = 2 * Math.PI * Math.random();
      this.scene.add(quad);
      this.meshes.push(quad);
    }
  }

  updateMeshes() {
    this.experience.DOMImages.imageParameters[0].mesh.material.uniformsNeedUpdate = true;
    this.meshes.forEach(mesh => {
      if(mesh.visible) {
        mesh.rotation.z += 0.02;
        mesh.material.opacity *= 0.96;
        mesh.scale.x = 0.98 * mesh.scale.x + 0.1;
        mesh.scale.y = 0.98 * mesh.scale.y + 0.1;
		
        if(mesh.material.opacity < 0.02) {
          mesh.visible = false;
        }
      }
    });
  }

  setNewWave(x, y, id) {
    let mesh = this.meshes[id];
    mesh.visible = true;
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.scale.x = mesh.scale.y = 1;
    mesh.material.opacity = 1;
  }

  trackMousePosition() {
    if(Math.abs(this.experience.mouseTracking.coordinates.x - this.prevMousePosition.x) < 4 && Math.abs(this.experience.mouseTracking.coordinates.y - this.prevMousePosition.y) < 4) {
      //nothing
    } else {
      this.setNewWave(this.experience.mouseTracking.coordinates.x, this.experience.mouseTracking.coordinates.y, this.currentWave);
      this.currentWave = (this.currentWave + 1) % this.max;
    }
	
    this.prevMousePosition.x = this.experience.mouseTracking.coordinates.x;
    this.prevMousePosition.y = this.experience.mouseTracking.coordinates.y;
  }
}





/*
const newScene = new THREE.Scene();
experience.camera.instance = new THREE.WebGLRenderTarget(experience.sizes.height, experience.sizes.width, {
  minFilter: THREE.LinearFilter,
  magFilter: THREE.LinearFilter,
  format: THREE.RGBAFormat
});

const frustumSize = experience.sizes.height;
const aspect = experience.sizes.width / experience.sizes.height;

experience.camera.instance = new THREE.OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, -1000, 1000);
 */