class Ball {
    constructor(x,y,dx,dy,color,startlinePos){
        
        this.x = Math.floor(x)// /global.minDist)// * global.minDist
        this.y = Math.floor(y)// /global.minDist)// * global.minDist
        this.dx = Math.floor(dx)// /global.minDist)// * global.minDist
        this.dy = Math.floor(dy)// /global.minDist)// * global.minDist
        
        global.debugVels.push([this.dx,this.dy])
        
        this.color = color
        this.startlinePos = 0
    }
    
    draw(g){
        
        // check if in startline
        var x = this.x
        var y = this.y
        if(this.startlinePos < global.startlineDuration ){
            var start = global.startlineTerminals[0]
            var end = global.startlineTerminals[1]
            var r = this.startlinePos/global.startlineDuration
            var pos = avg2(start,end,r)
            var x = pos[0]
            var y = pos[1]
        }
        
        g.fillStyle = this.color
        
        g.beginPath()
        //g.moveTo(this.x* global.minDist,this.y* global.minDist)
        //g.arc( this.x* global.minDist, this.y* global.minDist, global.ballRadius, 0, twopi )
        
        g.moveTo(x,y)
        g.arc( x, y, global.ballRadius, 0, twopi )
        g.fill()
    }
    
    // move one tick
    advance(gravityTick=false){
        
        // check if in startline
        if(this.startlinePos < global.startlineDuration ){
            this.startlinePos += 1
            return
        } else if( this.startlinePos == global.startlineDuration ){
            this.x = global.startlineTerminals[1][0]
            this.y = global.startlineTerminals[1][1]
            this.startlinePos += 1
            return
        }
        
        if( gravityTick ){
            //gravity
            this.dy += 1
            
            //friction
            var tv = 10
            if(Math.abs(this.dx)>tv) this.dx -= Math.sign(this.dx)
            if(Math.abs(this.dy)>tv) this.dy -= Math.sign(this.dy)
        }
    
    
       var nx = this.x + this.dx
       var ny = this.y + this.dy
       
       // check for collision
       var bi = 0
       var noHits = true
       var ndx = this.dx
       var ndy = this.dy
       for( ; bi < global.allBars.length ; bi++ ){
           var bar = global.allBars[bi]
           if( bar.isTouchingBallAtPos(nx,ny) ){
               
               // bounce off wall
               if( bar.isTouchingBallAtPos(this.x - this.dx,ny) ){
                   ndy *= -1
               } else {
                   ndx *= -1
               }
               noHits = false
               break
           }
       }
       if( noHits ){
           
           // move forward without changing velocity
           this.x = nx
           this.y = ny
           return
       }
       
       // check for second collision (hit corner)
       bi++
       for( ; bi < global.allBars.length ; bi++ ){
           if( global.allBars[bi].isTouchingBallAtPos(nx,ny) ){
               
               // reverse direction
               ndx = -this.dx
               ndy = -this.dy
           }
       }
       
       // apply changed velocity
       this.dx = ndx
       this.dy = ndy
       this.x += ndx
       this.y += ndy
       
    }
}