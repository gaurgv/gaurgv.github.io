document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('neuronCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;

    const numberOfParticles = 55;

    // Particle class
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        // Method to draw individual particles
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 20;
            ctx.fill();
        }
        // Check particle position, move the particle, draw the particle
        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    // Create particle array
    function init() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            let size = Math.random() * 5;
            let x = Math.random() * (window.innerWidth - size * 2);
            let y = Math.random() * (window.innerHeight - size * 2);
            let directionX = (Math.random() * 2) - 1;
            let directionY = (Math.random() * 2) - 1;
            let color = 'rgba(0, 255, 255, 0.8)';

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    // Animate particles
    function animate() {
        ctx.fillStyle = 'rgba(16, 16, 16, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }

        connect();
        requestAnimationFrame(animate);
    }

    // Check if particles are close enough to draw a line between them
    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                    + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width/7) * (canvas.height/7)) {
                    opacityValue = 1 - (distance/20000);
                    ctx.strokeStyle = 'rgba(0, 255, 255,' + opacityValue + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Resize event
    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    init();
    animate();
});