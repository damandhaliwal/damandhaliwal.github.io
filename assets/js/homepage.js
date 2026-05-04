(() => {
  const canvas = document.querySelector("[data-home-flow]");
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let frame = 0;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(rect.width, 1);
    height = Math.max(rect.height, 1);
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(248, 250, 255, 0.86)";
    ctx.fillRect(0, 0, width, height);

    const centerY = height * 0.5;
    const rows = 48;
    const cols = 78;

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const px = (x / (cols - 1)) * width;
        const phase = x * 0.12 + y * 0.08 + frame * 0.018;
        const wave =
          Math.sin(phase) * height * 0.16 +
          Math.sin(x * 0.05 - frame * 0.014) * height * 0.08;
        const band = centerY + wave + (y - rows / 2) * 4.2;
        const distance = Math.abs((y / rows) * height - band);
        const alpha = Math.max(0, 1 - distance / 135);

        if (alpha > 0.04) {
          const hot = Math.sin(phase + 1.8) > 0.55;
          ctx.fillStyle = hot
            ? `rgba(255, 106, 60, ${alpha * 0.55})`
            : `rgba(40, 88, 255, ${alpha * 0.48})`;
          ctx.beginPath();
          ctx.arc(px, (y / rows) * height, 1.05 + alpha * 1.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    ctx.strokeStyle = "rgba(30, 47, 118, 0.14)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width * 0.04, centerY);
    for (let x = 0; x <= width; x += 20) {
      const y =
        centerY +
        Math.sin(x * 0.008 + frame * 0.014) * height * 0.16 +
        Math.sin(x * 0.018 - frame * 0.01) * height * 0.06;
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    frame += 1;
    if (!prefersReducedMotion.matches) {
      requestAnimationFrame(draw);
    }
  };

  resize();
  draw();
  window.addEventListener("resize", () => {
    resize();
    if (prefersReducedMotion.matches) draw();
  });
})();
