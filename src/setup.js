

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
    global.gravityTickCountdown = 0
    
    // init bricks
    global.brickGrid = new BrickGrid(.5,.75)
    
    // load final results from previous simulation run
    var finalIndices = [154, 53, 93, 127, 97, 26, 4, 117, 22, 169, 185, 130, 50, 82, 74, 9, 29, 62, 137, 43, 159, 39, 33, 139, 45, 196, 173, 32, 133, 128, 179, 134, 160, 132, 103, 76, 143, 31, 75, 114, 126, 80, 193, 48, 146, 84, 194, 153, 18, 0, 129, 92, 107, 147, 5, 28, 141, 89, 98, 90, 121, 161, 86, 151, 65, 165, 63, 85, 184, 8, 172, 170, 182, 198, 60, 167, 30, 68, 102, 72, 187, 140, 191, 176, 190, 148, 19, 118, 199, 156, 181, 155, 192, 69, 135, 157, 123, 34, 186, 188]
    
    var randVels = [[-13,20],[11,-9],[7,-7],[23,-21],[-25,-19],[26,-11],[10,-19],[24,-17],[3,-5],[-9,-4],[-17,3],[25,6],[24,-17],[-20,11],[-23,-25],[22,10],[-26,18],[-18,25],[25,25],[-19,-20],[-22,-27],[-29,4],[-14,23],[3,-25],[-30,19],[12,-22],[13,-26],[-26,-14],[-6,7],[3,-16],[23,-14],[13,26],[12,-16],[-29,24],[-25,21],[-7,-8],[-12,-20],[17,20],[15,-21],[29,14],[-10,12],[28,28],[21,16],[-29,-8],[15,-14],[25,18],[10,-6],[5,26],[-23,-25],[-17,-8],[-17,-4],[4,-4],[-21,-9],[8,-15],[-6,-12],[13,12],[-4,-26],[-19,5],[-23,-16],[3,8],[25,-13],[-11,24],[12,12],[-11,-23],[7,24],[17,-16],[12,28],[-7,-12],[8,-13],[-11,23],[-13,-13],[-8,-23],[8,11],[15,-18],[-14,-15],[-25,21],[-16,-30],[11,-12],[11,-5],[-12,-22],[9,-18],[16,-6],[-11,7],[17,24],[23,-18],[21,-13],[-4,8],[-17,-6],[26,9],[-12,22],[-21,17],[-8,-14],[-15,-29],[5,25],[-14,18],[-27,-14],[27,-26],[-7,-9],[28,-10],[-25,9],[-26,25],[-4,17],[-28,-13],[21,4],[6,-30],[-24,4],[-26,-19],[26,23],[-24,-26],[-7,29],[-21,14],[-22,-22],[-22,8],[14,28],[-5,22],[-17,-23],[23,29],[4,-23],[-28,21],[10,-16],[8,-25],[15,-11],[9,-17],[7,-28],[10,-13],[-15,19],[17,-8],[28,17],[-8,-4],[10,9],[18,28],[29,-13],[-20,-7],[-21,13],[22,-7],[-27,-11],[-23,-6],[-27,-21],[27,-22],[20,28],[-18,13],[10,6],[-13,-8],[-12,-18],[8,-12],[10,5],[-28,23],[-7,23],[-16,18],[-25,-29],[-11,-18],[12,-15],[21,-5],[-17,-18],[-23,-5],[-27,-24],[-7,-25],[-19,23],[11,-13],[-19,-20],[-25,-4],[-16,-24],[-19,-21],[-21,-26],[14,25],[29,-23],[16,-17],[14,-30],[-13,-29],[-23,15],[22,7],[12,-5],[9,18],[-7,-18],[17,11],[28,-10],[12,-30],[25,8],[-4,-17],[15,-29],[-12,6],[-25,-11],[-19,-20],[21,-7],[28,-22],[-11,-22],[-27,17],[24,-6],[8,17],[-10,-14],[14,7],[-18,4],[7,-15],[-24,15],[-20,-21],[-4,27],[-25,-23],[-4,-20],[27,23],[-12,9]]
    
    // init balls
    global.allBalls = []
    var cols = Object.keys(allColors)
    var startlineStep = global.startlineDuration/global.nBalls
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

