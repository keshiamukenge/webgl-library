# ✨ WEBGL LIBRARY ✨
---

<p>The purpose of this library is to be able to simply reuse effects created in webgl. This library is based on the amazing
	<a href="https://threejs.org/">Threejs library</a>
</p>
<ul>
	<li>
		<a href="#title-installation">Installation</a>
	</li>
	<li>
		<a href="#title-structure">Project structure</a>
	</li>
	<li>
		<a href="#title-use">How to use it ?</a>
	</li>
	<li>
		<a href="#title-uniforms">The uniforms</a>
	</li>
	<li>
		<a href="#title-effects">The effects</a>
	</li>
</ul>

<h2 id="title-installation">Installation</h2>

```
npm install webgl-three-library
```

<h2 id="title-structure">Project structure</h2>

- ``src``
  - ``Utils``
    - ``Time.js``
    - ``Size.js``
    - ``MouseTracking.js``
    - ``index.js``
    - ``DOMImages.js``
    - ``Ressources.js``
    - ``Scroll.js``
  - ``effects``
    - ``Effect``
      - ``shaders``
        - ``fragment.glsl``
        - ``vertex.glsl``
      - `effect.js`
    - ``...``
    - ``Camera.js``
    - ``Experience.js``
    - ``Renderer.js``

<h2 id="title-use">How to use it ?</h2>

### 1. Instanciate main class

Create `<canvas class="webgl"></canvas>` on your html.
Instantiate the Experience class which gathers all the classes of the library.

```
new Experience(document.querySelector('canvas.webgl'), { parameters });
```

It takes different parameters :

| Parameter | Value |  | Description |
| ----------- | ----------- | ----------- | ----------- |
| `activeOrbitControls` | `bool` | `required` | Active Three.js OrbitControls |
| `planeOptions.widthSegments`   | `number` | `required` | Refer to <a href="https://threejs.org/">threejs</a> documentation |
| `planeOptions.heightSegments`   | `number` | `required` | Refer to <a href="https://threejs.org/">threejs</a> documentation |
| `uniformsOptions`   | `object` | `not required` | For add uniforms. Refer to <a href="https://threejs.org/">threejs</a> documentation |
| `shaderOptions.vertexShader`   | `vertex.glsl` | `required` | Can import the ``vertex shader`` from ``effects`` folder |
| `shaderOptions.fragmentShader`   | `fragment.glsl` | `required` | Can import the ``fragment shader`` from ``effects`` folder |
| `cameraOptions.fov`   | `number` | `required` | Refer to <a href="https://threejs.org/">threejs</a> documentation |
| `cameraOptions.instance.x`   | `number` | `not required` | Refer to <a href="https://threejs.org/">threejs</a> documentation |
| `cameraOptions.instance.y` | `number` | `not required` | Refer to <a href="https://threejs.org/">threejs</a> documentation |
| `cameraOptions.instance.z` | `number` | `not required` | Refer to <a href="https://threejs.org/">threejs</a> documentation |
| `cameraOptions.lookat` | `Threejs instance`| `not required` | Refer to threejs documentation. By default can put ``new THREE.Vector3()`` |
| `rendererOptions` | `object` | `not required` | Refer to <a href="https://threejs.org/">threejs</a> documentation. |
| `actions.onEnter` | `func` | `required` | Function executed when the mouse enter the planes. The ``intersect`` parameter allows to access the intersected plane |
| `actions.onLeave` | `func` | `required` | Function executed when the mouse leave the planes. The ``intersect`` parameter allows to access the intersected plane |
| `actions.onMove` | `func` | `required` | Function executed when the mouse moves on the window |
| `actions.onScroll` | `func` | `required` | Function executed on scroll |
| `loaderState.startLoader` | `func` | `required` | Function executed on html images start loading |
| `loaderState.stopLoader` | `func` | `required` | Function executed on html images finish loading |

### 2. Insert images

Create `./static` folder for all images

<h2 id="title-uniforms">The uniforms</h2>

```
uMouse: {
  value: this.mousePosition // get mouse coordinates in 3D renderer (x, y)
},
uTime: {
  value: 0.0 // get time
},
uHover: {
  value: new THREE.Vector2(0.5, 0.5) // get hover centered position
},
uHoverState: {
  value: 1.0 // 1 if is not hovered and 0 if is hovered
}
```

<h2 id="title-effects">The effects</h2>

### How to implement effect ?

To use each effect, use fragments shader and vertex shader from the `effects/effect.js` :

```
import { shadersOptions } from '../src/Experience/effects/wavesEffect/wavesEffect';

shaderOptions: {
  vertexShader: shadersOptions.vertex,
  fragmentShader: shadersOptions.fragment,
}
```

To recreate effect can retrieve in <a href="#">demo library</a>, this is the default options and functions :

### Effects default setup

#### Waves & interaction effect

Default animation :

```
// plane options
planeOptions: {
  widthSegments: 8,
  heightSegments: 8,
},

// camera otpions
cameraOptions: {
  fov: 70,
  instance: {
    x: 1,
    y: 1,
    z: 600,
  },
  lookAt: new THREE.Vector3(),
},

// actions
function onEnter(intersect) {
  intersect.object.material.uniforms.uHover.value = intersect.uv;
  intersect.object.material.uniformsNeedUpdate = true;
}

function onLeave(intersect) {
  intersect.object.material.uniforms.uTime.value = 0.0;
  intersect.object.material.uniformsNeedUpdate = true;
}

function onTimeRunning() {
  experience.DOMImages.imageParameters;
  if(experience.DOMImages.imageParameters) {
    experience.DOMImages.imageParameters.forEach(imageParameter => {
      imageParameter.mesh.material.uniforms.uTime.value = experience.time.elapsed * 0.002;
    });
  }
}
```

#### Ripple rgb effect

Default animation :

```
// plane options
planeOptions: {
  widthSegments: 16,
  heightSegments: 16,
}

// camera options
cameraOptions: {
  fov: 70,
  instance: {
    x: 1,
    y: 1,
    z: 600,
  },
  lookAt: new THREE.Vector3(),
}

// actions
function onEnter(intersect) {
  intersect.object.material.uniforms.uHover.value = intersect.uv;
  intersect.object.material.uniforms.uTime.value = experience.time.elapsed * 0.001;
  intersect.object.material.uniformsNeedUpdate = true;
}

function onLeave(intersect) {
  intersect.object.material.uniforms.uTime.value = 0.0;
  intersect.object.material.uniformsNeedUpdate = true;
}
```