import {IsMobile, IsTablet, screenPortrait} from '../js/mobileCheck.js';

//Open/Close Menu On Click
let menuState = 0; //0 = Closed

document.getElementById("hamburger").addEventListener("click", menuToggle);

function menuToggle() {
  console.log("X Clicked");
  var x = document.getElementById("box-nav-menu");
  if (menuState == 0) {
    x.classList.remove("box-nav-close");
    x.classList.add("box-nav"); 
    menuState = 1; //Menu Is Now Open
  } else {
    x.classList.remove("box-nav");
    x.classList.add("box-nav-close");
    menuState = 0; //Menu Is Now Closed
  }
}

//GSAP and SplitType
gsap.registerPlugin(ScrollTrigger); // Register the GSAP Plugin - Once only

const isAnimationOk = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

// Change to false to make the animations play when the section's in viewport
const scrub = true;
document.addEventListener("DOMContentLoaded", (event) => {
  if(isAnimationOk) {
    setupAnimations();
}})

function setupAnimations() {

  var sections = gsap.utils.toArray('.case-study-animate2');

  sections.forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: '10% 90%',
        end: 'top 90%',
        scrub: false,
        markers: false,
        toggleActions: 'play play reverse reverse'
      },
      opacity: 0,
      y: 200,
      scale: 0,
      rotate: 25,
      transformOrigin: '40% 40%',
      duration: 0.4,
    });
  });
}   

// // Lottie Animation Arrow
// // ==============================================

import { DotLottie } from "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm";

const btn1canvas = document.getElementById("dlBtn1"); // Select canvas by ID

const LottieButton1 = new DotLottie({
    canvas: btn1canvas,
    src: "./Compress_X_1.json", // json file
    renderer: "svg",
    loop: false,
    autoplay: false
});


let btn1pause = 24; // Pause Frame in animation
let btn1end = 60;  // Last Frame in animation
let Btn1ClickState = 0;

function Btn1Click() {
  // LottieButton1.setSegment(btn1pause, btn1end);
  if (Btn1ClickState == 0) {
    LottieButton1.setMode("forward");
    LottieButton1.setSegment(1, btn1pause);
    LottieButton1.play();
    Btn1ClickState = 1;
    console.log("Menu Opened - Btn1ClickState = "+Btn1ClickState);
  } else {
    LottieButton1.setMode("reverse");
    LottieButton1.setSegment(1, btn1pause);
    LottieButton1.play();
    Btn1ClickState = 0;
    console.log("Menu Closed - Btn1ClickState = "+Btn1ClickState);
  }
}

btn1canvas.addEventListener("click", Btn1Click);

// G5 Added 053125
// ---- Scramble Text on Hover
// 
document.querySelectorAll('.scramble-hover').forEach(element => {
  let randomChars = "abcdefghijklmnopqrtsuvwxyz";
  let originalText = element.dataset.text;

  element.addEventListener('mouseover',() => {
      let iterations = 0;
      let interval = setInterval(() => {
          element.textContent = originalText.split("").map
          ((char,index) => {
              if (index < iterations) return char;
              return randomChars.charAt(Math.floor(Math.random
              () * randomChars.length));
          })
          .join("");
          if( iterations >= originalText.length){
              clearInterval(interval);
          }
          iterations += 1 / 1;
      },60);
  });
});

// G5 Added 053125
// ---- Pixelation Overlay on Hover
// 
document.addEventListener('DOMContentLoaded', function () {
  const animationStepDuration = 0.3; // Adjust this value to control the timing
  const gridSize = 17; // Number of pixels per row and column (adjustable)
  // Calculate pixel size dynamically
  const pixelSize = 100 / gridSize; // Calculate the size of each pixel as a percentage
  // Select all cards
  const cards = document.querySelectorAll('[data-pixelated-image-reveal]');
  // Detect if device is touch device
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches;
  // Loop through each card
  cards.forEach((card) => {
    const pixelGrid = card.querySelector('[data-pixelated-image-reveal-grid]');
    const activeCard = card.querySelector('[data-pixelated-image-reveal-active]');
    // Remove any existing pixels with the class 'pixelated-image-card__pixel'
    const existingPixels = pixelGrid.querySelectorAll('.pixelated-image-card__pixel');
    existingPixels.forEach(pixel => pixel.remove());
    // Create a grid of pixels dynamically based on the gridSize
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixelated-image-card__pixel');
        pixel.style.width = `${pixelSize}%`; // Set the pixel width dynamically
        pixel.style.height = `${pixelSize}%`; // Set the pixel height dynamically
        pixel.style.left = `${col * pixelSize}%`; // Set the pixel's horizontal position
        pixel.style.top = `${row * pixelSize}%`; // Set the pixel's vertical position
        pixelGrid.appendChild(pixel);
      }
    }
    const pixels = pixelGrid.querySelectorAll('.pixelated-image-card__pixel');
    const totalPixels = pixels.length;
    const staggerDuration = animationStepDuration / totalPixels; // Calculate stagger duration dynamically
    let isActive = false; // Variable to track if the card is active
    let delayedCall;
    const animatePixels = (activate) => {
      isActive = activate;
      gsap.killTweensOf(pixels); // Reset any ongoing animations
      if (delayedCall) {
        delayedCall.kill();
      }
      gsap.set(pixels, { display: 'none' }); // Make all pixels invisible instantly
      // Show pixels randomly
      gsap.to(pixels, {
        display: 'block',
        duration: 0,
        stagger: {
          each: staggerDuration,
          from: 'random'
        }
      });
      // After animationStepDuration, show or hide the activeCard
      delayedCall = gsap.delayedCall(animationStepDuration, () => {
        if (activate) {
          activeCard.style.display = 'block';
          // **Set pointer-events to none so clicks pass through activeCard**
          activeCard.style.pointerEvents = 'none';
        } else {
          activeCard.style.display = 'none';
        }
      });
      // Hide pixels randomly
      gsap.to(pixels, {
        display: 'none',
        duration: 0,
        delay: animationStepDuration,
        stagger: {
          each: staggerDuration,
          from: 'random'
        }
      });
    };
    if (isTouchDevice) {
      // For touch devices, use click event
      card.addEventListener('click', () => {
        animatePixels(!isActive);
      });
    } else {
      // For non-touch devices, use mouseenter and mouseleave
      card.addEventListener('mouseenter', () => {
        if (!isActive) {
          animatePixels(true);
        }
      });
      card.addEventListener('mouseleave', () => {
        if (isActive) {
          animatePixels(false);
        }
      });
    }
  });
});
  
