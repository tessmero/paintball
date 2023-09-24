

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
    resetRand()
    global.autoResetCountdown = global.autoResetDelay
    global.t = 0
    global.gravityTickCountdown = 0
    
    // init bricks
    global.brickGrid = new BrickGrid(.5,.75)
    
    // init starting conditions
    if( false ) {
        
        // generate new preset
        global.startlineDuration = randInt(1000,10000)
        resetRand(true)
        global.seedstr = randomString(10)
        seed = cyrb128(global.seedstr)
        var finalIndices = []
        var randVels = []
        for( var i = 0 ; i < global.nBalls ; i++ ){
            randVels.push( [randInt(...global.ballSpeed),randInt(...global.ballSpeed)] )
        }
        global.randVels = randVels
        
        
    } else {
        
        // load pre-generated starting conditions -> final results
        var startSpecs = getRandomStartSpecs();
        seed = cyrb128(startSpecs[0])
        global.startlineDuration = startSpecs[1]
        var randVels = startSpecs[2]
        var finalIndices = startSpecs[3]
    }
    
    
    // init balls
    global.allBalls = []
    var cols = Object.keys(allColors)
    var startlineStep = Math.floor(global.startlineDuration/global.nBalls)
    var startlinePos = 0
    for( var i = 0 ; i < global.nBalls ; i++ ){
        var color = cols[4]
        var fi = finalIndices.indexOf(i)
        
        if( fi != -1 ){
            var n = global.nBricksPerRow
            var xb = ( (fi%n) < n/2 )
            var yb = ( Math.floor(fi/n) < n/2 )
            var ib = (+xb) + 2*(+yb)
            color = cols[ib]
        }
        
        /*
        if( fi == -1 ){
            
        } else if( fi >= 75 ){
            color = cols[0]
        } else if( fi >= 50 ){
            color = cols[1]
        } else if( fi >= 25 ){
            color = cols[2]
        } else {
            color = cols[3]
        }
        */
        
        var b = new Ball( 
            1000,1000,
            30,randVels[i][1]%10,
            color,
        )
        b.index = i
        b.startlinePos = startlinePos
        startlinePos += startlineStep
        global.allBalls.push(b)
    }
    
    
    
    // init barriers
    var thick = 400
    var m = Math.floor(1/global.minDist)
    var mo2 = Math.floor(m/2)
    var nrad = 2900
    var ny = mo2+1000
    
    global.allBars = [
    
        // inner walls
        //new Barrier( thick*2.5,.7,.5,thick ),
        //new Barrier( thick*2,thick*2,thick,.55 ),
        //new Barrier( 1-thick*3,thick*2,thick,.55 ),
        new Barrier( 0,ny,m/2-nrad,m ),
        new Barrier( mo2+nrad,ny,m/2-1000,m ),
    
        // outer walls
        new Barrier( 0,0,m,thick ),
        new Barrier( m-thick,0,thick,m ),
        //new Barrier( 0,m-thick,m,thick ),
        new Barrier( 0,0,thick,m ),
        
    ]
    
    // init moving platforms
    var r = 700
    var all_cy = [5000,8000]
    all_cy.forEach(cy => {
        var all_cpos = [
            [2000,cy],
            [5000,cy],
            [8000,cy],
            [11000,cy],
            [14000,cy],
        ]
        var s = 500
        
        all_cpos.forEach( cpos => {
            var rx = [cpos[0]-r,cpos[0]+r]
            var ry = [cpos[1]-r,cpos[1]+r]
            
            global.allBars.push(...[
                new MovingBarrier( rx[0],ry[0],s,s,rx,ry,0 ),
                new MovingBarrier( rx[0],ry[1],s,s,rx,ry,1 ),
                new MovingBarrier( rx[1],ry[1],s,s,rx,ry,2 ),
                new MovingBarrier( rx[1],ry[0],s,s,rx,ry,3 )
            ])
        })
    })
    
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

