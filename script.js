const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const button = document.getElementById("play-button");

const score = document.getElementById("score");


const block = 50;
let snake = [{ x: block * 5, y: block * 5 }];
let direction = { x: 0, y: 0 };
let food = { x: block * 10, y: block * 10 };
let score_count = 0;

function drawBoard() {
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 16; j++) {
            if (i % 2 !== 0 && j % 2 !== 0) {
                ctx.beginPath();
                ctx.fillStyle = `rgb(43, 183, 43)`;
                ctx.fillRect(i * block, j * block, block, block);
            }
            ctx.beginPath();
            ctx.fillStyle = `rgb(43, 183, 43)`;
            ctx.fillRect(i * 100, j * 100, block, block);
        }
    }
}

function drawSnake() {
    ctx.fillStyle = "red";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, block, block);
    });
}

function drawFood() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(food.x, food.y, 50, 50);
}

function directions(ev) {
    if (ev.keyCode == 37) {
        console.log("Soy flecha izq!");
        if (direction.x === 50) {
            skip;
        }
        direction = { x: -50, y: 0 }
    } else if (ev.keyCode == 38) {
        console.log("Soy flecha para arriba!");
        if (direction.y === 50) {
            skip;
        }
        direction = { x: 0, y: -50 }
    } else if (ev.keyCode == 39) {
        console.log("Soy flecha der!");
        if (direction.x === -50) {
            skip;
        }
        direction = { x: 50, y: 0 }
    } else if (ev.keyCode == 40) {
        console.log("Soy flecha para abajo!");
        if (direction.y === -50) {
            skip;
        }
        direction = { x: 0, y: 50 }
    }
}

function moveSnake() {
    let head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    if (head.x > canvas.width || head.y > canvas.height || head.x < 0 || head.y < 0) {
        console.log("Creo que perdiste");
        food = { x: -100, y: -100 };
        endGame();
        return false;
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * canvas.width / 50) * 50,
            y: Math.floor(Math.random() * canvas.height / 50) * 50
        }
        score_count += 1;
        score.innerHTML = `${score_count}`;
    } else {
        snake.pop();
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    let m = moveSnake();
    drawSnake();
    drawFood();
    if (!m) {
        return false;
    }
}

function startGame() {
    direction = { x: 50, y: 0 };
    let id = setInterval(update, 100);
    if (!update) {
        clearInterval(id);
    }
}

function endGame() {
    window.location.href = './pages/endgame.html';
}

document.addEventListener("keydown", function (ev) {
    directions(ev);
});

button.addEventListener("click", function () {
    startGame();
})

drawBoard();
