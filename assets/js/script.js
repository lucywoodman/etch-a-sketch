const canvas = document.querySelector('#etch-a-sketch');
const border = document.querySelector('.border');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
const MOVE_AMOUNT = 50;

const { width, height } = canvas;

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

function draw({ key }) {
    hue += 5;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath(); //start the path
    ctx.moveTo(x, y);
    switch (key) {
        case 'ArrowUp':
            y -= MOVE_AMOUNT;
            break;
        case 'ArrowDown':
            y += MOVE_AMOUNT;
            break;
        case 'ArrowLeft':
            x -= MOVE_AMOUNT;
            break;
        case 'ArrowRight':
            x += MOVE_AMOUNT;
            break;
        default:
            break;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
}

function handleKey(e) {
    if (e.key.includes('Arrow')) {
        e.preventDefault();
        draw({ key: e.key });
    }
}

function clearCanvas() {
    border.classList.add('shake');
    ctx.clearRect(0, 0, width, height);
    border.addEventListener('animationend',
        function () {
            border.classList.remove('shake');
        },
        { once: true }
    );
}

window.addEventListener('keydown', handleKey);
shakebutton.addEventListener('click', clearCanvas);