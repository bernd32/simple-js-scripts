const display = document.getElementById('display');
const equalsBtn = document.getElementById('equals');
const clearBtn = document.getElementById('clear');
const plusBtn = document.getElementById('plus');
const backspaceBtn = document.getElementById('backspace');
const expression = document.querySelectorAll('.numbers.eval');
const checkBox = document.getElementById('enable-digital-font');

let clearDisplay = true;
const DISPLAY_CHAR_LENGTH = 18; 
const signs = ['+','-','/','*','(',')'];

if (checkBox.checked) {
      display.setAttribute('style', 'font-family: "Digital-7";'); 
}
checkBox.addEventListener('change', (e) => {
      if (checkBox.checked) {
            display.setAttribute('style', 'font-family: "Digital-7";'); 
      } else {
            display.removeAttribute('style'); 
      }
});

expression.forEach(function (symbol) {
      symbol.addEventListener('click', (e) => {
            e.preventDefault();
            resetDisplay(); 
            // prevent entering double signs 
            if (isDoubleSignEntered(symbol.textContent)) {display.textContent = '0';} 
            // prevent from entering multiple zeros at the start of expression
            else if(multipleZerosAtStart(symbol.textContent)) {}
            else {

                  display.textContent += symbol.textContent;
            }
      });
});

// keyboard processing  
document.addEventListener('keydown', function (entered) {
      // disable invoking broswer's shortcuts
      entered.preventDefault(); 
      resetDisplay();
      const allowedKeys = ['1', '2', '3', '4', '5', '6',
            '7', '8', '9', '0', '+', '-', '/', '*', '(', ')','.'
      ];
      if (entered.key == 'c') { clear(entered); }
      if (entered.key == 'Backspace') { backspace(entered); }
      else if (isDoubleSignEntered(entered.key)) {}
      else if (display.textContent.length >= DISPLAY_CHAR_LENGTH) {}
      // prevent from entering multiple zeros at the start of expression
      else if(multipleZerosAtStart(entered.key)) { display.textContent = '0'; }
      // displaying numbers and signs entered from keyboard
      else if (allowedKeys.includes(entered.key)) {
            display.textContent += entered.key;
      } else if (entered.key == '=' || entered.key == 'Enter') {
            calculate(entered);
      }
});

clearBtn.addEventListener('click', clear);

backspaceBtn.addEventListener('click', backspace);

equalsBtn.addEventListener('click', calculate);

function isNumeric(value) {
      return /^-?[0-9]+(?:\.[0-9]+)?$/.test(value);
}

function calculate(e) {
      e.preventDefault();
      // if equation is done and '=' pressed, then reset display and show 0
      if (isNumeric(display.textContent)) {
            display.textContent = '0';
      }
      let result = eval(display.textContent);
      if (isNaN(result)) {
            display.textContent = 'Error';
      } else {
            display.textContent = result;
      }
      clearDisplay = true;
}

function backspace(e) {
      e.preventDefault();
      if (display.textContent.length == 1) {
            display.textContent = '0';
      } else {
            display.textContent = display.textContent.slice(0, -1);
      }
}

function isDoubleSignEntered(enteredKey) {
      const omitDoubles = ['+', '-', '**', '/', '*'];
      return omitDoubles.includes(enteredKey) && omitDoubles.includes(display.textContent.slice(-1));
}

function clear(e) {
      e.preventDefault();
      clearDisplay = true;
      display.textContent = '0';
}

function multipleZerosAtStart(enteredKey) {
      return ((enteredKey == '0')  && (display.textContent == '0'));
}

function resetDisplay() {
      if (clearDisplay) {
            display.textContent = '';
            clearDisplay = false;
      }
}