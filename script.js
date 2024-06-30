let input = document.querySelector('.js-input');
let opButtons = document.querySelectorAll('.js-op-button');

document.addEventListener('DOMContentLoaded', function() {
    let buttons = document.querySelectorAll('.js-button');
    
    /*basic functioning of buttons and everything mostly html and css*/ 
    function clearScreen() {
        document.querySelector('.js-input').innerHTML = '0';
    }

    function showOnScreen(btn) {
        let currentContent = document.querySelector('.js-input').innerHTML;
        if (currentContent === '0') {
            document.querySelector('.js-input').innerHTML = btn.innerHTML;
        } else {
            document.querySelector('.js-input').innerHTML += btn.innerHTML;
        }
        clearHighlightButtons();
    }

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            if (button.classList.contains('js-clear')) {
                clearScreen();
            } else {
                showOnScreen(button);
            }
        });
    });

    function clearHighlightButtons(){
        opButtons.forEach(function(button) {
            button.classList.remove('highlight-btn');
        });
    }

});
/*variables*/

let result = 0;

let op = '';/*operation variable + - / x */
let currentNumber = 0;
let subBtnCounter = 0; /* a counter for the - button*/
let equalsBtnFlag = 0; /*a flag to mark if the equals button has been pressed first or not*/
let multiplyBtnCounter = 0; /*a flag to mark if the multiply button has been pressed first*/
let divideBtnCounter = 0;

/*this function makes the add button call for the calculate function by sending the parameters it has at the moment of pressing it*/
function addBtn(btn) {
    /*first it checks if the equals button has been pressed before or not, if not, this means that you can keep adding to the same number*/ 
    if(equalsBtnFlag === 0){
        op = '+';
        currentNumber = Number(input.innerHTML);
        calculate('+', currentNumber);
        input.innerHTML = '0';
        clearHighlight();
        btn.classList.add('highlight-btn');
    } else { /*on the other hand, if the equals button has been pressed before, it doesnt call the calculate() function, this way it doesnt add the same number twice, this will wait for the user to input a value again to add to the result number from that equals button*/
        op = '+'
        currentNumber = Number(input.innerHTML);
        input.innerHTML = '0';
        clearHighlight();
        btn.classList.add('highlight-btn');
        equalsBtnFlag = 0;/*then we set the equals flag back off that way after you press the button one time it will keep adding if you keep pressing the add button otherwise if the flag is still on that means it will never add something if you press the add button multiple times*/
    }
}

/*same logic applies here, but we also add a sub counter which will count if the sub button has been pressed before or not, because if it has, that means when we call the calculate() function it will substract that FIRST number from the result which will result in a negative number, so we ensure the first number if positive by setting a counter, if the sub button has been pressed before, it will substract from currentNumber, if it hasnt, it will only save that number*/ 
function subBtn(btn){
    if(equalsBtnFlag === 0){
        op = '-';
        currentNumber = Number(input.innerHTML);
        calculate('-', currentNumber);
        clearHighlight();
        input.innerHTML = '0';
        btn.classList.add('highlight-btn');
        subBtnCounter++;
    } else {
        op = '-'
        currentNumber = Number(input.innerHTML);
        clearHighlight();
        input.innerHTML = '0';
        btn.classList.add('highlight-btn');
        subBtnCounter++;
        equalsBtnFlag = 0;
    }

}

/*same logic here with the counter so it doesnt always multiply by 0 (result)*/ 
function multiplyBtn(btn){
    if(equalsBtnFlag === 0){
        op ='x'
        currentNumber = Number(input.innerHTML);
        console.log(currentNumber);
        calculate('x', currentNumber);
        input.innerHTML = '0';
        clearHighlight();
        btn.classList.add('highlight-btn');
        multiplyBtnCounter++;
    } else {
        op = 'x'
        currentNumber = Number(input.innerHTML);
        clearHighlight();
        input.innerHTML = '0';
        btn.classList.add('highlight-btn');
        equalsBtnFlag = 0;
        multiplyBtnCounter++;
    }
}


function divideBtn (btn){
    if(equalsBtnFlag === 0){
        op ='/'
        currentNumber = Number(input.innerHTML);
        console.log(currentNumber);
        calculate('/', currentNumber);
        clearHighlight();
        input.innerHTML = '0';
        btn.classList.add('highlight-btn');
        divideBtnCounter++;
    } else {
        op = '/'
        currentNumber = Number(input.innerHTML);
        clearHighlight();
        btn.classList.add('highlight-btn');
        input.innerHTML = '0';
        equalsBtnFlag = 0;
        divideBtnCounter++;
    }
}

function calculate(operation, currentNumber) { 
    if (operation === '+') {
        result += currentNumber;
    } else if (operation === '-') {
        if(subBtnCounter > 0){
            result -= currentNumber;
        } else {
            result = currentNumber;
        }
    } else if (operation === 'x') { 
        if(multiplyBtnCounter > 0) { 
            result *= currentNumber;
        } else {
            result = currentNumber;
        }
        
    } else if (operation === '/') {
        if(divideBtnCounter > 0) {
            if(currentNumber === 0) {
                input.style.display = 'none';
                document.querySelector('.error').style.display = 'block';
                setTimeout(function(){
                    acBtn();
                }, 1500);
            }  else {
                result /= currentNumber; 
            }           
        } else {
            result = currentNumber;
        }
    }
    console.log(result);
}

/*this function is called when we press the = button, basically shows the result on the screen and calculates that last number we input, also setting the flag to 1 that way we know the button has been pressed*/ 
function equals(){
    currentNumber = Number(input.innerHTML);
    console.log(currentNumber);
    calculate(op,currentNumber);
    input.innerHTML = result;
    equalsBtnFlag = 1;
}

/*clears css highlight of buttons*/ 
function clearHighlight() {
    opButtons.forEach(function(button) {
        button.classList.remove('highlight-btn');
    });
}

/*resets everything basically*/ 
function acBtn(){
    result = 0;
    op = '';
    currentNumber = 0;
    subBtnCounter = 0;
    equalsBtnFlag = 0;
    multiplyBtnCounter = 0;
    divideBtnCounter = 0;
    input.innerHTML = '0';
    input.style.display = 'block';
    document.querySelector('.error').style.display = 'none';
}

function negativeBtn(){
    currentNumber = Number(input.innerHTML);
    currentNumber = -currentNumber;
    input.innerHTML = currentNumber;
}

function percentageBtn(){
    currentNumber = Number(input.innerHTML);
    currentNumber /= 100;
    input.innerHTML = currentNumber;
}

document.addEventListener('keydown', function(event){
    const key = event.key;

    switch(key){
        case 'Backspace':
        acBtn();
        break;

        case 'Enter':
        equals();
        break;

        case '+':
        addBtn(document.querySelector('.js-add-button'));
        break;

        case '-':
        subBtn(document.querySelector('.js-sub-button'));
        break;

        case '*':
        multiplyBtn(document.querySelector('.js-multiply-button'));
        break;

        case '/':
        divideBtn(document.querySelector('.js-divide-button'));
        break;
        
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            showOnScreenByKey(key);
            break;
        default:
            break;
    }
})

function showOnScreenByKey(key) {
    let currentContent = input.innerHTML;
    if (currentContent === '0') {
        input.innerHTML = key;
    } else {
        input.innerHTML += key;
    }
    clearHighlight();
}