import { useRef, useEffect } from 'react';

const VERTEX_SHADER = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform float u_time;
uniform vec2 u_res;
uniform float u_intensity;
uniform vec3 u_color1[3];
uniform vec4 u_color2[4];
uniform vec2 u_mouse;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  for (int i = 0; i < 6; i++) {
    sum += amp * noise(p * freq);
    amp *= 0.5;
    freq *= 2.0;
  }
  return sum;
}

float warpedNoise(vec2 p, float t) {
  vec2 q = vec2(
    fbm(p + vec2(0.0, 0.0) + t * 0.04),
    fbm(p + vec2(5.2, 1.3) + t * 0.03)
  );
  vec2 r = vec2(
    fbm(p + 4.0 * q + vec2(1.7, 9.2) + t * 0.05),
    fbm(p + 4.0 * q + vec2(8.3, 2.8) + t * 0.02)
  );
  return fbm(p + 3.5 * r);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = (uv - 0.5) * vec2(u_res.x / u_res.y, 1.0);
  float t = u_time * u_intensity * 0.3;

  float f1 = warpedNoise(p * 1.8 + vec2(0.0, t * 0.15), t);
  float f2 = warpedNoise(p * 2.5 + vec2(t * 0.1, -t * 0.08) + 50.0, t * 0.8);
  float f3 = warpedNoise(p * 0.9 + vec2(-t * 0.06, t * 0.12) + 100.0, t * 1.2);

  vec3 cr1[3] = u_color1;
  vec4 cr2[4] = u_color2;

  vec3 c0 = cr1[0];
  vec3 c1 = mix(cr1[1], cr2[0].xyz, smoothstep(0.3, 0.7, f2));
  vec3 c2 = mix(cr1[2], cr2[1].xyz, smoothstep(0.2, 0.6, f3));
  vec3 c3 = mix(cr2[2].xyz, cr2[3].xyz, 0.5 + 0.5 * sin(t * 0.2));

  float t0 = f1;
  float t1 = f1 * f2;
  float t2 = f2 * f3;
  float t3 = f3;

  float w0 = t0;
  float w1 = t1 * t1;
  float w2 = sqrt(max(t2, 0.0));
  float w3 = t3 * t3 * t3;

  float totalWeight = w0 + w1 + w2 + w3 + 0.001;
  w0 /= totalWeight;
  w1 /= totalWeight;
  w2 /= totalWeight;
  w3 /= totalWeight;

  vec3 col = c0 * w0 + c1 * w1 + c2 * w2 + c3 * w3;

  col += vec3(0.2, 0.08, 0.02) * smoothstep(0.5, 0.0, length(p * vec2(0.6, 1.0))) * u_intensity;
  col *= 0.6 + 0.4 * smoothstep(0.7, 0.2, length(p));

  float mouseEffect = exp(-length(p - (u_mouse - 0.5) * vec2(u_res.x / u_res.y, 1.0)) * 4.0);
  col += vec3(0.3, 0.15, 0.05) * mouseEffect * u_intensity;

  col += (hash(gl_FragCoord.xy + fract(u_time * 43.0) * 1000.0) - 0.5) * 0.02;

  col = clamp(col, 0.0, 1.0);
  gl_FragColor = vec4(col, 1.0);
}
`;

/**
 * WV-FLAG THEMED AURORA SMOKE
 * Color palette derived from WV state flag:
 * - Deep WV Blue (#002855) as base
 * - Old Gold (#FFCC00) as luminous highlight
 * - Ribbon Red (#C8102E) as warm accent
 * - Light Blue (#003A70) as mid-tone
 */
export default function AuroraSmoke() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return;

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const posLoc = gl.getAttribLocation(program, 'a_pos');
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_res');
    const uIntensity = gl.getUniformLocation(program, 'u_intensity');
    const uColor1 = gl.getUniformLocation(program, 'u_color1');
    const uColor2 = gl.getUniformLocation(program, 'u_color2');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    gl.uniform1f(uIntensity, 1.0);

    /* COLOR CHANGE 1: WV Dark Blue base (was 0.04,0.04,0.05) */
    /* COLOR CHANGE 2: WV Medium Blue midtone (was 0.08,0.09,0.12) */
    /* COLOR CHANGE 3: WV Gold/Ruby warm blend (was 0.50,0.25,0.10) */
    const color1 = new Float32Array([
      0.00, 0.16, 0.33,   // WV Dark Blue #002855
      0.00, 0.23, 0.44,   // WV Medium Blue #003A70
      0.78, 0.80, 0.10,   // WV Old Gold shifted warm #C7CC1A
    ]);
    gl.uniform3fv(uColor1, color1);

    /* COLOR CHANGE 4: WV Bright Gold highlight */
    /* COLOR CHANGE 5: WV Light Blue accent */
    /* COLOR CHANGE 6: WV Red ribbon warm */
    /* COLOR CHANGE 7: WV Pale Gold shimmer */
    const color2 = new Float32Array([
      1.00, 0.80, 0.00, 1.0,  // WV Old Gold #FFCC00
      0.00, 0.44, 0.70, 1.0,  // WV Light Blue #1A4A7A
      0.78, 0.06, 0.18, 1.0,  // WV Ribbon Red #C8102E
      1.00, 0.90, 0.30, 1.0,  // WV Pale Gold #FFE64D
    ]);
    gl.uniform4fv(uColor2, color2);

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
    }

    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handleMouse);

    let time = 0;
    function render() {
      time += 0.016;
      gl!.uniform1f(uTime, time);
      gl!.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      rafRef.current = requestAnimationFrame(render);
    }
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    />
  );
}
