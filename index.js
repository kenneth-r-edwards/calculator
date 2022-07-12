
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const clearButton = document.getElementById('clearBtn');
const deleteButton = document.getElementById('deleteBtn');
const equalsButton = document.getElementById('equalsBtn');
const pointButton = document.getElementById('pointBtn');
const lastOpsScreen = document.getElementById('topNums');
const currentOpsScreen = document.getElementById('botNum');

let firstOp = '';
let secondOp = '';
let currentOp = null;
let shouldResetScreen = false;

window.addEventListener('keydown', keyboardInput);
equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
pointButton.addEventListener('click', appendPoint);

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

function appendNumber(number) {
    console.log('clicked');
    if (currentOpsScreen.textContent === '0' || shouldResetScreen) {
        resetScreen();
    }
      
    currentOpsScreen.textContent += number
}

function resetScreen() {
    currentOpsScreen.textContent = '';
    shouldResetScreen = false;
}

function clear() {
    currentOpsScreen.textContent = '0';
    lastOpsScreen.textContent = '';
    firstOp = '';
    secondOp = '';
    currentOp = null;
}

function appendPoint() {
    if (shouldResetScreen) {
        resetScreen()
    }
    if (currentOpsScreen.textContent === '') {
        currentOpsScreen.textContent = '0'
    } 
    if (currentOpsScreen.textContent.includes('.')) return
    currentOpsScreen.textContent += '.'
}

function deleteNumber() {
    currentOpsScreen.textContent = currentOpsScreen.textContent.toString().slice(0, -1)
}

function setOperation(operator) {
    if (currentOp !== null) evaluate()
    firstOp = currentOpsScreen.textContent
    currentOp = operator
    lastOpsScreen.textContent = `${firstOp} ${currentOp}`
    shouldResetScreen = true
}

function evaluate() {
    if (currentOp === null || shouldResetScreen) return
    if (currentOp === '÷' && currentOpsScreen.textContent === '0') {
      alert("Dividing by zero is not allowed!")
      return
    }
    secondOp = currentOpsScreen.textContent
    currentOpsScreen.textContent = roundResult(
      operate(currentOp, firstOp, secondOp)
    )
    lastOpsScreen.textContent = `${firstOp} ${currentOp} ${secondOp} =`
    currentOp = null
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

function keyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') appendPoint()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNumber()
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
      setOperation(convertOperator(e.key))
 }


function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷';
    if (keyboardOperator === '*') return '×';
    if (keyboardOperator === '-') return '−';
    if (keyboardOperator === '+') return '+';
}


//declare functions for basic math ops

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
        case '+':
            return add(a, b)
        case '−':
            return subtract(a, b)
        case '×':
            return multiply(a, b)
        case '÷':
            if (b === 0) return null
            else return divide(a, b)
        default:
            return null
    }
}