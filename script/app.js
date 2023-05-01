let displayData="0",
operatorPressed=false,
currentOperator="",
memoryData="";
const operatorsStr="+-*/";
function init(){
    const digits=document.querySelectorAll(".digit"),
    operators=document.querySelectorAll(".operator:not(.special-operator)"),
    equal=document.querySelector(".equal"),
    clear=document.querySelector(".clear"),
    toggleSign=document.querySelector(".toggle-sign"),
    backspace=document.querySelector(".backspace");
    digits.forEach(digit=>{
        digit.addEventListener('click',e=>{
            digitclick(e.target.value);
        })
    })
    operators.forEach(operator=>{
        operator.addEventListener('click',e=>{
            operatorClick(e.target.value);
        })
    })
    equal.addEventListener('click',e=>{
        equalClick();
    });
    clear.addEventListener('click',e=>{
        displayData="0",
        operatorPressed=false,
        currentOperator="",
        memoryData="";
        updateDisplay();
    });
    toggleSign.addEventListener('click',e=>{
        displayData=+displayData*(-1);
        updateDisplay();
    });
    backspace.addEventListener('click',e=>{
        backspaceClick();
    })
    document.addEventListener('keydown',e=>{
        const value=e.key;
        if(!isNaN(value) || value==="."){
            digitclick(value);
        }else if(operatorsStr.indexOf(value)>-1){
            operatorClick(value)
        }else if(value==="Enter"){
            equalClick();
        }else if(value==="Backspace"){
            backspaceClick();
        }
    })
}

function claculate(){
    const memory=+memoryData,
    display=+displayData;
    switch(currentOperator){
        case "+":
            displayData=memory+display;
            break;
        case "-":
            displayData=memory-display;
            break;
        case "*":
            displayData=memory*display;
            break;
        case "/":
            if(display===0){
                displayData="Inf."
            }else{
                displayData=memory/display;
            }
            
            break;
    }
    currentOperator="";
    updateDisplay();
   
}
function digitclick(value){
    if(operatorPressed){
        displayData="";
        operatorPressed=false;
    }
    if(value==="."){
        if(displayData.indexOf(".")===-1){
            displayData=displayData+value;
        }
    }else if(displayData==="0" || displayData===""){
        if(value==="0")
        return;
        else displayData=value;
    }else{
        displayData=displayData+value;
    }
    updateDisplay();
}
function operatorClick(value){
    if(!currentOperator){
        memoryData=displayData;
    }else{
        if(memoryData && currentOperator){
            claculate();
            memoryData=displayData;
        }
    }
    operatorPressed=true;
    currentOperator=value;
}
function equalClick(){
    if(!operatorPressed){
        claculate();
    }
    
}
function backspaceClick(){
    if(displayData!=='0'){
        if(displayData.length>1){
            displayData=displayData.slice(0,-1);
        }
        else{
            displayData='0';
        }
        updateDisplay();
    }
}
function updateDisplay(){
    const displayDiv=document.querySelector("#currentDisplay");
    displayDiv.innerHTML=displayData;
}
init()