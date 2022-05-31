uniform vec2 uOffset;

varying vec2 vUv;

float PI = 3.1415926535897932384626433832795;

vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
  position.x = position.x + (sin(uv.y * PI) * offset.x);
  position.y = position.y + (sin(uv.x * PI) * offset.y);
  return position;
}

void main() {
  vec3 newPosition = deformationCurve(position, uv, uOffset);
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  
  vUv = uv;
}