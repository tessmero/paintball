

// Initialize the game
function init() {
    var cvs = document.getElementById("gameCanvas");
    cvs.addEventListener("mousemove", mouseMove);
    cvs.addEventListener("click", mouseClick);
    global.canvas = cvs
    global.ctx = cvs.getContext("2d");
    
    resetRand()
    
    resetGame()
    requestAnimationFrame(gameLoop);
}


function resetGame(){
    seed = cyrb128("SIGHeidugn")
    resetRand()
    global.autoResetCountdown = global.autoResetDelay
    global.t = 0
    
    // init bricks
    global.brickGrid = new BrickGrid(.5,.5)
    
    // load final results from previous dimulation run
    finalIndices = [12, 44, 186, 55, 13, 115, 84, 15, 148, 102, 96, 42, 166, 32, 77, 151, 133, 95, 68, 16, 18, 184, 3, 73, 27, 127, 60, 24, 158, 53, 198, 138, 157, 37, 22, 38, 69, 6, 137, 70, 33, 107, 76, 130, 161, 92, 90, 63, 122, 124, 41, 146, 83, 17, 164, 39, 36, 45, 131, 176, 116, 149, 155, 163, 113, 125, 0, 89, 74, 62, 139, 75, 14, 19, 153, 58, 94, 143, 169, 91, 179, 48, 100, 34, 182, 162, 159, 7, 110, 31, 118, 196, 106, 4, 111, 20, 194, 108, 121, 129]
    
    
    // init balls
    global.allBalls = []
    var m = global.maxBallSpeed
    for( var i = 0 ; i < 200 ; i++ ){
        var color = randBallColor()
        var fi = finalIndices.indexOf(i)
        if( fi == -1 ){
            
        } else if( fi >= 75 ){
            color = 'red'
        } else if( fi >= 50 ){
            color = 'green'
        } else if( fi >= 25 ){
            color = 'purple'
        } else {
            color = 'blue'
        }
        var b = new Ball( 
            .5+randRange(-.04,.04),.85+randRange(-.04,.04),
            randInt(1,m) * randSign() * global.minDist,
            randInt(1,m) * randSign() * global.minDist,
            color,
        )
        b.index = i
        global.allBalls.push(b)
    }
    
    
    
    // init barriers
    var thick = .1
    global.allBars = [
    
        //new Barrier( thick*2,0,thick,.8 ),
        new Barrier( thick*2.5,.7,.5,thick ),
        
        new Barrier( thick*2,thick*2,thick,.55 ),
        new Barrier( 1-thick*3,thick*2,thick,.55 ),
    
        new Barrier( 0,0,1,thick ),
        new Barrier( 1-thick,0,thick,1 ),
        new Barrier( 0,1-thick,1,thick ),
        new Barrier( 0,0,thick,1 ),
        
    ]
}

// Main game loop
let secondsPassed;
let oldTimeStamp;
let fps;

function gameLoop(timeStamp) {
    
    var msPassed = 0;
    if (oldTimeStamp) {
      msPassed = timeStamp - oldTimeStamp;
    }
    var secondsPassed = msPassed / 1000;
    oldTimeStamp = timeStamp;
    var fps = Math.round(1 / secondsPassed);


    msPassed = Math.min(msPassed,50)

    update(msPassed);
    draw(fps);

    requestAnimationFrame(gameLoop);
}


// Initialize the game
init();

