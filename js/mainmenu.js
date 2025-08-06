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