uniform sampler2D uTexture;
uniform vec2 uOffset;
uniform float uAlpha;

varying vec2 vUv;
 
void main() {
  float r = texture2D(uTexture, vUv + uOffset * 0.002).r;
  float g = texture2D(uTexture, vUv).g;
  float b = texture2D(uTexture, vUv).b;

  vec3 texture = vec3(r, g, b);

  gl_FragColor = vec4(texture, uAlpha);
}