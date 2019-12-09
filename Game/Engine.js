const fps = 30;
const interval = 1000/fps;
const renderers = {};
const actions = {};
let onId = 0;
let lastTime   =  (new Date()).getTime();
let canvas,ctx;
let keysPressed = [];


const createGame = (elementId,options)=>{

    options = options || {};

    document.getElementById(elementId).innerHTML = `
        <canvas id="background" width="${options.width}" height="${options.height}" style="position:absolute;top:0;left:0"></canvas>
        <canvas id="mainWindow" width="${options.width}" height="${options.height}" style="position:absolute;top:0;left:0"></canvas>
    `   

    let bctx = document.getElementById("background").getContext("2d");

    bctx.fillStyle = options.background;
    bctx.fillRect(0,0, background.width,background.height);
    canvas = document.getElementById("mainWindow");
    ctx = canvas.getContext('2d');

    options.renderers ? options.renderers.forEach(r=>addRenderer(r.renderer,r.options)) :null;
    options.actions ? options.actions.forEach(a=>addAction(a.action,a.options)):null;

    addEventListener('keydown', evt=>{
        if(!keysPressed.includes(evt.keyCode)){
            keysPressed.push(evt.keyCode);
        }
    });
    
    addEventListener('keyup', evt=>{
        keysPressed = keysPressed.filter(k=>k !== evt.keyCode);
    });
}

const isKeyPressed = (key)=>{
    return keysPressed.includes(key) ? true : false;
}

const nextId = ()=>{
    return onId++;
}

addAction = (action,options) =>{
    let id = nextId();
    actions[id] = {action:action, options:options};
    return id;
}

removeAction = (id) =>{
    delete actions[id];
}   

addRenderer = (renderer,options) =>{
    let id = nextId();
    renderers[id] = {renderer:renderer, options:options};
    return id;
}

removeRenderer = (id) =>{
    delete renderer[id];
}

const gameRender = () =>{
    Object.keys(renderers).forEach(k=>renderers[k].renderer(renderers[k].options))
}

const gameLogic = () => {
    Object.keys(actions).forEach(k=>actions[k].action(actions[k].options))
}

const gameLoop = () => {
    window.requestAnimationFrame(gameLoop);

    currentTime = (new Date()).getTime();
    delta = (currentTime-lastTime);

    if(delta > interval) {
        gameLogic();
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "#000";
        gameRender();
        lastTime = currentTime - (delta % interval);
    }
}