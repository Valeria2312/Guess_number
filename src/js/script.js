let attempts = 0,
    btnOpenGame,
    formCheckNumber,
    isOpenGame = false,
    currentRandomNumber = 0,
    currentAttempts = 0,
    addHint = false;

const root = document.querySelector(".root")

const createRandomNumber = () => {
    if(currentAttempts === 1) {
        currentRandomNumber = Math.round(Math.random() * (100 - 1) + 1);
    }
}


const openGame = () => {
    return `<form class="сheckNumber"><input type="text" name="number" placeholder="Введите число"/><input type="button" class="btn-checkNumber" value="Проверить"/></form>`
}


const createGame = () => {
  return `<button class="btn-createGame">Начать игру</button>`
}


const createHint = (text) => {
    if(addHint) {
       const hint = document.querySelector(".hint")
        console.log(hint)
        hint.textContent = text;
    } else {
        const hint = `<span class="hint">${text}</span>`
        const hintContent = document.querySelector(".сheckNumber")
        console.log(hintContent)
        addHint = true
        hintContent.insertAdjacentHTML('afterend', hint);
    }
}

const checkCurrentNumber = (number) => {
    console.log("currentRandomNumber",currentRandomNumber)
    if( number > currentRandomNumber) {
        createHint("Ваше число больше, чем мы загадали")
        console.log("Ваше число больше, чем мы загадали")
    }
    if (number < currentRandomNumber) {
        createHint("Ваше число меньше, чем мы загадали")
        console.log("Ваше число меньше, чем мы загадали")
    }
    if(number === currentRandomNumber) {
        createHint("Вы победили")
        setTimeout(() => {
            loadedContent()
        }, 1000)
    }
}


const checkNumber = () => {
    const number = +(formCheckNumber.previousElementSibling).value;
    attempts++
    //type number
    checkCurrentNumber(number)
}


const beginningGame = () => {
    root.innerHTML = openGame();
    createRandomNumber()
    formCheckNumber = document.querySelector(".btn-checkNumber");
    formCheckNumber.addEventListener("click",checkNumber)
}


const loadedContent = () => {
    root.innerHTML = createGame();
    btnOpenGame = document.querySelector(".btn-createGame");
    btnOpenGame.addEventListener("click", beginningGame);
    isOpenGame = true;
    currentAttempts = 1;
}

document.addEventListener("DOMContentLoaded", loadedContent)
