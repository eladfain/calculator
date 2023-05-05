let displayData="0",
currentOperator="",
memoryData="",
lastPreesed="";
const operatorsStr="+-*/",
EQUAL="equal",
DIGIT="digit",
OPERATOR="operator";
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
        currentOperator="",
        memoryData="";
        lastPreesed="";
        updateDisplay();
    });
    toggleSign.addEventListener('click',e=>{
        displayData=(+displayData)*(-1);
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
    if(lastPreesed===EQUAL){
        displayData="";
    }else if(lastPreesed===OPERATOR){
        displayData="";
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
    lastPreesed=DIGIT;
    updateDisplay();
}
function operatorClick(value){
    if(!currentOperator){
        memoryData=displayData;
    }else{
        if(memoryData && currentOperator && lastPreesed===DIGIT){
            claculate();
            memoryData=displayData;
        }
    }
    lastPreesed=OPERATOR;
    currentOperator=value;
}
function equalClick(){
    if(lastPreesed!==OPERATOR){
        claculate();
        lastPreesed=EQUAL;
    }
    
}
function backspaceClick(){
    if(+displayData!==0){
        if(+displayData>9){
            displayData=(""+displayData).slice(0,-1);
        }
        else{
            displayData='0';
        }
        updateDisplay();
    }
}
function updateDisplay(){
    const displayDiv=document.querySelector("#currentDisplay");
    if(Number.isInteger(+displayData)){
        displayDiv.innerHTML=displayData;
    }else{
        const stringSplitDisplayData=displayData.toString().split(".");
        displayDiv.innerHTML=`${stringSplitDisplayData[0]}.${stringSplitDisplayData[1].slice(0,3)}`
    }
    
    
}
init()