let keyMap = { "up": 38, "down": 40, "left": 37, "right": 39, "spacebar": 32, "enter": 13 };

let pos = [200, 200]
let onGround = false
let force = 0

let block = [550,360]
let blockSpeed = 10
let blockSize = [40,40]
let beingHit = false
let lives = 3
let gameOver = false

const moveBlock = () =>{
    if (gameOver){
        return
    }
    if(block[0] <= -40){
        blockSpeed = Math.random() * (16 - 4) + 4;
        blockSize[0] = Math.random() * (50 - 20) + 20;
        let h = Math.random() * (70 - 20) + 20;
        block = [550, 400-h]
        blockSize[1] = h

    }
    block[0] -= blockSpeed
}

const drawBlock = () =>{
    ctx.fillRect(block[0],block[1], blockSize[0],blockSize[1])
}
const drawplayer = () => {
    ctx.fillRect(pos[0], pos[1], 20, 20)
}
const renderLives = () => {
    ctx.font = '20px Gothic';
    ctx.fillText("Lives :  "+ lives, 10, 20)
}

const renderGameOver = () =>{
    if(gameOver){
        ctx.font = '50px Gothic';
        ctx.fillText("GAME OVER", 100, 200)
        if(isKeyPressed(keyMap["enter"])){
            gameOver = false
            lives = 3
            pos = [200,200]
            block [550, 360]
        }
    }
}

const applyGravity = () => {
    pos[1] += 8
}

const movePlayer = () => {
    if (gameOver){
        return
    }
    if (isKeyPressed(32) && onGround)  {
       // pos[1] -= 20
        //pos[1] -= 20
        force = 20
        onGround = false
    }

    pos[1] -= force;
    force--

    if (pos[1] > 400 - 20) {
        pos[1] = 400 - 20
        onGround = true
    }

    if(pos[0] >= block[0]   
        && pos[0] <= block[0]+blockSize[0]
        && pos[1] >= block[1]
        && pos[1] <= block[1]+blockSize[1]) {
            if(beingHit == false){
            console.log('Hit')
            lives -- 
            console.log(lives)
            if(lives == 0){
                console.log('GAME OVER')
                gameOver = true
            }
        } beingHit = true
    }else {
            beingHit = false
        }
}

createGame("game", {
    width: "500px",
    height: "400px",
    background: "#0000ff",
    actions: [{
        action: applyGravity
    }, {
        action: movePlayer
    },{action:moveBlock}],
    renderers: [{
        renderer: drawplayer
    },{renderer:drawBlock},
    {renderer:renderLives},
{renderer:renderGameOver}]
});

gameLoop();