const board = document.getElementById('board');
const scoreTxt = document.querySelector('.score');
const tabTxt = document.querySelector('.tab');
const arrows = document.querySelectorAll('#arrow');
const context = board.getContext('2d');
const btn = document.querySelector('.reset');

btn.addEventListener('click',()=>
{
location.reload();
}
)
let score = 0;

const height = board.height;
const width = board.width;
const unit = 15;

let xvel = 15;
let yvel = 0;
let active = true;
let started = false;
let pause = false;

document.addEventListener("DOMContentLoaded",function()
{


let snake =[{x:unit*3,y:0},{x:unit*2,y:0},
              {x:unit,y:0},{x:0,y:0}];

window.addEventListener('keydown',keyPress)

startGame();

function startGame()
{
context.fillStyle = "rgb(102, 223, 102)";
context.fillRect(0,0,width,height);
createFood();
displayFood();
drawSnake();
}

function clearBoard()
{
    context.fillStyle = "rgb(102, 223, 102)";
    context.fillRect(0,0,width,height);
}

function createFood()
{
    xfood = Math.floor(Math.random()*width/unit)*unit;
    yfood = Math.floor(Math.random()*height/unit)*unit;
}

function displayFood()
{
    context.fillStyle = "red";
    context.fillRect(xfood,yfood,unit,unit);
}

function drawSnake()
{
    context.fillStyle = "white";
    context.strokeStyle = "black";
    snake.forEach((part)=>
    {
        context.fillRect(part.x,part.y,unit,unit)
        context.strokeRect(part.x,part.y,unit,unit)
    })
    context.fillStyle ="skyblue";
    context.fillRect(snake[0].x,snake[0].y,unit,unit)
    context.strokeRect(snake[0].x,snake[0].y,unit,unit)
}

function moveSnake()
{

    const head = {x:snake[0].x+xvel,
                  y:snake[0].y+yvel};
    snake.unshift(head);
    if(snake[0].x == xfood && snake[0].y == yfood)
    {
        createFood();
        score+=1;
        scoreTxt.textContent = score;
    }              
    else
    snake.pop();
}    

function nextMove()
{
if(active && !pause)
{
    tabTxt.textContent = "Pause";
    setTimeout(()=>
    {
        clearBoard();
        displayFood();
        moveSnake();
        drawSnake();
        checkMatch();
        nextMove();
    },250);
}
if(!active)
{
    clearBoard();
    context.font = "oblique 25px serif";
    context.fillStyle ="red";
    context.textAlign ="center";
    context.fillText('Game Over!',width/2,height/2);
}
}

arrows.forEach((arrow)=>
{
    arrow.addEventListener('click',(e)=>
    {
    side = e.target.dataset.side;
    manualKey(side)
})
})

function manualKey(side)
{
    console.log(side)
    if(!started)
{
   started = true;
   nextMove();
}
if(side === "right" && xvel!=-unit)
{
    xvel=unit;
    yvel=0;
}
else if(side === "left" && xvel!=unit)
{
    xvel=-unit;
    yvel=0;
}
else if(side === "down" && yvel!=-unit)
{
    xvel=0;
    yvel=unit;
} 
else if(side === "up" &&  yvel!=unit)
{
    xvel=0;
    yvel=-unit
}
else if(side === "tab")
{
    if(pause)
    {
        pause = false;
        nextMove();
    }
    else{pause = true;
        tabTxt.textContent = "Start";}
}
}

function keyPress(event)
{
    if(!started)
    {
       started = true;
       nextMove();
    }

    const space = 32;
    if(event.keyCode == space)
    {
        if(pause)
        {
            tabTxt.textContent = "Pause";
            pause = false;
            nextMove();
        }
        else
        {
            pause = true;
            tabTxt.textContent = "Start";
        }
    }
    const left = 37;
    const right = 39;
    const up = 38;
    const down = 40;

    switch(true)
    {
    case(event.keyCode == left && xvel!=unit):
        xvel=-unit;
        yvel=0;
        break;
    case(event.keyCode == right && xvel!=-unit):
        xvel=unit;
        yvel=0;
        break;
    case(event.keyCode == up && yvel!=unit):
        xvel=0;
        yvel=-unit;
        break; 
    case(event.keyCode == down && yvel!=-unit):
        xvel=0;
        yvel=unit;
        break;
    }
}

function checkMatch()
{
    if(snake[0].x<0 || snake[0].y<0 ||
        snake[0].x>=width || snake[0].y>=height)
    {
        active = false;
    }
    for(let i=1;i<snake.length;i+=1)
    {
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y)
        {
            active = false;
        }
    }
}

})