/* ============================================================
   Stabolut — Liquid Glass hero effect (WebGL / Three.js r128)
   A refractive, organically-morphing glass blob with the
   signature blue -> orange Stabolut light. Reacts to the cursor.
   Falls back gracefully to the hero video if WebGL is missing.
   ============================================================ */
(function () {
  'use strict';

  const canvas = document.getElementById('glass-canvas');
  if (!canvas) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- WebGL capability check -------------------------------------------
  function webglOK() {
    try {
      const c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext &&
        (c.getContext('webgl') || c.getContext('experimental-webgl')));
    } catch (e) { return false; }
  }

  if (!webglOK() || typeof THREE === 'undefined') {
    document.body.classList.add('no-webgl');
    return;
  }

  // ----------------------------------------------------------------------
  // Renderer / scene / camera
  // ----------------------------------------------------------------------
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 6.2);

  // Lower geometry detail on small / low-power screens.
  const isSmall = Math.min(window.innerWidth, window.innerHeight) < 720;
  const detail = isSmall ? 24 : 40;
  const geometry = new THREE.IcosahedronGeometry(1.5, detail);

  // ----------------------------------------------------------------------
  // Shaders
  // ----------------------------------------------------------------------
  const noiseGLSL = `
    // Simplex 3D noise — Ashima Arts / Stefan Gustavson (MIT)
    vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
    vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v){
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
      i = mod(i, 289.0);
      vec4 p = permute(permute(permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 1.0/7.0;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }
    // Fractal brownian motion for richer surface motion
    float fbm(vec3 p){
      float f = 0.0, amp = 0.5;
      for(int i=0;i<4;i++){ f += amp*snoise(p); p *= 2.02; amp *= 0.5; }
      return f;
    }
  `;

  const vertexShader = noiseGLSL + `
    uniform float uTime;
    uniform float uAmp;
    uniform vec3  uMouse;
    varying vec3 vNormalW;
    varying vec3 vViewDir;
    varying float vDisp;

    // Displacement field shared by position + normal estimation
    float displace(vec3 p){
      float t = uTime * 0.30;
      float n = fbm(p * 1.05 + vec3(0.0, t, 0.0));
      n += 0.45 * snoise(p * 2.3 - vec3(t, 0.0, t*0.6));
      // gentle pull toward the cursor so the blob "leans"
      float pull = dot(normalize(p), normalize(uMouse + vec3(0.001))) ;
      n += 0.18 * pull;
      return n;
    }

    void main(){
      vec3 p = position;
      float d = displace(p);
      vec3 displaced = p + normal * d * uAmp;

      // Estimate the perturbed normal by sampling neighbours.
      float e = 0.18;
      vec3 tangent1 = normalize(cross(normal, vec3(0.0,1.0,0.0) + 1e-4));
      vec3 tangent2 = normalize(cross(normal, tangent1));
      vec3 pA = p + tangent1 * e;
      vec3 pB = p + tangent2 * e;
      vec3 dA = pA + normal * displace(pA) * uAmp;
      vec3 dB = pB + normal * displace(pB) * uAmp;
      vec3 newNormal = normalize(cross(dA - displaced, dB - displaced));
      // keep it facing outward
      if(dot(newNormal, normal) < 0.0) newNormal = -newNormal;

      vec4 worldPos = modelMatrix * vec4(displaced, 1.0);
      vNormalW = normalize(mat3(modelMatrix) * newNormal);
      vViewDir = normalize(cameraPosition - worldPos.xyz);
      vDisp = d;

      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `;

  const fragmentShader = `
    precision highp float;
    uniform float uTime;
    uniform vec3  uColorTop;     // blue
    uniform vec3  uColorBottom;  // orange
    uniform vec3  uColorCore;    // deep mid
    varying vec3 vNormalW;
    varying vec3 vViewDir;
    varying float vDisp;

    // Procedural studio environment: blue sky -> dark core -> warm floor,
    // with a couple of bright highlight lobes that read as glass reflections.
    vec3 envColor(vec3 dir){
      float y = dir.y * 0.5 + 0.5;
      vec3 grad = mix(uColorBottom, uColorTop, smoothstep(0.15, 0.95, y));
      grad = mix(uColorCore, grad, smoothstep(0.25, 0.75, abs(dir.y)) * 0.6 + 0.4);
      // key light (cool, upper-right)
      float key = pow(max(dot(dir, normalize(vec3(0.6, 0.8, 0.4))), 0.0), 18.0);
      // warm rim light (lower-left)
      float warm = pow(max(dot(dir, normalize(vec3(-0.7, -0.5, 0.5))), 0.0), 10.0);
      grad += key * vec3(0.9, 0.97, 1.0) * 1.4;
      grad += warm * uColorBottom * 1.1;
      return grad;
    }

    void main(){
      vec3 N = normalize(vNormalW);
      vec3 V = normalize(vViewDir);

      float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);

      // Reflection
      vec3 R = reflect(-V, N);
      vec3 reflCol = envColor(R);

      // Refraction with chromatic dispersion -> the glassy color split
      float eta = 0.86;
      vec3 rR = refract(-V, N, eta + 0.012);
      vec3 rG = refract(-V, N, eta);
      vec3 rB = refract(-V, N, eta - 0.012);
      vec3 refrCol = vec3(envColor(rR).r, envColor(rG).g, envColor(rB).b);

      // Combine: refraction in the body, reflection on the grazing rim
      vec3 col = mix(refrCol, reflCol, clamp(fres + 0.08, 0.0, 1.0));

      // Inner glow tinted by displacement (warm where it bulges)
      float warmth = smoothstep(-0.3, 0.6, vDisp);
      col += mix(uColorTop, uColorBottom, warmth) * 0.18;

      // Specular sparkle
      vec3 L = normalize(vec3(0.5, 0.9, 0.7));
      float spec = pow(max(dot(R, L), 0.0), 60.0);
      col += spec * vec3(1.0) * 0.9;

      // Bright fresnel rim — the liquid-glass edge
      col += fres * mix(uColorTop, vec3(1.0), 0.4) * 0.9;

      // Tone
      col = col / (col + vec3(0.85));
      col = pow(col, vec3(0.92));

      float alpha = clamp(0.62 + fres * 0.6, 0.0, 1.0);
      gl_FragColor = vec4(col, alpha);
    }
  `;

  const uniforms = {
    uTime:        { value: 0 },
    uAmp:         { value: 0.0 },
    uMouse:       { value: new THREE.Vector3(0, 0, 1) },
    uColorTop:    { value: new THREE.Color(0x4ea8e6) }, // blue
    uColorBottom: { value: new THREE.Color(0xff8a2a) }, // orange
    uColorCore:   { value: new THREE.Color(0x0a1822) }  // deep teal-black
  };

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false
  });

  const blob = new THREE.Mesh(geometry, material);
  scene.add(blob);

  // A faint, larger "halo" shell for atmospheric depth
  const haloMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uTop: uniforms.uColorTop, uBottom: uniforms.uColorBottom },
    vertexShader: `
      varying vec3 vN; varying vec3 vV;
      void main(){
        vec4 wp = modelMatrix * vec4(position,1.0);
        vN = normalize(mat3(modelMatrix)*normal);
        vV = normalize(cameraPosition - wp.xyz);
        gl_Position = projectionMatrix * viewMatrix * wp;
      }`,
    fragmentShader: `
      precision highp float;
      uniform vec3 uTop; uniform vec3 uBottom;
      varying vec3 vN; varying vec3 vV;
      void main(){
        float f = pow(1.0 - max(dot(normalize(vN), normalize(vV)),0.0), 3.5);
        vec3 c = mix(uBottom, uTop, vN.y*0.5+0.5);
        gl_FragColor = vec4(c, f * 0.35);
      }`
  });
  const halo = new THREE.Mesh(new THREE.IcosahedronGeometry(2.05, 8), haloMat);
  scene.add(halo);

  // ----------------------------------------------------------------------
  // Interaction + resize
  // ----------------------------------------------------------------------
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener('pointermove', (e) => {
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
  }, { passive: true });

  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  // Pause rendering when the hero is off-screen (saves battery).
  let visible = true;
  const hero = document.querySelector('.hero');
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
    }, { threshold: 0.02 }).observe(hero);
  }

  // ----------------------------------------------------------------------
  // Animation loop (with intro "materialize" tween)
  // ----------------------------------------------------------------------
  const clock = new THREE.Clock();
  let intro = 0; // 0 -> 1
  const targetAmp = prefersReduced ? 0.22 : 0.42;

  function tick() {
    requestAnimationFrame(tick);
    if (!visible) return;

    const dt = clock.getDelta();
    const t = clock.getElapsedTime();
    uniforms.uTime.value = prefersReduced ? 0.4 : t;

    // intro materialize
    intro = Math.min(1, intro + dt * 0.6);
    const ease = 1 - Math.pow(1 - intro, 3);
    uniforms.uAmp.value = targetAmp * ease;

    // smooth mouse
    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;
    uniforms.uMouse.value.set(mouse.x, mouse.y, 1.0);

    if (!prefersReduced) {
      blob.rotation.y += dt * 0.12;
      blob.rotation.x = mouse.y * 0.35;
      blob.rotation.z = -mouse.x * 0.15;
      blob.position.x = mouse.x * 0.35;
      blob.position.y = mouse.y * 0.25 + Math.sin(t * 0.6) * 0.06;
      halo.rotation.copy(blob.rotation);
      halo.position.copy(blob.position);
    }
    const s = 0.6 + 0.4 * ease;
    blob.scale.setScalar(s);
    halo.scale.setScalar(s);

    renderer.render(scene, camera);
  }
  tick();
})();
