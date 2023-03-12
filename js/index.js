const app = document.getElementById("app");

/* ++++++++ fixing window height on iPhone (for using 100vh) ++++++++ */
const doc = document.documentElement;

const appHeight = () => {
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};
window.addEventListener("resize", appHeight);
appHeight();
/* ++++++++ fixing window height on iPhone (for using 100vh) ++++++++ */

// value form users
let numberOfBoxs = 0;
// variable to teke track of the created elements
let toBeCreated = 1;

const restart = document.querySelector(".restart");
const progress = document.getElementById("progress");

// main function fro creating elements
function createItem() {
  /* progress bar function */
  function move() {
    const elem = document.getElementById("progress");
    // the function frame is called every 10 milliseconds
    const id = setInterval(frame, 10);
    function frame() {
      // take the % of the elements created
      let itemsBuilded = (toBeCreated / numberOfBoxs) * 100;
      // if the the program finish to creat stop calling frame()
      if (itemsBuilded > 100) {
        clearInterval(id);
      } else {
        // otherwise set the width of the progress bar at the % indicated
        elem.style.width = itemsBuilded + "%";
      }
    }
  }

  // show the container of the boxes
  app.classList.add("show");
  const square = document.createElement("div");
  square.classList.add("box");
  square.classList.add("appearing");
  // call move() function onliy at first box created
  toBeCreated == 1 && move();
  //append the first div only if is the first of the game
  toBeCreated < numberOfBoxs && app.appendChild(square);

  // listen to the animationend of every box in the page
  square.addEventListener("animationend", () => {
    let text = toBeCreated;

    // THE ACTUAL FIZZ BUZZ GAME
    toBeCreated % 15 === 0
      ? ((text = "Fizz<br>Buzz"),
        square.classList.add("fizzBuzz"),
        square.classList.add("fbAnimation"))
      : toBeCreated % 3 === 0
      ? ((text = "Fizz"), square.classList.add("fizz"))
      : toBeCreated % 5 === 0 &&
        ((text = "Buzz"), square.classList.add("buzz"));

    // append the text to the box after creating them
    const display = document.createElement("span");
    square.appendChild(display);
    display.innerHTML = text;

    // calling the function
    createItem();
    // element created
    toBeCreated += 1;

    // if complete show the restart button
    if (toBeCreated == numberOfBoxs) {
      restartBox.classList.toggle("hidden");
    }
  });
}

const inputBox = document.querySelector(".inputBox");
const input = document.querySelector('input[name="numberBox');
const play = document.querySelector(".play");
const restartBox = document.querySelector(".restartBox");

const start = document.querySelector(".start");

// button for starting the game
start.addEventListener("click", () => {
  start.classList.toggle("hidden");
  inputBox.classList.toggle("hidden");
  play.classList.toggle("hidden");

  // input validation
  input.addEventListener("input", () => {
    if (input.value > 150) {
      input.value = 150;
      play.classList.remove("hidden");
      play.classList.add("fromHidden");
    } else if (input.value < 3) {
      play.classList.add("hidden");
    } else {
      play.classList.remove("hidden");
    }
  });

  play.addEventListener("click", () => {
    numberOfBoxs = input.value;
    inputBox.classList.add("hidden");
    createItem();
  });
});

/* DARK MODE */

function changeColor() {
  switcher.classList.toggle("sun");
  switcher.classList.toggle("moon");
  if (switcher.classList.contains('moon')){
    app.style.backgroundColor = '#262626'
    doc.style.setProperty("--boxShadow", '1px 0px 10px 2px #222222');
  } else {
    app.style.backgroundColor = '#eee';
    doc.style.setProperty("--boxShadow", '1px 0px 10px 2px #ccc');
  }
  document.querySelector("body").classList.toggle("dark");
  inputBox.classList.toggle("light");
  input.classList.toggle("dark-input");
  document.querySelector("h1").classList.toggle("light");
}

const switcher = document.querySelector("#switch button");

//listen to input in toggle button
switcher.addEventListener("click", () => {
  changeColor();
});

// check if the user use dark mode on his device, if not changeColor() is fired
window.matchMedia("(prefers-color-scheme: dark)").matches && changeColor();

//listen to the change for preferred color
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    changeColor();
  });
