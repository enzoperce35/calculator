const add =  (num1, num2) => num1 + num2;
const subtract =  (num1, num2) => num1 - num2;
const multiply =  (num1, num2) => num1 * num2;
const divide =  (num1, num2) => num1 / num2;



function operator(operator, num1, num2) {
if (operator == `+`) {
    total = add(num1, num2);
}else if (operator == `-`) {
    total = subtract(num1, num2);
}else if (operator == `*`) {
    total = multiply(num1, num2);
}else if (operator == `/`) {
    total = divide(num1, num2);
}else; {

};
return total;
};
