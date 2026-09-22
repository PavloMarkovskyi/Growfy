document.addEventListener("click", documentClick);
function documentClick(e) {
  const targetItem = e.target;
  if (targetItem.closest(".icon-menu")) {
    document.documentElement.classList.toggle("menu-open");
  }
}
window.addEventListener("DOMContentLoaded", () => {
  const track1 = document.getElementById("track1");
  const track2 = document.getElementById("track2");
  const GAP = 40;
  let width = track1.scrollWidth + GAP;

  let pos1 = 0;
  let pos2 = width;
  let speed = 1;

  function updateSpeed() {
    const w = window.innerWidth + GAP;
    if (w <= 480) speed = 2;
    else if (w <= 768) speed = 1.5;
    else speed = 1;
  }

  function animate() {
    pos1 -= speed;
    pos2 -= speed;
    if (pos1 <= -width) pos1 = pos2 + width;
    if (pos2 <= -width) pos2 = pos1 + width;

    track1.style.transform = `translateX(${pos1}px)`;
    track2.style.transform = `translateX(${pos2}px)`;

    requestAnimationFrame(animate);
  }
  function start() {
    width = track1.scrollWidth + GAP;
    pos1 = 0;
    pos2 = width;

    track1.style.transform = `translateX(${pos1}px)`;
    track2.style.transform = `translateX(${pos2}px)`;

    track1.classList.add("is-ready");
    track2.classList.add("is-ready");
    animate();
  }
  updateSpeed();
  const images = track1.querySelectorAll("img");
  let loadedCount = 0;
  if (images.length === 0) {
    start();
  } else {
    images.forEach((img) => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.addEventListener("load", () => {
          loadedCount++;
          if (loadedCount === images.length) start();
        });
        img.addEventListener("error", () => {
          loadedCount++;
          if (loadedCount === images.length) start();
        });
      }
    });
    if (loadedCount === images.length) start();
  }

  window.addEventListener("resize", () => {
    width = track1.scrollWidth + GAP;
    updateSpeed();
  });
  [track1, track2].forEach((track) => {
    track.addEventListener("mouseenter", () => (speed = 0));
    track.addEventListener("mouseleave", updateSpeed);
  });
});
