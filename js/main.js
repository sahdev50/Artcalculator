const input = document.querySelector("input");

document.querySelectorAll(".num__key").forEach(el =>{
    el.onclick = () => (input.value = input.value !== "0" ? input.value + el.innerHTML : el.innerHTML);
    //display numbers using text indicates at html number keys.
});

const buffer=[];

const opCallback = opName => () => {
    let currentVal = parseFloat(input.value);

    if(opName === "percent") {
        currentVal *= 0.01;
        input.value = currentVal;
    }
    else{
        if(buffer && buffer.length) {
            buffer.push({ value:currentVal });

            const result = evalute(buffer);

            buffer.push({ value:result });
            buffer.push({ value:opName });

            input.value = "";
        }
        else{
            buffer.push({ value:currentVal });
            buffer.push({ value:opName });
            input.value = "";
        }
    }
}

const evalute = buffer =>{
    const secondOperand = buffer.pop().value;
    const operator = buffer.pop().value;
    const firstOperand = buffer.pop().value;

    switch(operator)
    {
        case "add":
            return firstOperand + secondOperand;
            break;

        case "sub":
            return firstOperand - secondOperand;
            break;

        case "multiply":
            return firstOperand * secondOperand;
            break;

        case "divide":
            return firstOperand / secondOperand;
            break;

        default:
            return secondOperand;
            break;
    }
}

for(const opName of ["add", "sub", "multiply", "divide", "percent"]){
    document.querySelector(`.op__key[op=${opName}]`)
    .onclick = opCallback(opName);
    //loop through all op__key oprations.
}

document.querySelector(".eq__key").onclick = 
() => {
    if(buffer && buffer.length)
    {
        buffer.push({ value: parseFloat(input.value)});
        input.value = evalute(buffer);
    }
}

document.querySelector(".op__key[op=clear]").onclick =
() => {
    input.value = 0;
    buffer.length = 0;
}

document.querySelector(".op__key[op=negate]").onclick = 
() =>
        (input.value = -parseFloat(input.value));
