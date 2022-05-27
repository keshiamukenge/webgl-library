import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import imagesLoaded from 'imagesloaded';

import EventEmitter from './EventEmitter';

export default class Resources extends EventEmitter {
  constructor(sources, loaderState) {
    super();

    this.sources = sources;

    this.items = {};
    this.toLoad = sources ? this.sources.length : null;
    this.loaded = 0;

    this.htmlImagesLength = 0;

    this.setLoaders();
    this.startLoading();
    this.startLoadingHtmlImages(loaderState.startLoader);
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  startLoading() {
    if(this.sources) {
      this.sources.forEach(source => {
        if(source.type === 'gltfModel') {
          this.loaders.gltfLoader.load(
            source.path,
            (file) => {
              this.sourceLoaded(source, file);
            }
          );
        } else if(source.type === 'texture') {
          this.loaders.textureLoader.load(
            source.path,
            (file) => {
              this.sourceLoaded(source, file);
            }
          );
        } else if(source.type === 'cubeTexture') {
          this.loaders.cubeTextureLoader.load(
            source.path,
            (file) => {
              this.sourceLoaded(source, file);
            }
          );
        }
      });
    }
  }

  startLoadingHtmlImages(startLoader) {
    startLoader();
    this.htmlImages = document.querySelectorAll('img');
    this.htmlImages.forEach(htmlImage => {
      const image = new Image();

      image.onload = this.onLoadingHtmlImages();
      image.src = htmlImage.src;
    });
  }

  onLoadingHtmlImages() {
    this.htmlImagesLength += 1;
  }

  onLoadedHtmlImages(isLoaded, stopLoader) {
    if(this.htmlImagesLength === this.htmlImages.length) {
      isLoaded();
      stopLoader();
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;

    this.loaded++;

    if(this.loaded === this.toLoad) {
      this.trigger('loaded');
    }
  }
}