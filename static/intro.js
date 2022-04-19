const text = document.getElementById("text");
const svg = document.getElementById("svg");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");

const dots = document.querySelectorAll("span.dot");
let slide = 0;
let textContent = [
  "This will take about 20 minutes",
  "Follow the instructions on screen",
  "Headphones are recommended",
  "Honest answers are appreciated",
];
let svgs = [
  `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="57" fill="currentColor" class="bi bi-hourglass mt-5" viewBox="0 0 16 16">
<path d="M2 1.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1-.5-.5zm2.5.5v1a3.5 3.5 0 0 0 1.989 3.158c.533.256 1.011.791 1.011 1.491v.702c0 .7-.478 1.235-1.011 1.491A3.5 3.5 0 0 0 4.5 13v1h7v-1a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351v-.702c0-.7.478-1.235 1.011-1.491A3.5 3.5 0 0 0 11.5 3V2h-7z"/>
</svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="57" fill="currentColor" class="bi bi-exclamation-lg mt-5" viewBox="0 0 16 16">
<path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0L7.005 3.1ZM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"/>
</svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="57" fill="currentColor" class="bi bi-headphones mt-5" viewBox="0 0 16 16">
<path d="M8 3a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a6 6 0 1 1 12 0v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1V8a5 5 0 0 0-5-5z"/>
</svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="57" fill="currentColor" class="bi bi-chat-right-text mt-5" viewBox="0 0 16 16">
<path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
<path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
</svg>`,
];

btn1.addEventListener("click", () => {
  /**
   * click event handler for 'next' clicks
   */
  if (slide === 3) {
    window.location.pathname = "/test";
  } else if (slide < 3) {
    slide += 1;
  }
  setSlider(slide);
});

btn2.addEventListener("click", () => {
  /**
   * click event handler for 'back' clicks
   */
  if (slide > 0) {
    slide -= 1;
  }
  setSlider(slide);
});

function setSlider(slide) {
  /**
   * modify slide content given the slide number
   */

  // set slider dots
  dots.forEach((dot, idx) => {
    if (idx === slide) {
      dot.classList.add("dot-active");
    } else {
      dot.classList.remove("dot-active");
    }
  });

  // set text
  text.textContent = textContent[slide];
  svg.innerHTML = svgs[slide];

  // check slide value
  if (slide === 0) {
    btn1.textContent = "Continue";
    btn2.classList.add("d-none");
  } else if (slide === 3) {
    btn1.textContent = "Start";
  } else {
    btn1.textContent = "Ok";
    btn2.classList.remove("d-none");
  }
}
