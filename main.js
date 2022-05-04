const canvas = document.getElementById("canvas");
const game = 400;
const snakeColor = "pink"
const square = 20
canvas.width = canvas.height = game ;
const ctx = canvas.getContext('2d');
const backGround = "white" ;
ctx.fillStyle = backGround ;
ctx.fillRect(0,0,game,game);
let diem = 0
const left = 37;
const up = 38;
const right = 39;
const down = 40;
const tamdung = 32;
let status = "n";
let thua = new Audio()
thua.src = "1.mp3"
let an = new Audio()
an.src = "an.mp3"





class Vector {
    x;
    y;
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

let currentDirection = new Vector(-1,0);





class Snake {
    constructor() {
        this.body = [
            new Vector(square*7,square*8),
            new Vector(square*8,square*8),
            new Vector(square*9,square*8),
        ]
        this.head = this.body[0]
        this.speed = new Vector(-1,0)
    }
    draw() {

        ctx.fillStyle = 'purple'
        ctx.fillRect(this.body[0].x, this.body[0].y, square, square)
        ctx.fillStyle = snakeColor
        for (let i = 1; i < this.body.length; i++) {
            (ctx.fillRect(this.body[i].x, this.body[i].y, square, square))

        }
    }

    clear() {
        ctx.fillStyle = snakeColor
        ctx.fillRect(this.body[0].x, this.body[0].y, square, square)
        ctx.fillStyle = backGround
        for (let i = 1; i < this.body.length; i++) {
            ctx.fillRect(this.body[i].x, this.body[i].y, square, square)
        }
    }
    handleBound (){
        if(this.head.x < 0){
            this.head.x = game - square
        }
        if (this.head.x > game - square){
            this.head.x = 0
        }

        if(this.head.y < 0){
            this.head.y = game - square
        }
        if (this.head.y > game - square){
            this.head.y = 0
        }

    }

    move(){
        this.clear()
        for (let i = this.body.length-1; i >= 1 ; i--) {
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }
        this.body[0].x += this.speed.x * square;
        this.body[0].y += this.speed.y * square;
        this.handleBound()
        this.draw()
    }
    checkEat(food){
        let head = this.body[0]

        return food.x === head.x && food.y === head.y
    }
    grow(){
        this.clear()
        let snakelength = this.body.length
        let mountX = this.body[snakelength - 1].x - this.body[snakelength -2 ].x
        let mountY = this.body[snakelength -1].y - this.body[snakelength -2].y

        let newPart = new Vector(
            this.body[snakelength - 1].x + mountX,
            this.body[snakelength -1].y + mountY,
        )
        this.body.push(newPart)
        this.draw()

    }


}
class Food{
    constructor(x,y) {
        this.x = x
        this.y =y

    }
    draw(){
        ctx.fillStyle = 'orange'
        ctx.fillRect(this.x , this.y, square,square)
    }
    clear(){
        ctx.fillStyle = backGround
        ctx.fillRect(this.x , this.y, square,square)
    }
    getRandomNumber(){

        let randomNumber = Math.floor(Math.random()  * game)
        randomNumber -= randomNumber % square
        return randomNumber
    }
    spawn(){
        this.clear()
        this.x = this.getRandomNumber()
        this.y = this.getRandomNumber()
        this.draw()

    }
}

function reset(){
    player = new Snake();
    ctx.fillStyle = backGround ;
    ctx.fillRect(0,0,game,game);
    food.draw();
    food.clear();
    food.spawn();
    food.getRandomNumber();
}

function pause(){
    if (status === "n"){
        status="pause"
    }else if (status == "pause"){
        status = "n"
    }
}

let player = new Snake()
player.draw()
let food = new Food()
food.spawn()
setInterval(() =>{
      if(status=='n'){
          player.move()
          for (let i = 1; i < player.body.length; i++) {
              if (player.body[0].x == player.body[i].x && player.body[0].y == player.body[i].y){
                  thua.play()
                  alert("Good game but stupid game")
                  player = new Snake();
                  ctx.fillStyle = backGround ;
                  ctx.fillRect(0,0,game,game);
                  food.draw();
                  food.clear();
                  food.spawn();
                  food.getRandomNumber();
                  document.getElementById("diem").innerHTML = diem = 0;

              }
          }
          if(player.checkEat(food)){
              an.play()
              diem++
              player.grow()
              food.spawn()
              document.getElementById("diem").innerHTML = diem
          }
      }
    }
    ,200);


document.onkeydown = function (e){
    switch (e.keyCode) {
        case left:
            if (currentDirection.x === 1) break;
            player.speed = new Vector(-1,0);
            currentDirection = new Vector(-1,0);
            break;
        case right:
            if (currentDirection.x === -1) break;
            player.speed = new Vector(1,0);
            currentDirection = new Vector(1,0);
            break;
        case up:
            if (currentDirection.y === 1) break;
            player.speed = new Vector(0,-1);
            currentDirection = new Vector(0,-1);
            break;
        case down:
            if (currentDirection.y === -1) break;
            player.speed = new Vector(0,1);
            currentDirection = new Vector(0,1 );
            break;
        case tamdung:
            pause()
        default:
            break;
    }
}








