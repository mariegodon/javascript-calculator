function calculator(someString) {
    
    var stringArr = toNumStringArray(someString);

    //locate first open bracket in array
    var openBracket = stringArr.indexOf('(');
    while (openBracket < stringArr.length) {
        //if there is no open bracket ie only one mathematical expression
        if (openBracket === -1) {
            //do the math
            stringArr = performOperation(stringArr);
            return (stringArr[0]);
        }
        else {
            //locate the next opening and closing brackets
            var nextOpen = stringArr.indexOf('(', openBracket + 1);
            var nextClose = stringArr.indexOf(')', openBracket + 1);
            //check to see if current opening parentheses belongs to an inner bracket
            if (nextClose < nextOpen || nextOpen === -1) {
                //if yes, copy this bracket and do the math
                var insideParentheses = stringArr.slice(openBracket + 1, nextClose);
                var convertedBracket = (performOperation(insideParentheses));
                //replace this bracket in the array with the total
                stringArr.splice(openBracket, (nextClose - openBracket + 1), convertedBracket[0]);
                //restart searching from the first opening bracket
                openBracket = stringArr.indexOf('(');
                stringArr = stringArr.join("");
                stringArr = toNumStringArray(stringArr);
            }
            else {
                //if not an inner bracket, go to next open parenthesis and restart 
                openBracket = nextOpen;
            }
        }
    }
}


function powerOf(a, b){
    return Math.pow(a, b);
}

function add(a, b){
    return(a + b);
}

function mult(a, b){
    return (a*b);
}

function div(a, b){
    return (a/b);
}

//take an expression without brackets, a math parameter +-/^*, and an operation add, sub etc
function singleOperation(splitExpression, charParameter, operation){
    if (splitExpression.indexOf(charParameter) !== -1){
        //locate operator
        var index = splitExpression.indexOf(charParameter);
        
        //perform given operation with numbers before and after operator
        var toReplace = (operation(splitExpression[index-1], splitExpression[index+1]));
        //splice new total into original split expression
        splitExpression.splice(index-1, 3, toReplace);
    }
    return splitExpression;
}

//take a set of operations without brackets
//everytime you do an operation, restart function until single number is left
function performOperation(splitExpression){
    //check first for power, highest precedence
    if (splitExpression.indexOf("^") !== -1){
        performOperation(singleOperation(splitExpression, '^', powerOf));
    }
    //next check for multiplication, and then div
    else if (splitExpression.indexOf("*") !== -1) {
        //if both mult and div, do whichever one is first
        if (splitExpression.indexOf("/") !== -1){
            if (splitExpression.indexOf("*") < splitExpression.indexOf("/")){
                performOperation(singleOperation(splitExpression, '*', mult));
            } else {
                performOperation(singleOperation(splitExpression, '/', div));
            }
        }
         performOperation(singleOperation(splitExpression, '*', mult));
    }
    else if (splitExpression.indexOf("/") !== -1){
        performOperation(singleOperation(splitExpression, '/', div));   
    }
    //after mult/div check for add
    else if (splitExpression.indexOf("+") !== -1){
        performOperation(singleOperation(splitExpression, '+', add));
    }
    //if not operations are left, return total 
    return(splitExpression);
}


function stringNumbersToInt(curr) {
    var newCurr = parseFloat(curr);
    if (newCurr) {
        return newCurr;
    }
    else return curr;
}

function noEmptyStrings(curr){
    if (curr) {
            return curr;
        }
}

function toNumStringArray(someString) {
    
    var arr = someString.replace(/\s/g, "").split(/([\+\-\*\/\^\(\)])/);

    arr = arr.map(stringNumbersToInt);

    arr = arr.filter(noEmptyStrings);

    var i = 1;
    while (i < arr.length) {
        if (arr[i] === "-") {
            if (typeof arr[i - 1] === "number") {
                arr[i] = "+-";
            }
        }
        if (arr[i] === "(") {
            if (typeof arr[i - 1] === "number") {
                arr[i] = "*(";
            }
        }
        if (arr[i] === ")") {
            if (typeof arr[i + 1] === "number") {
                arr[i] = ")*";
            }
        }
        i++;
    }
    arr = arr.join("");
    arr = arr.split(/([\+\*\/\^\(\)])/);

    arr = arr.filter(noEmptyStrings);
    
    return arr = arr.map(stringNumbersToInt);
    
}



module.exports={
    calculator: calculator
}