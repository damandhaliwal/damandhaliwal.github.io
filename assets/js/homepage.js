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
