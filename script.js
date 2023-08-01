// to do :
// promises
// json list with textArrays, passwords
// make it so that the img doesn't appear at the beginning
// pixels lag bad

window.onload = () => {
    const CANVAS = document.getElementById('canvas');
    let CANVAS_WIDTH, CANVAS_HEIGHT;
    ctx = CANVAS.getContext('2d');
    const input1 = document.getElementById('input1');

    // variables change to true after the right input is submitted 
    let done1 = false;
    let done2 = false;
    let done3 = false;

    resizeCanvas();
    window.onresize = resizeCanvas;
    function resizeCanvas() {
        CANVAS_WIDTH = CANVAS.width = window.innerWidth;
        CANVAS_HEIGHT = CANVAS.height = window.innerHeight;
    }

    const mouse = {
        x: undefined,
        y: undefined,
        radius: 10000
    }

    window.onmousemove = (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    }


    setTimeout(typingSequence, 2000); // typing starts after 2 seconds

    function typingSequence() {
        const typedTextSpan = document.querySelector('.typed-text');
        const cursorSpan = document.querySelector('.cursor');
        let speed = 0.5;
        let textArray;
        let typingDelay = 200 * speed;
        let erasingDelay = 100 * speed;
        let newTextDelay = 2000 * speed; // delay between current and next text
        let extraDelay = 250 * speed;
        let afterEraseDelay = 1100 * speed;
        let textArrayIndex = 0;
        let charIndex = 0;
        let textTime;

        if (!(done1)) {
            textArray = ['enter', 'code'];
            textTime = newTextDelay + extraDelay - afterEraseDelay;
            textArray.forEach((v) => {
                textTime += (v.length * (typingDelay + erasingDelay)) + newTextDelay + afterEraseDelay;
            })
            setTimeout(type(), newTextDelay + extraDelay);
            setTimeout(() => {
                document.getElementById('text').style.display = 'none';
                input1.focus();
            }, 11500)
        }

        if (done1 && (!(done2))) {

            textArray = ['well done', 'one more', 'question', 'jak dwóch', 'sanitariuszów', 'nosze', 'przez płot', 'to ten drugi', 'jak?', 'ręce jak?'];
            textTime = newTextDelay + extraDelay - afterEraseDelay;
            textArray.forEach((v) => {
                textTime += (v.length - 1) * (typingDelay + erasingDelay) + newTextDelay + afterEraseDelay;
                console.log(textTime);
            })
            setTimeout(type, newTextDelay + extraDelay);
            setTimeout(() => {
                document.getElementById('text').style.display = 'none';
                input1.style.display = 'block';
                input1.setAttribute('maxlength', '15');
                input1.focus();
            }, 67000);
        }

        if (done2) {
            textArray = ['correct'];
            textTime = newTextDelay + extraDelay - afterEraseDelay;
            textArray.forEach((v) => {
                textTime += (v.length - 1) * (typingDelay + erasingDelay) + newTextDelay + afterEraseDelay;
            })
            setTimeout(type, newTextDelay + extraDelay);
            setTimeout(() => {
                done3 = true;
                document.getElementById('container').style.display = 'none';
            }, 8000);
        }

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            }
            else {
                cursorSpan.classList.remove('typing');
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            }
            else {
                cursorSpan.classList.remove('typing');
                textArrayIndex++;
                setTimeout(type, typingDelay + afterEraseDelay);
            }
        }
    }

    class Effect {
        constructor() {
            this.particlesArray = [];
            this.gap = 4;
            this.img1 = new Image();
            this.img1.src = 'nothing.png';
            this.img1.onload = () => {
                this.img1_width = this.img1.width * 1.3;
                this.img1_height = this.img1.height * 1.3;
                this.scanImage();
            }
        }

        scanImage() {
            ctx.drawImage(this.img1, 0, 0, this.img1_width, this.img1_height);
            const pixels = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT).data;
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            for (let y = 0; y < CANVAS_HEIGHT; y += this.gap) {
                for (let x = 0; x < CANVAS_WIDTH; x += this.gap) {
                    const index = (y * CANVAS_WIDTH + x) * 4;
                    const red = pixels[index];
                    const green = pixels[index + 1];
                    const blue = pixels[index + 2];
                    const alpha = pixels[index + 3];
                    if (alpha > 0) {
                        this.particlesArray.push(new Particle(x, y, red, green, blue, this.gap));
                    }
                }
            }
        }

        draw() {
            this.particlesArray.forEach((particle) => {
                particle.draw();
            })

        }
        initUpdate() {
            this.particlesArray.forEach((particle) => {
                particle.initUpdate();
            })
        }
        update() {
            this.particlesArray.forEach((particle) => {
                particle.update();
            })
        }
    }

    class Particle {
        constructor(x, y, red, green, blue, gap) {
            this.originX = Math.floor(x);
            this.originY = Math.floor(y);
            this.y = Math.random() * CANVAS_HEIGHT;
            this.x = Math.random() * CANVAS_WIDTH;
            this.vx = (Math.random() * 2 - 1);
            this.vy = (Math.random() * 2 - 1);
            this.size = gap;
            this.red = red;
            this.green = green;
            this.blue = blue;
            this.alpha = 0;
            this.color = 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ')'
            this.originColor = this.color;
            this.speedX = 0;
            this.speedY = 0;
            this.friction = 0.9;
            this.ease = 0.1;
            this.distX = 0;
            this.distY = 0;
            this.distance = 0;
            this.force = 0;
            this.angle = 0;
            this.randomVis = Math.floor(Math.random() * 1000);
            this.vis = (this.randomVis > 995) ? true : false;
            this.n = 0.01;

        }
        draw() {
            if (!(this.vis)) this.color =
                'rgba(' + this.red + ',' + this.green + ',' + this.blue + ',' + this.alpha + ')';
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
        initUpdate() {
            if(vis){
                if (this.x < 0 || this.x > CANVAS_WIDTH) this.vx = -this.vx;
                if (this.y < 0 || this.y > CANVAS_HEIGHT) this.vy = -this.vy;

                this.x += this.vx / 5;
                this.y += this.vy / 5;

                this.distX = mouse.x - this.x;
                this.distY = mouse.y - this.y;
                this.distance = (this.distX ** 2 + this.distY ** 2);
                this.force = -mouse.radius / this.distance;

                if (this.distance < (mouse.radius)) {
                    this.angle = Math.atan2(this.distY, this.distX);
                    this.speedX += this.force * Math.cos(this.angle);
                    this.speedY += this.force * Math.sin(this.angle);

                    this.x += (this.speedX *= this.friction) * this.ease / 5;
                    this.y += (this.speedY *= this.friction) * this.ease / 5;
                }
            }
        }
        update() {
            this.vx = (this.originX - this.x) * this.n;
            this.vy = (this.originY - this.y) * this.n;
            this.x += this.vx;
            this.y += this.vy;
            this.n = Math.min(this.n * 1.004, 1);
            this.alpha = Math.min((this.alpha + Math.random() * 0.01), 1);
        }
    }

    const effect = new Effect;

    input1.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            // console.log(input1.value.toLowerCase())
            if (input1.value === '424684') {
                done1 = true;
                input1.blur();
                input1.value = '';
                document.getElementById('text').style.display = 'block'
                typingSequence();
            } else if (input1.value.toLowerCase() === 'wyprostowane' || input1.value.toLowerCase() === 'zgięte' || input1.value.toLowerCase() === 'test66') {
                done2 = true;
                input1.value = '';
                document.getElementById('text').style.display = 'block'

                typingSequence();
            }
        }
    });
    setTimeout(() => { CANVAS.style.display = 'block' }, 30);
    setInterval(animate, 10);
    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        effect.draw();
        if (done3) {
            effect.update();
        } else {
            effect.initUpdate();
        }
    }
}