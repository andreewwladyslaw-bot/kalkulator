class Calculator{
    constructor(dataPreviousOperandTextElement,dataCurrentOperandTextElement)
    {
        this.dataPreviousOperandTextElement=dataPreviousOperandTextElement
        this.dataCurrentOperandTextElement=dataCurrentOperandTextElement
        this.clear()
    }
    clear(){
        this.CurrentOperand=''
        this.PreviousOperand=''
        this.operation=undefined
    }
    delete(){

    }
    appendNumber(numbers){
        if(numbers=== '.' && this.CurrentOperand.includes('.')) return
        this.CurrentOperand = numbers
    }
    chooseOperation(operation){

    }
    computer(){

    }
    updateDisplay(){
        this.dataCurrentOperandTextElement.innerText=this.CurrentOperand.toString()=numbers.toString()
    }
}
const numberButton = document.querySelectorAll('[data-numbers]');
const operationButton = document.querySelectorAll('[data-operation]');
const DataEqualsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const AllClearButton = document.querySelector('[data-all-clear]');
const dataPreviousOperandTextElement = document.querySelector('[data-previous-operand]');
const dataCurrentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(dataCurrentOperandButton,dataPreviousOperandButton)

numberButton.forEach(button => {
    button.addEventListener('click',() => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})