

function update(dt) { 
    fitToContainer()  
 
    // compute how many ticks should pass
    dt += global.msLeftover
    global.msLeftover = 0
    var nTicks = Math.floor( dt / global.msPerTick )
    global.msLeftover += dt % global.msPerTick
    
    //debug
    //console.log(nTicks)
    
    // advance simulation
    for( var i = 0 ; i < nTicks ; i++ ){
        
        // advance moving barriers
        global.allBars.forEach( b => b.advance())
        
        // advance balls and bounce off of barriers
        global.gravityTickCountdown--
        var gtick = false
        if( global.gravityTickCountdown <= 0 ){
            gtick = true
            global.gravityTickCountdown = global.gravityTickDelay
        }
        global.allBalls.forEach( b => b.advance( gtick ))
        
        // remove balls and paint bricks that collided
        global.allBalls = global.allBalls.filter(b => 
            !global.brickGrid.checkHitBrick(b))
    }
    
    if( global.brickGrid.isDone() ){
        global.autoResetCountdown -= dt
        if( global.autoResetCountdown < 0 ){
            resetGame()
        }
    }
}

var lastCanvasOffsetWidth = -1;
var lastCanvasOffsetHeight = -1;
function fitToContainer(){
    
    var cvs = global.canvas
    var g = global.ctx
    if( (cvs.offsetWidth!=lastCanvasOffsetWidth) || (cvs.offsetHeight!=lastCanvasOffsetHeight) ){
        
      cvs.width  = cvs.offsetWidth;
      cvs.height = cvs.offsetHeight;
        
        var padding = 0; // (extra zoom IN) thickness of pixels CUT OFF around edges
        var dimension = Math.min(cvs.width, cvs.height) + padding*2;
        global.canvasScale = dimension;
        global.canvasOffsetX = (cvs.width - dimension) / 2;
        global.canvasOffsetY = (cvs.height - dimension) / 2;
    global.ctx.setTransform(global.canvasScale * global.minDist, 0, 0, 
        global.canvasScale * global.minDist, global.canvasOffsetX, global.canvasOffsetY);
        
        var xr = 0
        var yr = 0
        var m = 1/global.minDist
        global.screenCorners = [v(xr,yr),v(m-xr,yr),v(m-xr,m-yr),v(xr,m-yr)]
        
        g.beginPath();
        g.rect(xr,yr,m,m);
        g.clip();
    }
}