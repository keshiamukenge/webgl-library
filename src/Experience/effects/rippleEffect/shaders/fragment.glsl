precision mediump float;

uniform sampler2D uTexture;

varying vec2 vUv;
varying float vWave;

void main() {
	float wave = vWave * 0.002;

  float r = texture2D(uTexture, vUv).r;
  float g = texture2D(uTexture, vUv + wave).g;
  float b = texture2D(uTexture, vUv + wave).b;

  vec3 texture = vec3(r, g, b);
  gl_FragColor = vec4(texture, 1.);
}