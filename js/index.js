const app = document.getElementById('app');
let numberOfBoxs = 0;
let toBeCreated = 1;
const restart = document.querySelector('.restart');

function createItem() {
  app.classList.add('show');
  const square = document.createElement('div');
  square.classList.add('box');
  square.classList.add('appearing');
  toBeCreated < numberOfBoxs && app.appendChild(square);

  square.addEventListener('animationend', () => {
    let text = toBeCreated;

    toBeCreated % 15 === 0
      ? ((text = 'FizzBuzz'),
        square.classList.add('fizzBuzz'),
        square.classList.add('fbAnimation'))
      : toBeCreated % 3 === 0
      ? ((text = 'Fizz'), square.classList.add('fizz'))
      : toBeCreated % 5 === 0 &&
        ((text = 'Buzz'), square.classList.add('buzz'));

    const display = document.createElement('span');
    square.appendChild(display);
    display.innerHTML = text;

    createItem();
    toBeCreated += 1;
    if (toBeCreated == numberOfBoxs) {
      restartBox.classList.toggle('hidden');
    }
  });
}

const inputBox = document.querySelector('.inputBox');
const input = document.querySelector('input[name="numberBox');
const play = document.querySelector('.play');
const restartBox = document.querySelector('.restartBox');

const start = document.querySelector('.start');

start.addEventListener('click', () => {
  start.classList.toggle('hidden');
  inputBox.classList.toggle('hidden');
  play.classList.toggle('hidden');

  input.addEventListener('input', () => {
    if (input.value > 150) {
      input.value = 150;
      play.classList.remove('hidden');
      play.classList.add('fromHidden')
    } else if (input.value < 3) {
      play.classList.add('hidden');
    } else {
      play.classList.remove('hidden');
    }
  });

  play.addEventListener('click', () => {
    numberOfBoxs = input.value;
    inputBox.classList.add('hidden');
    createItem();
  });
});


/* DARK MODE */
const switcher = document.querySelector('#switch button');
switcher.addEventListener('click', () => {
  switcher.classList.toggle('sun');
  switcher.classList.toggle('moon');
  document.querySelector('body').classList.toggle('dark');
  inputBox.classList.toggle('light');
  input.classList.toggle('dark-input');
  document.querySelector('h1').classList.toggle('light');
})

/* fixing window height on iPhone */

const appHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight()