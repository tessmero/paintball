

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
        var deadBalls = []
        global.allBalls.forEach( b => b.advance())
        global.allBalls = global.allBalls.filter(b => 
            !global.brickGrid.checkHitBrick(b))
    }
    
    if( false ){
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
    if( (cvs.offsetWidth!=lastCanvasOffsetWidth) || (cvs.offsetHeight!=lastCanvasOffsetHeight) ){
        
      cvs.width  = cvs.offsetWidth;
      cvs.height = cvs.offsetHeight;
        
        var padding = 0; // (extra zoom IN) thickness of pixels CUT OFF around edges
        var dimension = Math.min(cvs.width, cvs.height) + padding*2;
        global.canvasScale = dimension;
        global.canvasOffsetX = (cvs.width - dimension) / 2;
        global.canvasOffsetY = (cvs.height - dimension) / 2;
    global.ctx.setTransform(global.canvasScale, 0, 0, 
        global.canvasScale, global.canvasOffsetX, global.canvasOffsetY);
        
        var xr = -global.canvasOffsetX / global.canvasScale
        var yr = -global.canvasOffsetY / global.canvasScale
        global.screenCorners = [v(xr,yr),v(1-xr,yr),v(1-xr,1-yr),v(xr,1-yr)]
    }
}