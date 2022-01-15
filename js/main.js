var c = document.querySelectorAll(".canv");
console.log(c);
var $ = c[0].getContext("2d");
var $2 = c[1].getContext("2d");

var col = function (x, y, r, g, b) {
  $.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
  $.fillRect(x, y, 1, 1);
};
var col2 = function (x, y, r, g, b) {
  $2.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
  $2.fillRect(x, y, 1, 1);
};
var R = function (x, y, t) {
  return Math.floor(200 + 64 * Math.cos((x * x - y * y) / 300 + t));
};

var G = function (x, y, t) {
  return Math.floor(
    50 +
      64 * Math.sin((x * x * Math.cos(t / 2) + y * y * Math.sin(t / 2)) / 300)
  );
};

var B = function (x, y, t) {
  return Math.floor(
    100 +
      64 *
        Math.sin(
          5 * Math.sin(t / 9) +
            ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100
        )
  );
};

var t = 0;

var run = function () {
  for (x = 0; x <= 100; x++) {
    for (y = 0; y <= 100; y++) {
      col(x, y, R(x, y, t), G(x, y, t), B(x, y, t));
      col2(x, y, R(x, y, t), G(x, y, t), B(x, y, t));
    }
  }
  t = t + 0.12;
  window.requestAnimationFrame(run);
};

run();

// Typing effect

const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = [
  "a UX/UI Designer",
  "a Full-Stack Developer",
  // "also a Coach",
];
const typingDelay = 50;
const erasingDelay = 50;
const newTextDelay = 1050; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // On DOM Load initiate the effect
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// Testing the scroll thingy

// Detect request animation frame
var scroll =
  window.requestAnimationFrame ||
  // IE Fallback
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
var elementsToShow = document.querySelectorAll(".show-on-scroll");

function loop() {
  Array.prototype.forEach.call(elementsToShow, function (element) {
    if (isElementInViewport(element)) {
      element.classList.add("is-visible");
    } else {
      element.classList.remove("is-visible");
    }
  });

  scroll(loop);
}

// Call the loop for the first time
loop();

// Helper function from: http://stackoverflow.com/a/7557433/274826
function isElementInViewport(el) {
  // special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0 && rect.bottom >= 0) ||
    (rect.bottom >=
      (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight)) ||
    (rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight))
  );
}