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

    move() {
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

    move() {
        if (this.rightPressed && this.x < this.canvas.width - this.width) {
            this.x += 7;
        }
        else if (this.leftPressed && this.x > 0) {
            this.x -= 7;
        }
    }

}

//---------------------------------------Bricks--------------------------------------------------

class Brick extends Figure {
    constructor(x, y, width, height) {
        super(x, y);
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


//---------------------------------------Score--------------------------------------------------

class Score extends Figure{
    constructor(x,y){
        super(x,y);
        this.score = 0;
    }

    draw(ctx){
        ctx.font = "16px Arial";
        ctx.fillStyle = "#FFF";
        ctx.fillText(`Score: ${this.score}`, this.x, this.y);
    }

}

//---------------------------------------Lives--------------------------------------------------

class Live extends Figure{
    constructor(x,y){
        super(x,y);
        this.lives = 3;
    }

    draw(ctx){
        ctx.font = "16px Arial";
        ctx.fillStyle = "#FFF";
        ctx.fillText(`Lives: ${this.lives}`, this.x, this.y);
    }

}

//---------------------------------------Game--------------------------------------------------
class Game {
    constructor(canvas, ball, paddle, brickColumnCount, brickRowCount) {
        this.canvas = canvas;
        this.ball = ball;
        this.paddle = paddle;
        this.brickColumnCount = brickColumnCount;
        this.brickRowCount = brickRowCount;
        this.bricks = [];
        this.score = new Score(8,20);
        this.lives = new Live(canvas.width-65,20);

        this.createBricks(75,20);
    }

    keyDownHandler(e) {
        if (e.keyCode == 39) {
            this.paddle.rightPressed = true;
        }
        else if (e.keyCode == 37) {
            this.paddle.leftPressed = true;
        }
    }

    keyUpHandler(e) {
        if (e.keyCode == 39) {
            this.paddle.rightPressed = false;
        }
        else if (e.keyCode == 37) {
            this.paddle.leftPressed = false;
        }
    }


    createBricks(brickWidth, brickHeight) {
        for (let i = 0; i < this.brickColumnCount; i++) {
            this.bricks[i] = [];
            for (let j = 0; j < this.brickRowCount; j++) {
                // bricks[i][j] = {x: 0, y: 0, status: 1};
                this.bricks[i][j] = new Brick(0,0,brickWidth, brickHeight);
            }
        }
    }

    drawBricks(ctx, brickPadding, brickOffsetLeft, brickOffsetTop) {
        for (let i = 0; i < this.brickColumnCount; i++) {
            for (let j = 0; j < this.brickRowCount; j++) {
                let brick = this.bricks[i][j];
                if (brick.lives >= 1) {
                    let brickX = (i * (brick.width + brickPadding)) + brickOffsetLeft;
                    let brickY = (j * (brick.height + brickPadding)) + brickOffsetTop;

                    brick.x = brickX;
                    brick.y = brickY;
                    brick.draw(ctx);

                }
            }
        }
    }

    collisionDetection(ball) {
        for (let i = 0; i < this.brickColumnCount; i++) {
            for (let j = 0; j < this.brickRowCount; j++) {
                let brick = this.bricks[i][j];
                if (brick.lives >= 1) {
                    if (ball.x > brick.x && ball.x < brick.x + brick.width && ball.y > brick.y && ball.y < brick.y + brick.height) {
                        ball.dy = -ball.dy;
                        brick.lives = 0;
                        this.score.score++;
                        if (this.score.score == this.brickRowCount * this.brickColumnCount) {
                            alert("YOU WIN, CONGRATULATIONS!");
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }

    play(ctx) {
        this.drawBricks(ctx,10,30,30);
        this.ball.draw(ctx);
        this.paddle.draw(ctx);
        this.collisionDetection(this.ball);
        this.score.draw(ctx);
        this.lives.draw(ctx);

        this.ball.move();


        if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius || this.ball.x + this.ball.dx < this.ball.radius) {
            ball.dx = -ball.dx;
        }
        if (this.ball.y + this.ball.dy < this.ball.radius) {
            this.ball.dy = -this.ball.dy;
        } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
            if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
                this.ball.dy = -this.ball.dy;
            }
            else {
                this.lives.lives--;
                if (!this.lives.lives) {
                    alert("GAME OVER");
                    document.location.reload();
                }
                else {
                    this.ball.x = this.canvas.width / 2;
                    this.ball.y = this.canvas.height - 30;
                    this.ball.dx = 2;
                    this.ball.dy = -2;
                    this.paddle.x = (canvas.width - this.paddle.width) / 2;
                }
            }
        }


        this.paddle.move();

    }
}


//------------------------------------------Start Game------------------------------------------------------
document.getElementById("start").addEventListener("click", () => {

    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    ball = new Ball(canvas, 10);
    paddle = new Paddle(canvas, 10, 75);

    game = new Game(canvas, ball, paddle, 5, 3);


    document.addEventListener("keydown", e => game.keyDownHandler(e), false);
    document.addEventListener("keyup", e => game.keyUpHandler(e), false);

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.play(ctx);
        requestAnimationFrame(draw);
    }

    draw();
});



