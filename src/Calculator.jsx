
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
        this.canAddOperator=false;
        this.canAddNegative=true;
    }
    
    componentWillUnmount(){
        document.removeEventListener('keydown', this.handleKeydown);
    }
    
    handleKeydown(e){
        e.preventDefault();
        switch(e.which){
            case 48:
                if(e.shiftKey){
                    this.appendExpression(')');
                    return;
                } else {
                    this.appendExpression('0');
                    return;
                }
            case 49:
                this.appendExpression('1');
                return;
            case 50:
                this.appendExpression('2');
                return;
            case 51:
                this.appendExpression('3');
                return;
            case 52:
                this.appendExpression('4');
                return;
            case 53:
                this.appendExpression('5');
                return;
            case 54:
                if(e.shiftKey){
                    this.appendExpression('^');
                    return;
                } else {
                    this.appendExpression('6');
                    return;
                }
            case 55:
                this.appendExpression('7');
                return;
            case 56: 
                if(e.shiftKey){
                    this.appendExpression('*');
                    return;
                } else {
                    this.appendExpression('8');
                    return;
                }
            case 57:
                if(e.shiftKey){
                    this.appendExpression('(');
                    return;
                } else {
                    this.appendExpression('9');
                    return;
                }            
            case 13:
                this.calculateExpression();
                return;
            case 187:
                if(e.shiftKey){
                    this.appendExpression('+');
                    return;
                } else {
                    this.calculateExpression();
                    return;
                }
            case 189:
                this.appendExpression('-');
                return;
            case 191:
                this.appendExpression('/');
                return;
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
            //if an operator is clicked, ensure that it is not following another operator
            //exception for negative/minus sign
            else if(operators.indexOf(char) != -1){
                if(char === '('){
                    this.bracketCounter.open++;
                } else if (char === ')'){
                    this.bracketCounter.close++;
                } else if (!this.canAddOperator){
                    if(char === '-' && this.canAddNegative){
                        this.canAddNegative = false;
                    } else {
                        return;
                    }
                }
                this.canAddOperator=false; 
                this.decimalAdded=false;
            //if a number is added, can now enter an operator
            } else {
                this.canAddOperator=true;
                this.canAddNegative=true;
            }
            var newDisplay = this.state.display+char;
            this.setState({display: newDisplay});
        }
    }
    
    clearDisplay(){
        this.decimalAdded=false;
        this.bracketCounter.open=0;
        this.bracketCounter.close=0;
        this.canAddOperator=false;
        this.canAddNegative=true;        
        this.setState({display: ''});
    }
    
    calculateExpression(){
        //check if expression entered is valid and balanced ie equal amount of open and close brackets
        if(this.bracketCounter.open === this.bracketCounter.close){
            var solution = calculate.calculator(this.state.display);
            if(solution || solution === 0){
                this.canAddOperator=true;
                this.canAddNegative=true;
                this.setState({display: solution});
            } else {
                this.setState({display: "ERR"});
            }
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