//Abstract class
class Figure {
    constructor() {
        if (new.target === Shape)
            throw new TypeError("Cannot construct Shape instances directly");
    }

    draw(ctx) {
        if (new.target === Shape)
            throw new TypeError("This method is not defined");
    }
}

//---------------------------------------Figure--------------------------------------------------

class Ball extends Figure {
    constructor(canvas, ballRadius) {
        this.x = canvas.width / 2;
        this.y = canvas.height - 30;
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
}


//---------------------------------------Paddle--------------------------------------------------

class Paddle extends Figure {
    constructor(canvas, paddleHeight, paddleWidth) {
        this.canvas = canvas;
        this.height = paddleHeight;
        this.width = paddleWidth;
        this.x = (canvas.width - paddleWidth) / 2;

        this.rightPressed = false;
        this.leftPressed = false;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.canvas.height - this.height, this.width, this.height);
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
            paddleX = relativeX - paddleWidth / 2;
        }
    }

}

//---------------------------------------Bricks--------------------------------------------------

class Brick extends Figure{
    constructor(width, height, brickX, brickY){
        this.width = width;
        this.height = height;
        this.x = brickX;
        this.y = brickY;
        this.lives = 1;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}
