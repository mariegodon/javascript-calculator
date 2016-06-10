
import React from 'react';
import ReactDOM from 'react-dom';

import calculate from './calculate.js';

class Calculator extends React.Component {
    constructor(props){
        super(props);
        this.state={
            display: ""
        };
        this.handleKeydown=this.handleKeydown.bind(this);
        this.appendExpression=this.appendExpression.bind(this);
        this.clearDisplay=this.clearDisplay.bind(this);
        this.calculateExpression=this.calculateExpression.bind(this);
    }
    
    componentDidMount(){
        document.addEventListener('keydown', this.handleKeydown);
        this.decimalAdded=false;
        this.bracketCounter={
            open: 0,
            close: 0      
        }
    }
    
    componentWillUnmount(){
        document.removeEventListener('keydown', this.handleKeydown);
    }
    
    handleKeydown(e){
        e.preventDefault();
        switch(e.which){
            //0 and )
            case 48:
                //close bracket
                if(e.shiftKey === true){
                    this.appendExpression(')');
                    return;
                } else {
                    this.appendExpression('0');
                    return;
                }
            //1    
            case 49:
                this.appendExpression('1');
                return;
            //2
            case 50:
                this.appendExpression('2');
                return;
            //3
            case 51:
                this.appendExpression('3');
                return;
            //4
            case 52:
                this.appendExpression('4');
                return;
            //5
            case 53:
                this.appendExpression('5');
                return;
            //6
            case 54:
                this.appendExpression('6');
                return;
            //7
            case 55:
                this.appendExpression('7');
                return;
            //8 and *
            case 56: 
                //multiply
                if(e.shiftKey === true){
                    this.appendExpression('*');
                    return;
                } else {
                    this.appendExpression('8');
                    return;
                }
            //9 and (
            case 57:
                //open bracket
                if(e.shiftKey === true){
                    this.appendExpression('(');
                    return;
                } else {
                    this.appendExpression('9');
                    return;
                }            
            //enter leads to equal
            case 13:
                this.calculateExpression();
                return;
            //= and +
            case 187:
                //=
                if(e.shiftKey === true){
                    this.appendExpression('+');
                    return;
                } else {
                    this.calculateExpression();
                    return;
                }
            //-
            case 189:
                this.appendExpression('-');
                return;
            //division /
            case 191:
                this.appendExpression('/');
                return;
            //backspace to clear
            case 8:
                this.clearDisplay();
        }
    }
    
    //include expression logic directly in component to ensure valid expression is fed to calculate function
    appendExpression(char){
        var operators=['+', '-', '/', '*', '^', '(', ')'];
        //append expression only if current display does not read ERR
        if (this.state.display != 'ERR'){      
            //ensure only one decimal per number can be added
            if(char === '.'){
                if(this.decimalAdded === true){
                    return;
                } else {
                    this.decimalAdded = true;
                }
            } 
            else if(operators.indexOf(char) != -1){
                if(char === '('){
                    this.bracketCounter.open++;
                } else if (char === ')'){
                    this.bracketCounter.close++;
                }
                this.decimalAdded = false;
            }
            var newDisplay = this.state.display+char;
            this.setState({display: newDisplay});
        }
    }
    
    clearDisplay(){
        this.decimalAdded=false;
        this.bracketCounter.open=0;
        this.bracketCounter.close=0;
        this.setState({display: ''});
    }
    
    calculateExpression(){
        //check if expression entered is valid and balanced ie equal amount of open and close brackets
        if(this.bracketCounter.open === this.bracketCounter.close){
            var solution = calculate.calculator(this.state.display);
            this.setState({display: solution});
        } else {
            this.setState({display: "ERR"})
        }
    }
    
  render() {
    return (
        <div className='calc'>
            <div className='calcDisplay'>{this.state.display}</div>
            
            <div className='calcRow'>
                <button type='button' onClick={() => this.appendExpression('^')} className='operator'>^</button>
                <button type='button' onClick={() => this.appendExpression('(')} className='operator'>(</button>
                <button type='button' onClick={() => this.appendExpression(')')} className='operator'>)</button>
                <button type='button' onClick={() => this.appendExpression('/')} className='operator'>/</button>
            </div>
            
            <div className='calcRow'>
                <button type='button' onClick={() => this.appendExpression('7')}>7</button>
                <button type='button' onClick={() => this.appendExpression('8')}>8</button>
                <button type='button' onClick={() => this.appendExpression('9')}>9</button>
                <button type='button' onClick={() => this.appendExpression('*')} className='operator'>*</button>
            </div>

            <div className='calcRow'>
                <button type='button' onClick={() => this.appendExpression('4')}>4</button>
                <button type='button' onClick={() => this.appendExpression('5')}>5</button>
                <button type='button' onClick={() => this.appendExpression('6')}>6</button>
                <button type='button' onClick={() => this.appendExpression('-')} className='operator'>-</button>
            </div>

            <div className='calcRow'>
                <button type='button' onClick={() => this.appendExpression('1')}>1</button>
                <button type='button' onClick={() => this.appendExpression('2')}>2</button>
                <button type='button' onClick={() => this.appendExpression('3')}>3</button>
                <button type='button' onClick={() => this.appendExpression('+')} className='operator'>+</button>
            </div>
            
            <div className='calcRow'>
                <button type='button' onClick={this.clearDisplay} className='clear'>C</button>
                <button type='button' onClick={() => this.appendExpression('0')}>0</button>
                <button type='button' onClick={() => this.appendExpression('.')}>.</button>
                <button type='button' onClick={this.calculateExpression} className='operator'>=</button>
            </div>            
            
        </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.querySelector('#app'));