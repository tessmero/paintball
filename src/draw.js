
    
    
// Render graphics
function draw(fps, t) {
    var g = global.ctx
    var canvas = global.canvas
    g.fillStyle = global.backgroundColor
    g.lineWidth = .001
    g.fillRect( 0, 0, 1/global.minDist, 1/global.minDist )

    // draw bricks
    global.brickGrid.draw(g)

    // draw balls
    global.allBalls.forEach( b => b.draw(g) )
    
    // draw barriers
    g.fillStyle = global.barrierColor
    global.allBars.forEach( b => b.draw(g) )
    
    // debug draw corners
    if( false ){
        global.screenCorners.forEach( c => {
            g.fillStyle = 'red'
            g.beginPath()
            g.moveTo(c.x,c.y)
            g.arc(c.x,c.y,global.ballRadius*10,0,twopi)
            g.fill()
        })
    }

    //debug
    //drawFilledChunks(ctx)
    g.font = "300px Arial";
    g.fillStyle = 'black'
    g.fillText(`${global.mousePos.x.toFixed(0)}, ${global.mousePos.y.toFixed(0)}`, 5000,5000);
}