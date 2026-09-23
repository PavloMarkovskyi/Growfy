document.addEventListener("click", documentClick);
function documentClick(e) {
  const targetItem = e.target;
  if (targetItem.closest(".icon-menu")) {
    document.documentElement.classList.toggle("menu-open");
  }
}
window.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".clients__items");
  const track = document.getElementById("track");
  const GAP = 40;

  const originalItems = Array.from(track.children).map((c) =>
    c.cloneNode(true),
  );
  function setup() {
    track.innerHTML = "";
    originalItems.forEach((c) => track.appendChild(c.cloneNode(true)));

    let guard = 0;
    while (track.scrollWidth < container.clientWidth && guard < 20) {
      originalItems.forEach((c) => track.appendChild(c.cloneNode(true)));
      guard++;
    }
    const setWidth = track.scrollWidth;

    const currentChildren = Array.from(track.children);
    currentChildren.forEach((c) => track.appendChild(c.cloneNode(true)));

    const shift = setWidth + GAP;
    track.style.setProperty("--shift", `-${shift}px`);

    const pxPerSecond = getSpeedPxPerSecond();
    const duration = shift / pxPerSecond;
    track.style.animationDuration = `${duration}s`;
    track.classList.add("is-ready");
  }
  function getSpeedPxPerSecond() {
    const w = window.innerWidth;
    if (w <= 480) return 80;
    if (w <= 768) return 60;
    return 40;
  }
  function start() {
    setup();
  }

  const images = track.querySelectorAll("img");
  let loadedCount = 0;
  if (images.length === 0) {
    start();
  } else {
    images.forEach((img) => {
      const done = () => {
        loadedCount++;
        if (loadedCount === images.length) start();
      };
      if (img.complete) done();
      else {
        img.addEventListener("load", done);
        img.addEventListener("error", done);
      }
    });
  }
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(setup, 200);
  });
  container.addEventListener("mouseenter", () => {
    track.style.animationPlayState = "paused";
  });
  container.addEventListener("mouseleave", () => {
    track.style.animationPlayState = "running";
  });
});
