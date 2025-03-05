let op = ""
let num1 = 0
let num2 = 0
let newNum = true
let opSelected = false
const displayOutput = document.querySelector(".screen")

// maintaining global stacks for calculator operations
const stack = []

function operate(operator, a, b){
    if (operator != ""){
        switch (operator){
            case "+":
                return add(a,b)
            case "-":
                return subtract(a,b)
            case "*":
                return multiply(a,b)
            case "/":
                return divide(a,b)
            default:
                return null
        }
    }
}

// function isNumeric(str) {
//     if (typeof str != "string") return false // we only process strings!  
//     return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
//            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
// }

function equality(){
    if (opSelected === false){
        number = displayOutput.textContent
        stack.push(number)
        if (stack.length == 3){
            num2 = stack.pop()
            op = stack.pop()
            num1 = stack.pop()
            let result = operate(op, num1, num2)
            if (result == "ERROR"){
                alert("You cannot divide by 0. Calculator has been reset.")
                displayOutput.textContent = "0"
                stack.length = 0
                newNum = true
                opSelected = false
            }
            else{
                displayOutput.textContent = result
            }
        }
        else if (stack.length == 1){
            stack.pop()
        }
        newNum = true
        opSelected = false
    }
}

function operateWrapper(operator){
    newNum = true
    if (opSelected === true){
        stack.pop()
        stack.push(operator)
    }
    else if (opSelected === false){
        let number = displayOutput.textContent
        
        if (stack.length <= 1) {
            if (stack.length === 0) {
                stack.push(number);
            }
            stack.push(operator);
        } 
        else {
            stack.push(number)
            stack.push(operator) 
            
            if (stack.length > 3){
                let previousOperator = stack.pop()
                num2 = stack.pop()
                op = stack.pop()
                num1 = stack.pop()
                let result = operate(op, num1, num2)
                if (result == "ERROR"){
                    alert("You cannot divide by 0. Calculator has been reset.")
                    displayOutput.textContent = "0"
                    stack.length = 0
                    newNum = true
                    opSelected = false
                }
                else{
                    stack.push(result)
                    stack.push(previousOperator)
                    displayOutput.textContent = result    
                }
            }
            else if (stack.length == 3){
                num2 = stack.pop()
                op = stack.pop()
                num1 = stack.pop()
                let result = operate(op, num1, num2)
                if (result === "ERROR"){
                    alert("You cannot divide by 0. Calculator has been reset.")
                    displayOutput.textContent = "0"
                    stack.length = 0
                    newNum = true
                    opSelected = false
                }
                else{
                    stack.push(result)
                    displayOutput.textContent = result
                }
            }
        }
    }
    opSelected = true
}

function add(a,b) {
    return +a + +b;
}

function subtract(a,b) {
    return +a - +b;
}

function multiply(a,b) {
    return +a * +b;
}

function divide(a,b) {
    if (+b == 0){
        // alert("You cannot divide by 0. Calculator has been reset.")
        // displayOutput.textContent = "0"
        // stack.length = 0
        // newNum = true
        // opSelected = false
        return "ERROR"
    }
    return +a / +b;
}

// adding numbers to the display
for (let i=0; i<10; i++){
    let numberButton = document.querySelector(`#butt${i}`)
    if (numberButton){
        numberButton.addEventListener("click", () => {
            opSelected = false
            if (newNum === false){
                displayOutput.textContent+=`${i}`
            }
            else if (newNum === true){
                displayOutput.textContent=`${i}`
                newNum = false
            }
        })
    }
}

const decimalButton = document.querySelector(".decimal-button")
if (decimalButton){
    decimalButton.addEventListener("click", () => {
        opSelected = false
        if (!(displayOutput.textContent.includes('.'))){
            if (newNum === false){
                displayOutput.textContent+=`.`
            }
            else if (newNum === true){
                displayOutput.textContent=`.`
                newNum = false
            }
        
    }
})} 

const opButtonList = document.querySelectorAll(".op-button")
opButtonList.forEach((item) => {
    const buttonOp = item.textContent
    item.addEventListener("click", () => {operateWrapper(buttonOp)})
})

const allClearButton = document.querySelector(".all-clear")
allClearButton.addEventListener("click",() => {
    displayOutput.textContent = "0"
    stack.length = 0
    newNum = true
    opSelected = false
})

const equalButton = document.querySelector(".eq-button")
equalButton.addEventListener("click", () => {equality()})

const plusMinusButton = document.querySelector(".plus-minus")
plusMinusButton.addEventListener("click", () => {
    if (displayOutput.textContent.charAt(0) == "-"){
        displayOutput.textContent = displayOutput.textContent.slice(1)
    }
    else{
        displayOutput.textContent = "-"+displayOutput.textContent
    }
})

const percentageButton = document.querySelector(".percentage")
percentageButton.addEventListener("click", () => {
    displayOutput.textContent = operate('/', displayOutput.textContent, 100)
})

// CLAUDE STUFF

// Add button press animation to all buttons
const allButtons = document.querySelectorAll('.button');
allButtons.forEach(button => {
    // Handle clicks with animation
    button.addEventListener('click', () => {
        button.classList.add('button-pressed');
        
        // Remove the class after a short delay to create the blinking effect
        setTimeout(() => {
            button.classList.remove('button-pressed');
        }, 150);
    });
    
    // For touch devices
    button.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent default touch behavior
        button.classList.add('button-pressed');
    });
    
    button.addEventListener('touchend', () => {
        setTimeout(() => {
            button.classList.remove('button-pressed');
        }, 150);
    });
});