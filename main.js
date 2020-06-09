const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;


function operator(array, processCount) {

    for (let i = 0; i < processCount; i++) {

        if (array.includes('*') || array.includes('/')) {
            if (array.includes('*')) {
                oldString = array.slice(array.indexOf('*') - 1, array.indexOf('*') + 2).join('');
                rightIndex = array.indexOf('*') - 1;

                num1 = parseFloat(oldString.substr(0, oldString.indexOf('*')));
                operator = oldString.substr(oldString.indexOf('*'), 1);
                num2 = parseFloat(oldString.substr(oldString.indexOf('*') + 1));
            };
            if (array.includes('/')) {
                oldString = array.slice(array.indexOf('/') - 1, array.indexOf('/') + 2).join('');
                rightIndex = array.indexOf('/') - 1;

                num1 = parseFloat(oldString.substr(0, oldString.indexOf('/')));
                operator = oldString.substr(oldString.indexOf('/'), 1);
                num2 = parseFloat(oldString.substr(oldString.indexOf('/') + 1));
            };



        } else if (array.includes('+') || (array.includes('-'))) {
            if (array.includes('+')) {
                oldString = array.slice(array.indexOf('+') - 1, array.indexOf('+') + 2).join('');
                rightIndex = array.indexOf('+') - 1;

                num1 = parseFloat(oldString.substr(0, oldString.indexOf('+')));
                operator = oldString.substr(oldString.indexOf('+'), 1);
                num2 = parseFloat(oldString.substr(oldString.indexOf('+') + 1));
            };

            if (array.includes('-')) {
                oldString = array.slice(array.indexOf('-') - 1, array.indexOf('-') + 2).join('');
                rightIndex = array.indexOf('-') - 1;

                num1 = parseFloat(oldString.substr(0, oldString.indexOf('-')));
                operator = oldString.substr(oldString.indexOf('-'), 1);
                num2 = parseFloat(oldString.substr(oldString.indexOf('-') + 1));
            };
        };


        if (operator == '+') {
            total = add(num1, num2);
        } else if (operator == '-') {
            total = subtract(num1, num2);
        } else if (operator == '*') {
            total = multiply(num1, num2);
        } else if (operator == '/') {
            total = divide(num1, num2);
            if (num2 == 0 || num2 == '0') {
                alert("Error! the application is trying to process an inapplicable operation. '0' as a divisor results to infinity. The app will restart.");
                window.location.reload();
            };
        } else; {
        };

        array.splice(rightIndex, 3, total + '');

    };
    if (total % 1 !== 0) total = parseFloat(total.toFixed(6));
    return total;
};



var main = [];
var nexInput = [];
var processCounter = 0;
const calButtons = document.querySelectorAll('button:not(#clear)');
const myInput = document.getElementById('input');
calButtons.forEach((b) => b.addEventListener('click', function (i) {

    equation = (myInput.value += b.value);


    if (b.value == '+' || b.value == '-' ||
        b.value == '/' || b.value == '*' || b.value == '=') {
        processCounter += 1;

        if (b.value == '=' && processCounter == 1) window.location.reload();

        integer = nexInput.join('');
        main.push(integer, b.value);
        nexInput = [];
    } else if (b.value !== '+' || b.value !== '-' ||
        b.value !== '/' || b.value !== '*') {
        nexInput.push(b.value);
    };

    if (b.value == '=') {
        main.pop();
        myInput.value = operator(main, processCounter - 1);
    };
    document.getElementById('clear').addEventListener('click', (c) => window.location.reload());
}))

//----------------------------------------------------------------------------------------------------------------------

