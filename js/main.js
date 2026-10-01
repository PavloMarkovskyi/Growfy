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

/* ----- Interactive RATING ----- */

// const ratings = document.querySelectorAll(".rating");
// if (ratings.length > 0) {
//   initRatings();
// }
// function initRatings() {
//   let ratingActive, ratingValue;
//   for (let index = 0; index < ratings.length; index++) {
//     const rating = ratings[index];
//     initRating(rating);
//   }
//   function initRating(rating) {
//     initRatingVars(rating);
//     setRatingActiveWidth();

//     if (rating.classList.contains("rating_set")) {
//       setRating(rating);
//     }
//   }
//   function initRatingVars(rating) {
//     ratingActive = rating.querySelector(".rating__active");
//     ratingValue = rating.querySelector(".rating__value");
//   }
//   function setRatingActiveWidth(index = ratingValue.innerHTML) {
//     const ratingActiveWidth = index / 0.05;
//     ratingActive.style.width = `${ratingActiveWidth}%`;
//   }
//   function setRating(rating) {
//     const ratingItems = rating.querySelectorAll(".rating__item");
//     for (let index = 0; index < ratingItems.length; index++) {
//       const ratingItem = ratingItems[index];
//       ratingItem.addEventListener("mouseenter", (e) => {
//         initRatingVars(rating);
//         setRatingActiveWidth(ratingItem.value);
//       });
//       ratingItem.addEventListener("mouseleave", (e) => {
//         setRatingActiveWidth();
//       });
//       ratingItem.addEventListener("click", (e) => {
//         initRatingVars(rating);
//         ratingValue.innerHTML = index + 1;
//         setRatingActiveWidth();
//       });
//     }
//   }
// }

/* ------- */

/* ----- Fixed RATING ----- */

document.addEventListener("DOMContentLoaded", () => {
  const ratings = document.querySelectorAll(".rating");
  ratings.forEach((rating) => {
    rating.innerHTML = "★★★★★";
  });
});

/* ------- */
