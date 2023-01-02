let snakeArr = [{x:2 , y:3}];
let food = {x:7, y:9};
let direction = {x:0 , y:0};
let bgSound = new Audio("music/music.mp3");
let foodSound = new Audio("music/food.mp3");
let gameOverSound = new Audio("music/gameover.mp3");
let moveSound = new Audio("music/move.mp3");
let start = 0;
let score = 0;
 
//Game Functions
setInterval(function(){
    gameEngine();
},150 );

function gameEngine(){
    //update snakeArary
    if(isCollide()){
        gameOverSound.play();
        bgSound.pause();
        alert("GameOver Press Any Key to Play Again")
        direction = {x:0 , y:0};
        score = 0;
        start = 0;
        food = {x:7, y:9};
        snakeArr =  [{x:2 , y:3}];
    }

    function isCollide(){
        for(var i=1;i<snakeArr.length ; i++){
            if(snakeArr[0].x == snakeArr[i].x &&
                snakeArr[0].y == snakeArr[i].y){
                 return true;
            }
        }

        if(snakeArr[0].x < 0 || snakeArr[0].x >18 || snakeArr[0].y < 0 || snakeArr[0].y >18 )
        return true;

        return false;
    }

    //when food is eaten
    if(food.x === snakeArr[0].x && food.y === snakeArr[0].y){
        score++;
        foodSound.play();
        a = 2;
        b = 16;
        snakeArr.unshift({x:snakeArr[0].x + direction.x , y:snakeArr[0].y + direction.y});
        food = { x: Math.floor(a + Math.random()*(b-a+1)) , y: Math.floor(a + Math.random()*(b-a+1))}
    }   

    // updating score
    document.querySelector(".score").innerHTML = `Score: ${score}`;
    if(localStorage.getItem('highscore') == null){
        localStorage.setItem('highscore',JSON.stringify(score));
    }
       
    let temp = localStorage.getItem('high');
    if(JSON.parse(temp) < score){
        localStorage.setItem('highscore',JSON.stringify(score));
        document.querySelector(".highscore").innerHTML = `HiScore: ${score}`
    }
    
    
    
    //move snake
    for(var i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]= {...snakeArr[i]};
    }
    snakeArr[0].x = snakeArr[0].x + direction.x;
    snakeArr[0].y = snakeArr[0].y + direction.y;
    if(direction.x !=0 || direction.y!=0)
       moveSound.play();
     

    //display snakeArray
    board = document.getElementById("board");
    board.innerHTML = "";
    snakeArr.forEach(function(element,index){
        snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = element.y;
            snakeElement.style.gridColumnStart = element.x;
            if(index === 0){
                snakeElement.classList.add("head");
            }else{
                snakeElement.classList.add("tail");
            }
            board.appendChild(snakeElement);
    });  
    
    //display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);

}

// if(start == 0){
//     alert("press any key to Start");
//     start++;
// }

//main logic
if(start == 0){
    alert("Press any key to start");
}
window.addEventListener('keydown',function(event){
    if(start == 0){
       bgSound.play(); 
       direction.y = 1;
       start = 1;
    }
    
    var temp = event.key;
    if(temp === 'ArrowUp'){
        direction.x = 0;
        direction.y = -1;
    }else if(temp === 'ArrowDown'){
        direction.x = 0;
        direction.y = 1;
    }else if(temp === 'ArrowLeft'){
        direction.x = -1;
        direction.y = 0;
    }else if(temp === 'ArrowRight'){
        direction.x = 1;
        direction.y = 0;
    }
});

 