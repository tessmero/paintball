class BrickGrid {
    constructor( centerX, centerY ){
        centerX = Math.floor( centerX/global.minDist )
        centerY = Math.floor( centerY/global.minDist )
        
        var n = global.nBricksPerRow
        this.n2 = n*n
        this.rad = (n * global.brickSize) / 2
        
        this.xr = [centerX - this.rad, centerX + this.rad]
        this.yr = [centerY - this.rad, centerY + this.rad]
        
        this.brickColors = new Array(n*n).fill(null) 
        this.brickIndices = new Array(n*n).fill(null) // for debugging
        this.hitCount = 0
    }
    
    // return true if a white brick is hit by a ball at given pos
    checkHitBrick(b){
        var x = b.x// * global.minDist
        var y = b.y// * global.minDist
        var color = b.color
        if( (x<this.xr[0]) || (y<this.yr[0]) || (x>=this.xr[1]) || (y>=this.yr[1]) ){
            return false
        }
        
        var xi = Math.floor((x-this.xr[0])/global.brickSize)
        var yi = Math.floor((y-this.yr[0])/global.brickSize)
        var i = xi*global.nBricksPerRow + yi
        if( !this.brickColors[i] ) {
            this.brickColors[i] = allColors[color]
            this.brickIndices[i] = b.index
            this.hitCount++
            //console.log( [this.brickColors[i], this.hitCount, global.nBricksPerRow*global.nBricksPerRow] )
            return true
        }
        return false
    }
    
    isDone(){
        return (this.hitCount >= this.n2)
    }

    draw(g){
        
        // debug, after all bricks ar hit
        if( true && global.seedstr && this.isDone() ){
            
            console.log(JSON.stringify([global.seedstr,global.startlineDuration,global.randVels,this.brickIndices]))
            
        }
        
        var n = global.nBricksPerRow
        for( var xi = 0 ; xi < n; xi++ ){
            for( var yi = 0 ; yi < n; yi++ ){
                var c = this.brickColors[xi*global.nBricksPerRow + yi]
                if( c ){
                    g.fillStyle = c
                    g.fillRect( ...this.rectForBrick(xi,yi) )
                } else {
                    g.fillStyle = global.brickColor
                    g.fillRect( ...this.rectForBrick(xi,yi) )
                }
            }
        }
        
        // outline white bricks
        g.strokeStyle = 'black'
        g.beginPath()
        for( var xi = 0 ; xi < n; xi++ ){
            for( var yi = 0 ; yi < n; yi++ ){
                var c = this.brickColors[xi*global.nBricksPerRow + yi]
                if( !c ){
                    g.rect( ...this.rectForBrick(xi,yi) )
                }
            }
        }
        g.stroke()
    }
    
    rectForBrick( xi, yi ){
        return [
            this.xr[0]+xi*global.brickSize,
            this.yr[0]+yi*global.brickSize,
            global.brickSize, global.brickSize
        ]
    }
}