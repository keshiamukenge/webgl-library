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
</ul>

<h2 id="title-installation">Installation</h2>

```
npm install ...
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
