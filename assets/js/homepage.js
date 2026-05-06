(() => {
  const canvas = document.querySelector("[data-home-flow]");
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let ratio = 1;
  let frame = 0;
  let rafId = 0;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(rect.width, 1);
    height = Math.max(rect.height, 1);
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const drawGrid = () => {
    ctx.strokeStyle = "rgba(30, 47, 118, 0.055)";
    ctx.lineWidth = 1;

    for (let x = 0; x < width; x += 72) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y < height; y += 72) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(247, 250, 255, 0.72)";
    ctx.fillRect(0, 0, width, height);
    drawGrid();

    const centerY = height * 0.42;
    const rows = 64;
    const cols = 104;

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const px = (x / (cols - 1)) * width;
        const py = (y / (rows - 1)) * height;
        const phase = x * 0.105 + y * 0.076 + frame * 0.018;
        const sweep =
          Math.sin(phase) * height * 0.18 +
          Math.sin(x * 0.048 - frame * 0.013) * height * 0.1 +
          Math.cos((x + y) * 0.055 + frame * 0.008) * height * 0.045;
        const band = centerY + sweep + (y - rows / 2) * 4.6;
        const distance = Math.abs(py - band);
        const alpha = Math.max(0, 1 - distance / 164);

        if (alpha > 0.035) {
          const hot = Math.sin(phase + 1.7) > 0.5 || Math.cos(y * 0.25 + frame * 0.018) > 0.78;
          ctx.fillStyle = hot
            ? `rgba(255, 106, 60, ${alpha * 0.58})`
            : `rgba(38, 88, 255, ${alpha * 0.54})`;
          ctx.beginPath();
          ctx.arc(px, py, 0.8 + alpha * 2.35, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    ctx.strokeStyle = "rgba(30, 47, 118, 0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width * 0.02, centerY);
    for (let x = 0; x <= width; x += 16) {
      const y =
        centerY +
        Math.sin(x * 0.008 + frame * 0.014) * height * 0.18 +
        Math.sin(x * 0.018 - frame * 0.01) * height * 0.08;
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.strokeStyle = "rgba(255, 106, 60, 0.18)";
    ctx.beginPath();
    ctx.moveTo(width * 0.08, centerY + height * 0.12);
    for (let x = 0; x <= width; x += 18) {
      const y =
        centerY +
        height * 0.12 +
        Math.sin(x * 0.01 - frame * 0.012) * height * 0.12;
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    frame += 1;
    if (!prefersReducedMotion.matches) {
      rafId = requestAnimationFrame(draw);
    }
  };

  const redraw = () => {
    if (rafId) cancelAnimationFrame(rafId);
    resize();
    draw();
  };

  resize();
  draw();

  window.addEventListener("resize", redraw);
  if (typeof prefersReducedMotion.addEventListener === "function") {
    prefersReducedMotion.addEventListener("change", redraw);
  }
})();

(() => {
  const canvas = document.querySelector("[data-hero-dots]");
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const ctx = canvas.getContext("2d");
  const pointer = { x: -10000, y: -10000, active: false };
  let width = 0;
  let height = 0;
  let ratio = 1;
  let frame = 0;
  let rafId = 0;
  let particles = [];
  let seed = 7;

  const random = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(rect.width, 1);
    height = Math.max(rect.height, 1);
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    seed = 7;
    const count = Math.round(Math.min(7600, Math.max(2600, (width * height) / 130)));
    particles = Array.from({ length: count }, () => ({
      t: random(),
      lane: (((random() + random() + random()) / 3) - 0.5) * 2.55,
      drift: (random() - 0.5) * 2.1,
      speed: 0.00032 + random() * 0.00058,
      size: 0.62 + random() * 1.15,
      hue: random()
    }));
  };

  const streamPoint = (particle, time) => {
    const t = particle.t;
    const wave = Math.sin(t * Math.PI * 2.35 + time * 0.012);
    const counter = Math.sin(t * Math.PI * 4.2 - time * 0.008);
    const centerX = width * (0.52 + wave * 0.17 + counter * 0.05);
    const band = width * (0.13 + Math.sin(t * Math.PI * 1.7 + time * 0.006) * 0.045);
    const turbulence =
      Math.sin(t * Math.PI * 11 + particle.drift * 2.4 + time * 0.014) * width * 0.018;
    const x = centerX + particle.lane * band + particle.drift * 14 + turbulence;
    const y = height * (-0.08 + t * 1.18) + Math.sin(t * Math.PI * 5 + time * 0.01) * 30;
    return { x, y };
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    const time = prefersReducedMotion.matches ? 28 : frame;

    ctx.save();
    ctx.globalCompositeOperation = "source-over";

    for (const particle of particles) {
      if (!prefersReducedMotion.matches) {
        particle.t = (particle.t + particle.speed) % 1;
      }

      const point = streamPoint(particle, time);
      let x = point.x;
      let y = point.y;
      let boost = 0;

      if (pointer.active) {
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const distance = Math.hypot(dx, dy);
        const radius = Math.max(120, Math.min(width, height) * 0.26);

        if (distance < radius) {
          const force = (1 - distance / radius) ** 2;
          const angle = Math.atan2(dy, dx) + force * 1.35;
          const push = force * 82;
          x += Math.cos(angle) * push;
          y += Math.sin(angle) * push;
          boost = force;
        }
      }

      const fade = Math.sin(Math.PI * particle.t);
      const alpha = 0.64 + fade * 0.34;
      const radius = particle.size;
      const warm =
        Math.sin(particle.t * Math.PI * 5.4 + particle.lane * 2.1 + time * 0.006) > 0.24 ||
        (particle.hue > 0.82 && particle.t > 0.25);
      const color =
        warm
          ? `rgba(255, 105, 42, ${alpha * 0.82})`
          : particle.hue > 0.44
            ? `rgba(29, 89, 255, ${alpha * 0.92})`
            : `rgba(58, 198, 235, ${alpha * 0.76})`;

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

    }

    ctx.restore();

    const gradient = ctx.createLinearGradient(width * 0.18, 0, width * 0.9, height);
    gradient.addColorStop(0, "rgba(84, 215, 232, 0)");
    gradient.addColorStop(0.45, "rgba(84, 215, 232, 0.11)");
    gradient.addColorStop(0.72, "rgba(255, 123, 93, 0.1)");
    gradient.addColorStop(1, "rgba(38, 88, 255, 0)");
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i <= 90; i += 1) {
      const t = i / 90;
      const ghost = streamPoint({ t, lane: 0.05, drift: 0 }, time);
      if (i === 0) ctx.moveTo(ghost.x, ghost.y);
      else ctx.lineTo(ghost.x, ghost.y);
    }
    ctx.stroke();

    frame += 0.42;
    if (!prefersReducedMotion.matches) {
      rafId = requestAnimationFrame(draw);
    }
  };

  const redraw = () => {
    if (rafId) cancelAnimationFrame(rafId);
    resize();
    draw();
  };

  const updatePointer = (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    pointer.active =
      event.clientX >= rect.left - 120 &&
      event.clientX <= rect.right + 120 &&
      event.clientY >= rect.top - 120 &&
      event.clientY <= rect.bottom + 120;

    if (prefersReducedMotion.matches) draw();
  };

  const clearPointer = () => {
    pointer.active = false;
    if (prefersReducedMotion.matches) draw();
  };

  resize();
  draw();

  window.addEventListener("resize", redraw);
  window.addEventListener("pointermove", updatePointer, { passive: true });
  window.addEventListener("pointerleave", clearPointer);
  if (typeof prefersReducedMotion.addEventListener === "function") {
    prefersReducedMotion.addEventListener("change", redraw);
  }
})();
