uniform sampler2D uTexture;
uniform vec2 uOffset;
uniform float uAlpha;

varying vec2 vUv;
 
void main() {
  vec3 texture = texture2D(uTexture,vUv).rgb;

  gl_FragColor = vec4(texture, uAlpha);
}