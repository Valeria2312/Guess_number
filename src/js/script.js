import getWord from "./utils.js";

let attempts = 0,
    btnOpenGame,
    formCheckNumber,
    isFirstGame = true,
    currentRandomNumber = 0,
    currentAttempts = 0,
    addHint = false,
    hintContent,
    min = 1,
    max = 100;
const cases = ["попытка", " попытки", "попыток"];
const root = document.querySelector(".root")

const createRandomNumber = (min, max) => {
    if(currentAttempts === 1) {
        currentRandomNumber = Math.round(Math.random() * (max - min) + min);
    }
}


const openGame = () => {
    return `<div class="attempts"></div><form class="checkNumber"><input pattern="-?(\\d+|\\d+.\\d+|.\\d+)([eE][-+]?\\d+)?" type="number" name="number" placeholder="Введите число" /><input type="button" class="btn-checkNumber" value="Проверить"/></form>`
}

const createGame = () => {
  return `<button class="btn-createGame">Начать игру</button>`
}

const createNewGame = () => {
  return`<div><input type="number" name="min" class="min" placeholder="Введите минимальное число"/><input type="number" name="max" class="max" placeholder="Введите миксимальное число"/></div><button class="btn-createNewGame">Начать новую игру</button>`
}

const createHint = (className , text) => {
    if(addHint) {
       const hint = document.querySelector(".hint")
        hint.textContent = text;
    } else {
        const hint = `<span class=${className}>${text}</span>`
        hintContent = document.querySelector(".checkNumber")
        addHint = true
        hintContent.insertAdjacentHTML('afterend', hint);
    }
}

const gameOver = () => {
    return`<div class="attempts">Вы победили! Поздравляем вас! Вам потребовалось ${attempts} ${getWord()}</div><button class="btn-gameOver">Начать новую игру!</button>`
}

const createGameOver = () => {
    root.innerHTML = gameOver();
    const btnGameOver = document.querySelector(".btn-gameOver")
    isFirstGame = false;
    btnGameOver.addEventListener("click", () => {loadedContent(isFirstGame = false)})
}

const checkCurrentNumber = (number) => {
    console.log("currentRandomNumber",currentRandomNumber)
    if( number > currentRandomNumber) {
        createHint("hint", "Ваше число больше, чем мы загадали")
    }
    if (number < currentRandomNumber) {
        createHint("hint", "Ваше число меньше, чем мы загадали")
    }
    if(number === currentRandomNumber) {
        setTimeout(() => {
            createGameOver();
        }, 50)
    }
    if(number > 100) {
        createHint("maxNumber", "Ваше число больше максимального значения")
    } else {
        document.querySelector(".maxNumber")?.remove()
    }
    if(number < 1) {
        createHint("minNumber","Ваше число меньше минимального значения")
    } else {
        document.querySelector(".minNumber")?.remove()
    }
}

const checkingAttempts = () => {
    const hint = document.querySelector(".hint")
    let hintAttempts;
    if(attempts % 3 === 0) {
        if(currentRandomNumber % 2 === 0) {
            hintAttempts = `<span class="hintAttempts">Загаданное число четное</span>`
        } else {hintAttempts = `<span class="hintAttempts">Загаданное число нечетное</span>`}
        hint.insertAdjacentHTML('afterend', hintAttempts);
    }  else {
        document.querySelector(".hintAttempts")?.remove()
    }
}

const checkNumber = () => {
    const number = +(formCheckNumber.previousElementSibling).value;
    attempts++
   const getAttempts = document.querySelector(".attempts")
    getAttempts.textContent =`Попытка ${attempts}`
    //type number
    checkCurrentNumber(number)
    checkingAttempts()
    formCheckNumber.previousElementSibling.value = ''
}

const beginningGame = () => {
    attempts = 0
    root.innerHTML = openGame();
    createRandomNumber(min, max)
    formCheckNumber = document.querySelector(".btn-checkNumber");
    formCheckNumber.addEventListener("click",checkNumber)
}

const beginningNewGame = () => {
    const minValue = document.querySelector(".min");
    const maxValue = document.querySelector(".max");
    max = maxValue.value
    min = minValue.value
    beginningGame()
}

const loadedContent = () => {
    if(isFirstGame === true) {
        root.innerHTML = createGame();
        btnOpenGame = document.querySelector(".btn-createGame");
        btnOpenGame.addEventListener("click", beginningGame);
        currentAttempts = 1;
    } else {
        addHint = false
        root.innerHTML = createNewGame();
        btnOpenGame = document.querySelector(".btn-createNewGame");
        btnOpenGame.addEventListener("click", beginningNewGame);
        currentAttempts = 1;
    }
}

document.addEventListener("DOMContentLoaded", loadedContent)
