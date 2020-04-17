'use strict';

game();

let genNum = randomNumbers();

function game() {
  const btn = document.querySelector('.go');
  const inValue = document.querySelector('.input__text');
  const inputBulls = document.querySelector('.input__bulls');
  const inputCows = document.querySelector('.input__cows');
  const innerDigit = document.querySelector('.input__inner-digit');
  const giveUp = document.querySelector('.give-up');
  let bulls = 0;
  let cows = 0;

  btn.addEventListener('click', () => {
    bulls = 0;
    cows = 0;

    let stopPrint = false;
    const valueInput = inValue.value;

    if (/\D/g.test(valueInput)) {
      alert('Please, enter only digit');
    }

    if (valueInput.length < 4) {
      alert('Please, input 4 digit number');
      stopPrint = true;
    }

    for (const digit of valueInput) {
      const value = [...valueInput];

      value.splice(value.indexOf(digit), 1);

      if (value.includes(digit)) {
        stopPrint = true;
        alert('Numbers must be unique');
        break;
      }
    }

    for (const digit of valueInput) {
      const indexOfGen = genNum.indexOf(digit);
      const indexOfInput = valueInput.indexOf(digit);

      if (indexOfGen === indexOfInput) {
        bulls++;
        continue;
      }

      if (genNum.includes(digit)) {
        cows++;
        continue;
      }
    }

    if (bulls === 4) {
      alert(`You won. The number was ${genNum}`);
      stopPrint = true;
    }

    if (!stopPrint) {
      addElement(inputBulls, bulls);
      addElement(inputCows, cows);
      addElement(innerDigit, valueInput);
    }

    inValue.value = '';
  });

  giveUp.addEventListener('click', () => {
    alert(`You gave up. Guessed number is ${genNum}
I already made a new number. Try again`);
    genNum = randomNumbers();

    removeAnswer(inputBulls);
    removeAnswer(inputCows);
    removeAnswer(innerDigit);
  });
}

function randomNumbers() {
  const randNum = [];

  for (let i = 0; i < 4;) {
    const number = '' + Math.floor(Math.random() * 10);

    if (!(randNum.includes(number))) {
      if (randNum.length === 0 && number === '0') {
        continue;
      }

      randNum.push(number);
      i++;
    }
  }

  return randNum.join('');
}

function removeAnswer(value) {
  for (const answer of value.querySelectorAll('.answer-count')) {
    answer.remove();
  }
}

function addElement(value, count) {
  return value.insertAdjacentHTML('beforeend',
    `<p class="answer-count">
      ${count}
    </p>`);
}
