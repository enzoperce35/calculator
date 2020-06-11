const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;







function operator(num1, operator, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    if (operator == '+') { total = add(num1, num2);
    } else if (operator == '-') { total = subtract(num1, num2);
    } else if (operator == '*') { total = multiply(num1, num2);
    } else if (operator == '/') { total = divide(num1, num2);
        
        if (num2 == 0 || num2 == '0') {
            alert("Error! the application is trying to process an inapplicable operation. '0' as a divisor results to infinity. The app will restart.");
            window.location.reload();
        };
    };
    if (total % 1 !== 0) total = parseFloat(total.toFixed(6));   
    return total + "";
};







function processMath(mathArray, processCount) { 
    
     for (let i = 0; i < processCount; i++) {
        
        if (mathArray.includes('*') && mathArray.includes('/')) {
           mathSign = (mathArray.indexOf('*') < mathArray.indexOf('/')) ?  '*': '/';
                
        } else if (mathArray.includes('*')) { mathSign = '*';
        } else if (mathArray.includes('/')) { mathSign = '/';
                
        
        } else if (mathArray.includes('+') && mathArray.includes('-')) {
           mathSign = (mathArray.indexOf('+') < mathArray.indexOf('-')) ?  '+': '-';
                
        } else if (mathArray.includes('+')) { mathSign = '+';
        } else if (mathArray.includes('-')) { mathSign = '-';
        };

        
        mathPhrase = mathArray.slice(mathArray.indexOf(mathSign) - 1, mathArray.indexOf(mathSign) - 1 + 3);
        num1 = parseFloat(mathPhrase[0]);
        mathSign = mathPhrase[1];
        num2 = parseFloat(mathPhrase[2]);

operator(num1, mathSign, num2);

        mathArray.splice(mathArray.indexOf(num1 + ""), 3, total + "");
  };
    return total;
};








var main = [];
var nexInput = [];
var processCounter = 0;
const calButtons = document.querySelectorAll('button:not(#clear)');
const myInput = document.getElementById('input');
calButtons.forEach((b) => b.addEventListener('click', function (i) {

    equation = (myInput.value += b.value);


    if (b.value.match(/[=+*/-]/)) {              //ever click of these math signs...
        processCounter += 1;                     //pressCount adds 1 
        integer = nexInput.join('');             //push integer into array then create a single integer
        main.push(integer, b.value);             //push that single integer & math sign int main array
        nexInput = [];                           //reset for the next integer
    } else if (!b.value.match(/[=+*/-]/)){
        nexInput.push(b.value);
    };
   
    
    if (b.value == '=') {
        processCounter == 1 ? window.location.reload():null;
        processCounter -= 1;
        myInput.value = processMath(main, processCounter); 
    };
    document.getElementById('clear').addEventListener('click', (c) => window.location.reload());
}))

