
import React from 'react';
import ReactDOM from 'react-dom';

class Calculator extends React.Component {
    constructor(props){
        super(props);
        this.state={
            display: ""
        }
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
        
    //     switch(e.which){
    //         e.preventDefault();
    //         //0 and )
    //         case 48:
    //             //close bracket
    //             if(e.shiftKey === true){
                    
    //             } else {
                    
    //             }
    //         //1    
    //         case 49:
    //         //2
    //         case 50:
    //         //3
    //         case 51:
    //         //4
    //         case 52:
    //         //5
    //         case 53:
    //         //6
    //         case 54:
    //         //7
    //         case 55:
    //         //8 and *
    //         case 56: 
    //             //multiply
    //             if(e.shiftKey === true){
                    
    //             } else {
                    
    //             }
    //         //9 and (
    //         case 57:
    //             //open bracket
    //             if(e.shiftKey === true){
                    
    //             } else {
                    
    //             }            
    //         //enter leads to equal
    //         case 13:
    //         //= and +
    //         case 187:
    //             //=
    //             if(e.shiftKey === true){
                    
    //             } else {
                    
    //             }
    //         //-
    //         case 189:
            
    //     }
    }
    
    appendExpression(char){
        
    }
    
  render() {
    return (
        <div className='calculator'>
            <div className='calcDisplay'>{this.state.display}</div>
            
            <div className='calcRow'>
                <button type='button'>C</button>
                <button type='button'>(</button>
                <button type='button'>)</button>
                <button type='button'>/</button>
            </div>
            
            <div className='calcRow'>
                <button type='button' onClick={this.appendExpression(7)}>7</button>
                <button type='button' onClick={this.appendExpression(8)}>8</button>
                <button type='button' onClick={this.appendExpression(9)}>9</button>
                <button type='button' onClick={this.appendExpression(*)}>*</button>
            </div>

            <div className='calcRow'>
                <button type='button'>4</button>
                <button type='button'>5</button>
                <button type='button'>6</button>
                <button type='button'>-</button>
            </div>

            <div className='calcRow'>
                <button type='button'>1</button>
                <button type='button'>2</button>
                <button type='button'>3</button>
                <button type='button'>+</button>
            </div>
            
            <div className='calcRow'>
                <button type='button'>0</button>
                <button type='button'>.</button>
                <button type='button'>=</button>
            </div>            
            
        </div>
    );
  }
}

// App.propTypes = {};
// App.defaultProps = {};

ReactDOM.render(<Calculator />, document.querySelector('#app'));