// Target all .cs-animate-text panels
document.querySelectorAll('.cs-animate-text').forEach((panel) => {
  const dateEl = panel.querySelector('.csdate'); // h1
  const titleEl = panel.querySelector('h1.case-title'); // h1
  const arrow = panel.querySelector('span.case-title'); // span arrow
  const tagLinks = panel.querySelectorAll('.tags a'); // all <a> tags

  // Apply SplitType to each text element
  const splitDate = new SplitType(dateEl, { types: 'words, chars' });
  const splitTitle = new SplitType(titleEl, { types: 'words, chars' });

  // Store all tag word elements
  const splitTags = [];
  tagLinks.forEach(tag => {
    const splitTag = new SplitType(tag, { types: 'words, chars' });
    splitTags.push(...splitTag.words); // collect all split words
  });

  // Combine all words for animation
  const allWords = [
    ...splitDate.words,
    ...splitTitle.words,
    ...splitTags
  ];

  // Build the ScrollTrigger timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: panel,
      start: 'top 90%',
      end: 'top 90%',
      scrub: false,
      markers: true,
      toggleActions: 'play play reverse reverse'
    }
  });

  // Animate all words (date, title, and tags)
  tl.from(allWords, {
    opacity: 0,
    y: 50,
    stagger: 0.05,
    duration: 0.3,
    ease: 'power2.out'
  });

  // Animate arrow separately
  tl.to(arrow, {
    opacity: 0,
    x: -100,
    duration: 0.3
  }, ">");
});

const elements = document.querySelectorAll(".hoverText1");

elements.forEach((element) => {
  const arrow = element.querySelector("span.case-title");
  const title = element.querySelector("h1.case-title");
  const parentEl = document.querySelector("#cs-card-hover"); // Get the target element

  let hoverTween;

  const createHoverTween = () => {
    if (hoverTween) hoverTween.kill();

    // Use the width of #cs-card-hover instead of window.innerWidth
    const offset = () => {
      if (!parentEl) return 35; // Fallback if the element is not found
      const width = parentEl.offsetWidth;
      return Math.min(Math.max(width * 0.07, 2), 600);
    };

    hoverTween = gsap.timeline({ paused: true })
      .fromTo(
        arrow,
        { x: -offset(), opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power1.inOut" }
      )
      .fromTo(
        title,
        { x: 0, opacity: 1 },
        { x: offset(), opacity: 1, duration: 0.4, ease: "power1.inOut" },
        "<0.05"
      );
  };

  createHoverTween();

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      createHoverTween();
    }, 150);
  });

  element.addEventListener("mouseenter", () => hoverTween.play());
  element.addEventListener("mouseleave", () => hoverTween.reverse());
});

function isInViewport(element) {
    let rect = element.getBoundingClientRect();
    let triggerPoint = window.innerHeight * 0.55;
    return (
        rect.top <= triggerPoint && rect.bottom >= 0
    );
}

function updateCSYear() {
    let cs2024 = document.getElementById("cs2024");
    let cs2023 = document.getElementById("cs2023");
    let csyear = document.getElementById("cs-year");

    if(isInViewport(cs2023)) {
        csyear.innerHTML = "+2023+";
        console.log("cs2023 in Viewport");
    } else if (isInViewport(cs2024)) {
        csyear.innerHTML = "+2024+";
        console.log("cs2024 in Viewport");
    } else {
        csyear.innerHTML = "";
        console.log("Nothing in Viewport");
    }
}

// Add EventListeners
document.addEventListener('scroll', updateCSYear);
document.addEventListener('onload', updateCSYear);
document.addEventListener('onresize', updateCSYear);