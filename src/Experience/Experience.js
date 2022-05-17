import 'regenerator-runtime/runtime.js';
import * as THREE from 'three';

import { Sizes, Time, Resources, MouseTracking, DOMImages, Debug } from './Utils/';
import Camera from './Camera';
import Renderer from './Renderer';
import sources from './sources';

export default class Experience {
  constructor(canvas, { cameraOptions, activeOrbitControls, rendererOptions }) {
    window.experience = this;

    this.canvas = canvas;

    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera(this, {
      activeOrbitControls,
      cameraOptions
    });
    this.renderer = new Renderer(this, {
      rendererOptions,
    });
    this.DOMImages = new DOMImages(this);
    this.mouseTracking = new MouseTracking(this);
    
    this.debug = new Debug();
    
    this.sizes.on('resize', () => {
      this.resize();
    });
    
    this.time.on('tick', () => {
      this.update();
    });


    this.resources.on('loaded', () => {
      this.DOMImages.createPlane();
      this.DOMImages.setPlanePosition();
    });

    this.DOMImages.on('scroll', () => {
      this.DOMImages.updatePlanePosition();
    });
  }
  
  resize() {
    this.camera.resize();
    this.renderer.resize();
    this.DOMImages.setPlanePosition();
  }

  update(activeOrbitControls) {
    this.camera.update(activeOrbitControls);
    this.renderer.update();
    this.mouseTracking.update();
    this.DOMImages.update();
  }
}