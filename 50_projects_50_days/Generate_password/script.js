const passwordLengthEl = document.querySelector("#length");
const includeUppercaseEl = document.querySelector("#uppercase ");
const includeLowercaseEl = document.querySelector("#lowercase ");
const includeNumbersEl = document.querySelector("#numbers");
const includeSymbolsEl = document.querySelector("#symbols");

const resultEl = document.querySelector("#result");
const clipboard = document.querySelector("#clipboard");
const generate = document.querySelector("#generate");

function getRandomLowercase() {
    return String.fromCharCode(~~(Math.random() * 26 + 97));
}

function getRandomUppercase() {
    return String.fromCharCode(~~(Math.random() * 26 + 65));
}

function getRandomNumbers() {
    return String.fromCharCode(~~(Math.random() * 10 + 48));
}

function getRandomSymbols() {
    const symbols = "!?@#$%^&*(){}[]<>=/,.-+";
    return symbols[~~(Math.random() * symbols.length)];
}

const randomFunc = {
    lower: getRandomLowercase,
    upper: getRandomUppercase,
    number: getRandomNumbers,
    symbol: getRandomSymbols,
};

clipboard.addEventListener("click", () => {
    const textArea = document.createElement("textarea");
    const password = resultEl.innerText;

    if (!password) {
        return;
    }

    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
    alert("Password copied to clipboard");
});

passwordLengthEl.addEventListener("change", function () {
    if (this.value < 4) this.value = 4;
    else if (this.value > 20) this.value = 20;
});

generate.addEventListener("click", () => {
    const length = passwordLengthEl.value;
    const hasLower = includeLowercaseEl.checked;
    const hasUpper = includeUppercaseEl.checked;
    const hasNumber = includeNumbersEl.checked;
    const hasSymbol = includeSymbolsEl.checked;

    resultEl.innerText = generatePassword(
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
        length
    );
});

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = "";
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
        (item) => Object.values(item)[0]
    );

    console.log(typesArr);

    if (typesCount === 0) {
        return "";
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach((type) => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}
