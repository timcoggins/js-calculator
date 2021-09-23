/**
 * 
 * Mac Calculator clone in JS
 * 
 * TODO: give meaningful function returns
 * 
 * 
 * 
 */



// Globals

let nextOperation = "";
let waitForNextValue = false;
let lastNumber = 0;
let currentNumber = 0;


// Setup elements for DOM manipulation

const userInput = document.getElementById("user-input");
const userOperation = document.getElementById("user-operation");


// Manage the buttons on the DOM

const buttonAc = document.getElementById("button-ac").addEventListener("click", clearAll);      // This will be manipulated eventually
document.getElementById("button-invert").addEventListener("click", invertResult);
document.getElementById("button-percent").addEventListener("click", function() {updateOperation("percent")});
document.getElementById("button-divide").addEventListener("click", function() {updateOperation("divide")});

document.getElementById("button-number-7").addEventListener("click", function() {updateUserInput("7")});
document.getElementById("button-number-8").addEventListener("click", function() {updateUserInput("8")});
document.getElementById("button-number-9").addEventListener("click", function() {updateUserInput("9")});
document.getElementById("button-multiply").addEventListener("click", function() {updateOperation("multiply")});

document.getElementById("button-number-4").addEventListener("click", function() {updateUserInput("4")});
document.getElementById("button-number-5").addEventListener("click", function() {updateUserInput("5")});
document.getElementById("button-number-6").addEventListener("click", function() {updateUserInput("6")});
document.getElementById("button-subtract").addEventListener("click", function() {updateOperation("subtract")});

document.getElementById("button-number-1").addEventListener("click", function() {updateUserInput("1")});
document.getElementById("button-number-2").addEventListener("click", function() {updateUserInput("2")});
document.getElementById("button-number-3").addEventListener("click", function() {updateUserInput("3")});
document.getElementById("button-addition").addEventListener("click", function() {updateOperation("add")});

document.getElementById("button-number-0").addEventListener("click", function() {updateUserInput("0")});
document.getElementById("button-decimal").addEventListener("click", function() {updateUserInput(".")});
document.getElementById("button-equals").addEventListener("click", function() {updateOperation("equal")});

 
// Manange the keyboard inputs

document.addEventListener('keydown', (event) => {

    if(event.key === "1") updateUserInput("1");
    if(event.key === "2") updateUserInput("2");
    if(event.key === "3") updateUserInput("3");
    if(event.key === "4") updateUserInput("4");
    if(event.key === "5") updateUserInput("5");
    if(event.key === "6") updateUserInput("6");
    if(event.key === "7") updateUserInput("7");
    if(event.key === "8") updateUserInput("8");
    if(event.key === "9") updateUserInput("9");
    if(event.key === ".") updateUserInput(".");
    if(event.key === "=") updateOperation("equal");
    if(event.key === "+") updateOperation("add");
    if(event.key === "-") updateOperation("subtract");
    if(event.key === "*") updateOperation("multiply");
    if(event.key === "/") updateOperation("divide");
    
  }, false);


/**
 *  Adds a new number to the user input area
 *
 *  @param {string} newNumber adds a new number to the users input field
 */

function updateUserInput(newNumber) {
    if (!newNumber) return;

    // if it's the first number we are typing, remove the leading zero
    if (userInput.innerText === "0") userInput.innerText = "";

    // give this a better comment, it was important for some reason
    if (waitForNextValue) {
        userInput.innerText = newNumber;
        waitForNextValue = false;
    } else {
        userInput.innerText = userInput.innerText + newNumber;
    }
   
    return;
}

/**
 *  Manages doing the actual operations
 * 
 * @param {string} newOperation which operation do we want to do next
 *
 */
 
function updateOperation(newOperation) {

    currentNumber = parseFloat(userInput.innerText);


    if(waitForNextValue) {
        nextOperation = newOperation;
        updateUserOperation(nextOperation);
        lastNumber = currentNumber;
        return;
    }
    

    if (nextOperation === "add") lastNumber = lastNumber + currentNumber;
    else if (nextOperation === "subtract") lastNumber = lastNumber - currentNumber;
    else if (nextOperation === "multiply") lastNumber = lastNumber * currentNumber;
    else if (nextOperation === "divide") lastNumber = lastNumber / currentNumber;
    else lastNumber = currentNumber;

    userInput.innerText = lastNumber;
    waitForNextValue = true;
    
    nextOperation = newOperation;
    updateUserOperation(nextOperation);

    return;
}


/**
 * Updates the operator display on the top left of the UI
 * 
 * @param {string} operation 
 */
function updateUserOperation(operation) {
    if(operation === "add") userOperation.innerText = "+";
    if(operation === "subtract") userOperation.innerText = "-";
    if(operation === "multiply") userOperation.innerText = "×";
    if(operation === "division") userOperation.innerText = "÷";
    if(operation === "equal") userOperation.innerText = "";
    if(operation === "") userOperation.innerText = "";
}


/**
 * Inverts the users input
 */
function invertResult() {
    userInput.innerText = parseFloat(userInput.innerText) * -1;
}


/**
 * Clears all the variables out for a new calcuation
 */

function clearAll() {
    userInput.innerText = "0";
    nextOperation = "";
    updateUserOperation(nextOperation)
    waitForNextValue = false;
    lastNumber = 0;
    currentNumber = 0;
}

clearAll();

