
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d)

uniform float uTime;
uniform vec2 uHover;
uniform float uHoverState;

varying float vNoise;
varying vec2 vUv;


void main() {
    vec3 newposition = position;
    float PI = 3.1415925;

    float noise = cnoise3(3.0 * vec3(position.x, position.y, position.z + uTime / 30.0));
    
    float dist = distance(uv, uHover);

    newposition.z += uHoverState * 10.0 * sin(dist * 10.0 + uTime);

    vNoise = uHoverState * sin(dist * 10.0 - uTime);
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newposition, 1.0);
}