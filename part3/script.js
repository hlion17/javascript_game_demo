const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 10;
const enemiesArray = [];

// const enemyImage = new Image();
// enemyImage.src = './img/enemy1.png';

let gameFrame = 0;

class Enemy {
    constructor() {
        // this.image = new Image();
        // this.image.src = './img/enemy1.png';
        // this.spriteWidth = 293;
        // this.spriteHeight = 155;

        this.image = new Image();
        this.image.src = './img/enemy2.png';
        this.spriteWidth = 266;
        this.spriteHeight = 188;

        // this.image = new Image();
        // this.image.src = './img/enemy3.png';
        // this.spriteWidth = 218;
        // this.spriteHeight = 177;

        // this.image = new Image();
        // this.image.src = './img/enemy4.png';
        // this.spriteWidth = 213;
        // this.spriteHeight = 213;

        this.speed = Math.random() * 2 + 1;
        this.width = 100;
        this.height = 100;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.newX = Math.random() * canvas.width;
        this.newY = Math.random() * canvas.height;

        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 4 + 1);

        this.angle = 0;

        // For Movement2
        this.angleSpeed = Math.random() - 0.5;
        this.curve = Math.random() * 3;
        // For Movement4
        // this.angleSpeed = Math.random() * 2 + 0.5;
        // this.curve = Math.random() * 200 + 50;

        this.interval = Math.floor(Math.random() * 200 + 50);
    }
    update() {
        function movement1() {
            this.x += Math.random() * 15 - 7.5;
            this.y += Math.random() * 8 - 4;
            // animate sprites
            if (gameFrame % this.flapSpeed === 0) {
                this.frame > 4 ? this.frame = 0 : this.frame++;
            }
        }

        function movement2() {
            this.x -= this.speed;
            this.y += this.curve * Math.sin(this.angle);
            this.angle += this.angleSpeed;
            if (this.x + this.width < 0) this.x = canvas.width;
            // animate sprites
            if (gameFrame % this.flapSpeed === 0) {
                this.frame > 4 ? this.frame = 0 : this.frame++;
            }
        }

        function movement3() {
            this.x = canvas.width / 2 * Math.sin(this.angle * Math.PI / 90) + (canvas.width / 2 - this.width / 2);
            this.y = canvas.height / 2 * Math.cos(this.angle * Math.PI / 270) + (canvas.height / 2 - this.height / 2);
            this.angle += this.angleSpeed;
            if (this.x + this.width < 0) this.x = canvas.width;
            // animate sprites
            if (gameFrame % this.flapSpeed === 0) {
                this.frame > 4 ? this.frame = 0 : this.frame++;
            }
        }

        function movement4() {
            if (gameFrame % this.interval === 0) {
                this.newX = Math.random() * (canvas.width - this.width);
                this.newY = Math.random() * (canvas.height - this.height);
            }
            let dx = this.x - this.newX;
            let dy = this.y - this.newY;
            this.x -= dx / 70;
            this.y -= dy / 70;
        }

        // movement1.call(this);
        movement2.call(this);
        // movement3.call(this);
        // movement4.call(this);
    }
    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

for (let i = 0; i < numberOfEnemies; i++) {
    enemiesArray.push(new Enemy());
}

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    })
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();
