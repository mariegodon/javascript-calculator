function calculator(someString) {

    var stringArr = toNumStringArray(someString.replace(/--/g, '+'));
    var openBracket = stringArr.lastIndexOf('(');

    //locate last open bracket in array
    while (openBracket < stringArr.length){
        //if there is no open bracket ie only one mathematical expression
        if (openBracket === -1) {
            stringArr = performOperation(stringArr);
            return (stringArr[0]);
        }
        else {
            //locate the next closing brackets
            var nextClose = stringArr.indexOf(')', openBracket + 1);
            var insideParentheses = stringArr.slice(openBracket + 1, nextClose);
            var convertedBracket = performOperation(insideParentheses);
            //replace this bracket in the array with the total
            stringArr.splice(openBracket, (nextClose - openBracket + 1), convertedBracket[0]);
            //find the new last open bracket
            openBracket = stringArr.lastIndexOf('(');
            stringArr = toNumStringArray(stringArr.join(''));
        }
    } 
}

//math functions to perform single operations
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
//recursive function to do operations until a single number is left
function performOperation(splitExpression){
    //check first for power, highest precedence
    if (splitExpression.indexOf('^') !== -1){
        performOperation(singleOperation(splitExpression, '^', powerOf));
    }
    //next check for multiplication, and then div
    else if (splitExpression.indexOf('*') !== -1) {
        //if both mult and div, do whichever one is first
        if (splitExpression.indexOf('/') !== -1){
            if (splitExpression.indexOf('*') < splitExpression.indexOf('/')){
                performOperation(singleOperation(splitExpression, '*', mult));
            } else {
                performOperation(singleOperation(splitExpression, '/', div));
            }
        }
        performOperation(singleOperation(splitExpression, '*', mult));
    }
    else if (splitExpression.indexOf('/') !== -1){
        performOperation(singleOperation(splitExpression, '/', div));   
    }
    //after mult/div check for add
    else if (splitExpression.indexOf('+') !== -1){
        performOperation(singleOperation(splitExpression, '+', add));
    }
    //if not operations are left, return total 
    return(splitExpression);
}

function toNumStringArray(someString) {

    //split on all operators incluing -
    var arr = someString.split(/([\+\-\*\/\^\(\)])/);

    arr = arr.map(stringNumbersToInt);
    
    arr = arr.filter(noEmptyStrings);

    //replace - with +- where necessary
    //similary replace ( and ) with * where necessary
    var i = 1;
    while (i < arr.length) {
        if (arr[i] === '-') {
            if (typeof arr[i - 1] === 'number') {
                arr[i] = '+-';
            }
        }
        if (arr[i] === '(') {
            if (typeof arr[i - 1] === 'number') {
                arr[i] = '*(';
            }
        }
        if (arr[i] === ')') {
            if (typeof arr[i + 1] === 'number') {
                arr[i] = ')*';
            }
        }
        i++;
    }
    
    arr = arr.join('');
    //split on operators excluding -
    arr = arr.split(/([\+\*\/\^\(\)])/);

    arr = arr.filter(noEmptyStrings);
    
    return arr = arr.map(stringNumbersToInt);
    
}

//map function to transform strings to numbers
function stringNumbersToInt(curr) {
    var newCurr = parseFloat(curr);
    if (newCurr || newCurr === 0) {
        return newCurr;
    } 
    else return curr;
}

//filter function to ensure no empty strings are in array
function noEmptyStrings(curr){   
    if (curr || curr === 0) {
        return true;
    } 
}


module.exports={
    calculator: calculator
}