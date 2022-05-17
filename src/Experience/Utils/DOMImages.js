import EventEmitter from './EventEmitter';

export default class DOMImages extends EventEmitter {
  constructor() {
    super();

    this.images = [
      ...document.querySelectorAll('img')
    ];

    this.addImage();
  }

  addImage() {
    if(this.images) {
      this.imagesParameters = this.images.map(image => {
        let bounds = image.getBoundingClientRect();
				
        return {
          image,
          top: bounds.top,
          left: bounds.left,
          width: bounds.width,
          height: bounds.height,
        };
      });
    }
  }
}