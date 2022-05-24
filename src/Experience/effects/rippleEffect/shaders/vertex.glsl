#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

uniform float uTime;

varying vec2 vUv;
varying float vWave;

void main() {
  vec3 newPosition = position;
  float noiseFreq = 10.45;
  float noiseAmp = 6.15; 
  vec3 noisePos = vec3(sin(newPosition.x * noiseFreq + uTime), newPosition.y, newPosition.z);
  
  newPosition.z += snoise3(noisePos) * noiseAmp;
	vWave = newPosition.z;

	gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

	vUv = uv;
}