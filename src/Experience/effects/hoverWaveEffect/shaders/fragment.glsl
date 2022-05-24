uniform sampler2D uTexture;
uniform float uTime;
uniform float uHoverState;

varying float vNoise;
varying vec2 vUv;

void main()	{
    vec2 newUV = vUv;

    vec2 p = newUV;
    float x = uHoverState;

    x = smoothstep(0.0, 1.0, (x * 2.0 + p.y - 1.0));

    vec4 f = mix(
      texture2D(uTexture, (p - 0.5) * (1.0 - x) + 0.5), 
      texture2D(uTexture, (p - 0.5) * x + 0.5), x
    );

    vec4 oceanView = texture2D(uTexture, newUV);

    gl_FragColor = f;
    gl_FragColor.rgb += 0.05 * vec3(vNoise);
}