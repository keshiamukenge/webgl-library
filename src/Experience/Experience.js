import 'regenerator-runtime/runtime.js';
import * as THREE from 'three';

import { Sizes, Time, Resources, Debug } from './Utils/';
import Camera from './Camera';
import Renderer from './Renderer';
import World from './World/World';
import sources from './sources';

export default class Experience {
  constructor(canvas) {
    window.experience = this;

    this.canvas = canvas;

    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera(this);
    this.renderer = new Renderer(this);
    
    this.world = new World(this);
    
    this.debug = new Debug();

    this.sizes.on('resize', () => {
      this.resize();
    });

    this.time.on('tick', () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
  }
}