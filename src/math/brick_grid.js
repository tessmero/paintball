class BrickGrid {
    constructor( centerX, centerY ){
        var n = global.nBricksPerRow
        this.rad = (n * global.brickSize) / 2
        
        this.xr = [centerX - this.rad, centerX + this.rad]
        this.yr = [centerY - this.rad, centerY + this.rad]
        
        this.brickColors = new Array(n*n).fill(null) 
        this.brickIndices = new Array(n*n).fill(null) // for debugging
        this.hitCount = 0
    }
    
    // return true if a white brick is hit by a ball at given pos
    checkHitBrick(b){
        var x = b.x
        var y = b.y
        var color = b.color
        if( (x<this.xr[0]) || (y<this.yr[0]) || (x>this.xr[1]) || (y>this.yr[1]) ){
            return false
        }
        
        var xi = Math.floor((x-this.xr[0])/global.brickSize)
        var yi = Math.floor((y-this.yr[0])/global.brickSize)
        var i = xi*global.nBricksPerRow + yi
        if( !this.brickColors[i] ) {
            this.brickColors[i] = allColors[color]
            this.brickIndices[i] = b.index
            this.hitCount++
            return true
        }
        return false
    }

    draw(g){
        
        // debug, after all bricks ar hit
        if( true && (this.hitCount == global.nBricksPerRow*global.nBricksPerRow ) ){
           console.log(this.brickIndices)
        }
        
        var n = global.nBricksPerRow
        for( var xi = 0 ; xi < n; xi++ ){
            for( var yi = 0 ; yi < n; yi++ ){
                var x = this.xr[0]+xi*global.brickSize
                var y = this.yr[0]+yi*global.brickSize
                var c = this.brickColors[xi*global.nBricksPerRow + yi]
                if( c ){
                    g.fillStyle = c
                    g.fillRect( x, y,  global.brickSize, global.brickSize )
                } else {
                    g.fillStyle = 'gray'
                    g.fillRect( x, y,  global.brickSize, global.brickSize )
                }
            }
        }
        
        // outline white bricks
        g.strokeStyle = 'black'
        g.beginPath()
        for( var xi = 0 ; xi < n; xi++ ){
            for( var yi = 0 ; yi < n; yi++ ){
                var x = this.xr[0]+xi*global.brickSize
                var y = this.yr[0]+yi*global.brickSize
                var c = this.brickColors[xi*global.nBricksPerRow + yi]
                if( !c ){
                    g.rect( x, y,  global.brickSize, global.brickSize )
                }
            }
        }
        g.stroke()
    }
}