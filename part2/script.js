const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 10;
// let gameFrame = 0;

/**
 * Image sources
 */
const backgroundLayer1 = new Image();
backgroundLayer1.src = './img/layer-1.png';

const backgroundLayer2 = new Image();
backgroundLayer2.src = './img/layer-2.png';

const backgroundLayer3 = new Image();
backgroundLayer3.src = './img/layer-3.png';

const backgroundLayer4 = new Image();
backgroundLayer4.src = './img/layer-4.png';

const backgroundLayer5 = new Image();
backgroundLayer5.src = './img/layer-5.png';

/**
 * start rendering Background Image after when DOM Object is fully loaded
 */
window.addEventListener('load', function () {

    /**
     * Game speed Control UI
     */
    const slider = document.getElementById('slider');
    slider.value = gameSpeed;

    const showGameSpeed = document.getElementById('showGameSpeed');
    showGameSpeed.innerHTML = gameSpeed;
    slider.addEventListener('change', function (ev) {
        gameSpeed = ev.target.value;
        showGameSpeed.innerHTML = ev.target.value;
    });

    /**
     * Background Layer Class
     */
    class Layer {
        constructor(image, speedModifier) {
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 700;
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
        }
        update() {
            this.speed = gameSpeed * this.speedModifier;

            if (this.x <= -this.width) {
                this.x = 0;  // reset x when image end
            }
            this.x = this.x - this.speed;

            // if use gameFrame variable use this code instead upper code
            // this.x = gameFrame * this.speed % this.width
            // if (this.image.src === './img/layer-4.png') console.log(gameFrame, x);
        }
        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
    }

    /**
     * Set Background Layer
     */
    const layer1 = new Layer(backgroundLayer1, 0.2);
    const layer2 = new Layer(backgroundLayer2, 0.4);
    const layer3 = new Layer(backgroundLayer3, 0.6);
    const layer4 = new Layer(backgroundLayer4, 0.5);
    const layer5 = new Layer(backgroundLayer5, 1);

    const gameObjects = [layer1, layer2, layer3, layer4, layer5];

    /**
     * background animate method
     */
    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        gameObjects.forEach((layer) => {
            layer.draw();
            layer.update();
        });
        // gameFrame--;
        requestAnimationFrame(animate)
    }

    // Start
    animate();
});

