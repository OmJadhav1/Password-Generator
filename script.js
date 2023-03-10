const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {   
    upper: getRandomUpper,
    lower: getRandomLower,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardEl.addEventListener('click', () => {
    const password = resultEl.innerText;
    if(!password){
        return;
    }

    navigator.clipboard.writeText(password);
})

generateEl.addEventListener('click' , ()=> {
    const length = +lengthEl.value
    const haslower = lowercaseEl.checked
    const hasupper = uppercaseEl.checked
    const hasnumber = numbersEl.checked
    const hassymbol = symbolEl.checked
    
    resultEl.innerText = generatePassword(hasupper, haslower, hasnumber, hassymbol, length);
})

function generatePassword(upper, lower, number, symbol, length){
    let generatedPassword = '';
    const typecount = upper+lower+number+symbol;
    
    const typesArr = [{upper},{lower},{number},{symbol}].filter(item => Object.values(item)[0]);

    if(typecount === 0){
        return ''
    }

    for(let i=0; i < length; i += typecount){
        typesArr.forEach(type => {
            const funcname = Object.keys(type)[0]
            generatedPassword += randomFunc[funcname]()
        })
    }

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() *26) +97);
}
function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() *26) +65);
}
function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() *10) +48);
}

function getRandomSymbol(){
    const symbols = '!@#$%^&*(){}[]=<>/'
    return symbols[Math.floor(Math.random() * symbols.length)];
}