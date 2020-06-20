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



var strArray = [];
function processNumSentence(numString) {
const decString = (string) => string.slice(string.length-1) == '.';

//ommit '('
negative = numString.match(/\(/g);
if (negative) {
    for (let n=0; n<negative.length; n++){
    numString = numString.replace(numString.match(/\(/), '');
    }  
};

    //for equations with negative values
    if (numString.match(/[+*/-]-/g)) {
        negativeCount = numString.match(/[+*/-]-/g).length;             
   
     
    for (let i=0; i<negativeCount; i++) {
        
        negIndex = numString.match(/[+*/-]-/);
        negPos = numString.indexOf(negIndex) +1; 
        
        strA = numString.replace(numString.substr(negPos, negPos+1), 'x');
        numString = strA.substr(0, negPos+1) + numString.substr(negPos+1);
    };
}

//for equations with decimal points
if (numString.includes('.')) {        
      decCount = numString.match(/\./g).length;
      numArray = numString.match(/-?x?[0-9]+[\.+*-/=]/g);

for (i=0; i<decCount; i++) {
  decIndex = numArray.findIndex(decString);
      strArray.push(numArray[decIndex]);
      strArray.push(numArray[decIndex + 1]);
      numArray.splice(decIndex, 2, strArray.join(''));
      strArray = [];
};

} else {
    numArray = numString.match(/-?x?[0-9]+[+*-/=]/g);
};


if (numString.includes('x')) {
    
numArray.forEach(function(r) {
    if (r.includes('x')) numArray.splice(numArray.indexOf(r), 1, r.replace('x', '-'));
});

}
    return numArray;
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
        
        num1 = mathPhrase[0];
        mathSign = mathPhrase[1];
        num2 = mathPhrase[2];

operator(num1, mathSign, num2);

        mathArray.splice(mathArray.indexOf(num1 + ""), 3, total + "");
  };
    return total;
};








var newString = '';
var finalArray = [];
const decimal = document.getElementById('dec');
const equal = document.getElementById('equals');
const input = document.getElementById('input');
input.value;



const buttons = document.querySelectorAll('button:not(#clear)');
buttons.forEach((b) => b.addEventListener('click', function (i) { 

//create proper input
input.value += b.value;

//avoid irregular operation decimal input
newString += b.value;
if (b.value.match(/[+*/-]/) || input.value == '') newString = '';               
decimal.disabled = (newString.match(/\./))? true:false;

//fix decimal input with no integer
if (b.value == '.' && !input.value.substr(input.value.lastIndexOf('.')-1, 1).match(/[0-9]/))         
         input.value = input.value.replace(/.$/, '0.');


//avoid irregular operation with equal sign
(!input.value.match(/[0-9]+[+*/-](\(-)?[0-9]+/g))? document.getElementById('equals').value = '':document.getElementById('equals').value = '=';

//avoid irregular operation with negative values
if (input.value.match(/\(-b/g)) input.value = input.value.substr(0, input.value.indexOf('('));
(newString.slice(-1).match(/(\d|\.)/) || newString.slice(-1) == 'b')? document.getElementById('neg').value = '': document.getElementById('neg').value = '(-';

//avoid irregular operation with operator values
if (input.value[0].match(/[+*/\-=]/)) input.value = '';
  

//avoid duplication
if (input.value.match(/[*+/-][*+/-]/)) input.value = input.value.substr(0, input.value.length-1);          
if (input.value.match(/(\(-)(\(-)/)) input.value = input.value.substr(0, input.value.length-2);          


//backspace support
if (input.value.includes('b')) input.value = input.value.substr(0, input.value.length-2);






//convert string value to an array of values...
mathPhrase = processNumSentence(input.value);


//cut the values to proper values
if (b.value == '=') { 
processCount = mathPhrase.length -1;
                                        
mathPhrase.forEach(function(i) {
      finalArray.push(i.substr(0, i.length -1));
      finalArray.push(i.substr(-1));
});




//ommit the equal sign then proceed to the math process
finalArray.pop();
input.value = processMath(finalArray, processCount);
};
    
    //additional buttons
    document.getElementById('clear').addEventListener('click', (c) => window.location.reload());
    document.getElementById('neg').addEventListener('click', (c) => input.value.concat(document.getElementById('neg').value));
    
}))
