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



strArray = [];
function processNumSentence(numString) {
const decString = (string) => string.slice(string.length-1) == '.';


    if (numString.includes('--')) {                     //cut numbers with negative values correctly
    negativeCount = numString.match(/--/g).length;
   
     
    for (let i=0; i<negativeCount; i++) {
        negIndex = numString.match(/--/);
        negPos = numString.indexOf(negIndex) +1;   
        numString = numString.replace(numString.substr(negPos, negPos+1), 'x') + numString.substr(negPos+1);
    
    };
         if (numString[0] == '-') numString = numString.replace('-', 'x');
 }


if (numString.includes('.')) {                          //cut numbers with decimal points correctly
      decCount = numString.match(/\./g).length;
      numArray = numString.match(/[0-9]+[\.+*-/=]/g);

for (i=0; i<decCount; i++) {
  decIndex = numArray.findIndex(decString);
      strArray.push(numArray[decIndex]);
      strArray.push(numArray[decIndex + 1]);
      numArray.splice(decIndex, 2, strArray.join(''));
      strArray = [];
};

} else {
    numArray = numString.match(/[0-9x]+[+*-/=]/g);
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
        num1 = parseFloat(mathPhrase[0]);
        mathSign = mathPhrase[1];
        num2 = parseFloat(mathPhrase[2]);

operator(num1, mathSign, num2);

        mathArray.splice(mathArray.indexOf(num1 + ""), 3, total + "");
  };
    return total;
};




finalArray = [];
const input = document.getElementById('input');
const buttons = document.querySelectorAll('button:not(#clear):not(#bs');

buttons.forEach((b) => b.addEventListener('click', function (i) {
input.value += b.value;


if (!input.value.substr(input.value.indexOf('.')-1, 1).match(/[0-9]/))         //adds 0 before the decimal if user inputs a period
        input.value = input.value.replace('.', '0.');                     

   mathPhrase = processNumSentence(input.value);                               //convert the string into array


if (b.value == '=') {                                                          //when '=' is pressed...
processCount = mathPhrase.length -1;                                        
mathPhrase.forEach(function(i) {                                               //refine the array
      finalArray.push(i.substr(0, i.length -1));
      finalArray.push(i.substr(-1));
      
});


finalArray.pop();                                                           //ommit the '=' sign
input.value = processMath(finalArray, processCount);                        //process the refined array for total result
};
    document.getElementById('clear').addEventListener('click', (c) => window.location.reload());
}));