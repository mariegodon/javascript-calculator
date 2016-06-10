
import React from 'react';
import ReactDOM from 'react-dom';

class Calculator extends React.Component {
    constructor(props){
        super(props);
        this.state={
            display: ""
        };
        this.handleKeydown=this.handleKeydown.bind(this);
        this.appendExpression=this.appendExpression.bind(this);
    }
    
    componentDidMount(){
        document.addEventListener('keydown', this.handleKeydown);
    }
    
    componentWillUnmount(){
        document.removeEventListener('keydown', this.handleKeydown);
    }
    
    handleKeydown(e){
        
        // switch(e.which){
        //     e.preventDefault();
        //     //0 and )
        //     case 48:
        //         //close bracket
        //         if(e.shiftKey === true){
                    
        //         } else {
                    
        //         }
        //     //1    
        //     case 49:
        //     //2
        //     case 50:
        //     //3
        //     case 51:
        //     //4
        //     case 52:
        //     //5
        //     case 53:
        //     //6
        //     case 54:
        //     //7
        //     case 55:
        //     //8 and *
        //     case 56: 
        //         //multiply
        //         if(e.shiftKey === true){
                    
        //         } else {
                    
        //         }
        //     //9 and (
        //     case 57:
        //         //open bracket
        //         if(e.shiftKey === true){
                    
        //         } else {
                    
        //         }            
        //     //enter leads to equal
        //     case 13:
        //     //= and +
        //     case 187:
        //         //=
        //         if(e.shiftKey === true){
                    
        //         } else {
                    
        //         }
        //     //-
        //     case 189:
            
        // }
    }
    
    appendExpression(char){
        console.log(char);
        var newDisplay = this.state.display+char;
        this.setState({display: newDisplay});
    }
    
  render() {
    return (
        <div className='calc'>
            <div className='calcDisplay'>{this.state.display}</div>
            
            <div className='calcRow'>
                <button type='button'>C</button>
                <button type='button' onClick={() => this.appendExpression('(')}>(</button>
                <button type='button' onClick={() => this.appendExpression(')')}>)</button>
                <button type='button' onClick={() => this.appendExpression('/')}>/</button>
            </div>
            
            <div className='calcRow'>
                <button type='button' onClick={() => this.appendExpression('7')}>7</button>
                <button type='button' onClick={() => this.appendExpression('8')}>8</button>
                <button type='button' onClick={() => this.appendExpression('9')}>9</button>
                <button type='button' onClick={() => this.appendExpression('*')}>*</button>
            </div>

            <div className='calcRow'>
                <button type='button' onClick={() => this.appendExpression('4')}>4</button>
                <button type='button' onClick={() => this.appendExpression('5')}>5</button>
                <button type='button' onClick={() => this.appendExpression('6')}>6</button>
                <button type='button' onClick={() => this.appendExpression('-')}>-</button>
            </div>

            <div className='calcRow'>
                <button type='button' onClick={() => this.appendExpression('1')}>1</button>
                <button type='button' onClick={() => this.appendExpression('2')}>2</button>
                <button type='button' onClick={() => this.appendExpression('3')}>3</button>
                <button type='button' onClick={() => this.appendExpression('+')}>+</button>
            </div>
            
            <div className='calcRow'>
                <button type='button' onClick={() => this.appendExpression('0')}>0</button>
                <button type='button' onClick={() => this.appendExpression('.')}>.</button>
                <button type='button'>=</button>
            </div>            
            
        </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.querySelector('#app'));