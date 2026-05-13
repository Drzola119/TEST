const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

const frameCount = 151;
const frames = [];
let currentFrame = 0;

const loader = document.getElementById('loader');
const progress = document.querySelector('.loader-progress');

// Load images
const preloadImages = () => {
  let loadedCount = 0;
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    const frameIndex = i.toString().padStart(3, '0');
    img.src = `/frames/ezgif-frame-${frameIndex}.jpg`;
    img.onload = () => {
      loadedCount++;
      if (progress) {
        progress.style.width = `${(loadedCount / frameCount) * 100}%`;
      }
      if (loadedCount === frameCount) {
        setTimeout(() => {
          if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 800);
          }
          handleResize();
          animate();
        }, 500);
      }
    };
    frames.push(img);
  }
};

const handleResize = () => {
  if (frames[0]) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth * (frames[0].height / frames[0].width);
  }
  render();
};

const render = () => {
  if (frames[currentFrame]) {
    const img = frames[currentFrame];
    // Draw the full image uncropped, filling the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }
};

// Auto-playing stable animation loop
const animate = () => {
  currentFrame = (currentFrame + 1) % frameCount;
  render();
  // Request next frame to play at approx 30fps
  setTimeout(() => requestAnimationFrame(animate), 1000 / 30);
};

// Initial Setup
window.addEventListener('resize', handleResize);
preloadImages();
