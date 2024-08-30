const start = document.querySelector('#start');
const game = document.querySelector('#game');
const time = document.querySelector('#time');
const result = document.querySelector('#result');
const timeH1 = document.querySelector('#time-header');
const resultH1 = document.querySelector('#result-header');
const inputTime = document.querySelector('#game-time');
let score = 0;
let isGameActive = false;

start.addEventListener('click', startGame);
game.addEventListener('click', gameBoxClick);
inputTime.addEventListener('change', () => {
    time.innerText = inputTime.value;
    timeH1.classList.remove('hide');
    resultH1.classList.add('hide');
})

function startGame() {
    isGameActive = true;
    score = 0;
    inputTime.setAttribute('disabled', '');
    timeH1.classList.remove('hide');
    resultH1.classList.add('hide');
    time.textContent = inputTime.value;
    start.classList.add('hide');
    game.style.backgroundColor = 'white';
    renderBox();
    const timer = setInterval(() => {
        const CurrentTime = Number(time.textContent);

        if(CurrentTime <= 0){
            clearInterval(timer);
            endGame()
        } else {
            const numInSpan = Number(time.textContent) - 0.1
            time.textContent = numInSpan.toFixed(1);
        }
    }, 100);
}

const endGame = () => {
    isGameActive = false;
    game.innerHTML = '';
    inputTime.removeAttribute('disabled');
    start.classList.remove('hide');
    game.style.backgroundColor = '#ccc';
    timeH1.classList.add('hide');
    resultH1.classList.remove('hide');
    result.textContent = score;
}

const renderBox = () => {
    game.innerHTML = '';
    const div = document.createElement('div');
    let randomSize = getRandom(30, 100);
    let maxDelta = 300 - randomSize;
    let randomTop = getRandom(0, maxDelta);
    let randomLeft = getRandom(0, maxDelta);
    div.style.width = `${randomSize}px`;
    div.style.height = `${randomSize}px`;
    div.style.position = 'absolute';
    div.style.background = 'black';
    div.style.top = `${randomTop}px`;
    div.style.left = `${randomLeft}px`;
    div.style.cursor = 'pointer';
    div.classList.add('box');
    game.append(div);
}

function gameBoxClick(event) {
    if (event.target.classList.contains('box')) {
        score += 1;
        renderBox();
    }

    if(!isGameActive){
        return;
    }
}

function getRandom(min, max) {
    return (Math.floor(Math.random() * (max - min) + min))
}