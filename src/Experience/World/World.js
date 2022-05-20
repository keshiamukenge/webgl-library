// import * as THREE from 'three';

import Plane from './Planes/Plane';

export default class World {
  constructor(experience) {
    this.experience = experience;
    this.plane = new Plane(this.experience);
  }
}