//Abstract class
class Figure {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        if (typeof this === Figure)
            throw new TypeError("This method is not defined");
    }
}

//---------------------------------------Figure--------------------------------------------------

class Ball extends Figure {

    constructor(canvas, ballRadius) {
        super(canvas.width / 2, canvas.height - 30);
        this.radius = ballRadius;
        this.dx = 2;
        this.dy = -2;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    move(){
        this.x += this.dx;
        this.y += this.dy;
    }
}


//---------------------------------------Paddle--------------------------------------------------

class Paddle extends Figure {
    constructor(canvas, paddleHeight, paddleWidth) {
        super((canvas.width - paddleWidth) / 2, canvas.height - paddleHeight);
        this.canvas = canvas;
        this.height = paddleHeight;
        this.width = paddleWidth;

        this.rightPressed = false;
        this.leftPressed = false;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    keyDownHandler(e) {
        if (e.keyCode == 39) {
            this.rightPressed = true;
        }
        else if (e.keyCode == 37) {
            this.leftPressed = true;
        }
    }

    keyUpHandler(e) {
        if (e.keyCode == 39) {
            this.rightPressed = false;
        }
        else if (e.keyCode == 37) {
            this.leftPressed = false;
        }
    }

    mouseMoveHandler(e) {
        let relativeX = e.clientX - this.canvas.offsetLeft;
        if (relativeX > 0 && relativeX < this.canvas.width) {
            this.x = relativeX - this.width / 2;
        }
    }

}

//---------------------------------------Bricks--------------------------------------------------

class Brick extends Figure {
    constructor(x, y, width, height) {
        super(x,y);
        this.width = width;
        this.height = height;
        this.lives = 1;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}


//---------------------------------------Game--------------------------------------------------

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

ball = new Ball(canvas, 10);
paddle = new Paddle(canvas, 10, 75);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ball.draw(ctx);
    paddle.draw(ctx);

    ball.move();

    if(ball.x + ball.dx > canvas.width-ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }
    if(ball.y + ball.dy > canvas.height-ball.radius || ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    }


    requestAnimationFrame(draw);
}

draw();
// setInterval(draw, 10);