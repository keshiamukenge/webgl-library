import 'regenerator-runtime/runtime.js';

import Experience from './Experience/Experience';
import { DOMImages } from './Experience/Utils';

const DOMImagesOptions = new DOMImages();

const experience = new Experience(document.querySelector('canvas.webgl'), {
  activeOrbitControls: false,
  cameraOptions: DOMImagesOptions.cameraOptions,
  rendererOptions: DOMImagesOptions.rendererOptions
});

console.log(experience);