var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();



class Shape{
    constructor(){
        if(new.target === Shape)
            throw new TypeError("Cannot construct Shape instances directly");
    }

    draw();
}

