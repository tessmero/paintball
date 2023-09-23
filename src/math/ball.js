class Ball {
    constructor(x,y,dx,dy,color){
        
        this.x = Math.floor(x/global.minDist) * global.minDist
        this.y = Math.floor(y/global.minDist) * global.minDist
        this.dx = Math.floor(dx/global.minDist) * global.minDist
        this.dy = Math.floor(dy/global.minDist) * global.minDist
        
        this.color = color
    }
    
    draw(g){
        g.fillStyle = this.color
        
        g.beginPath()
        g.moveTo(this.x,this.y)
        g.arc( this.x, this.y, global.ballRadius, 0, twopi )
        g.fill()
    }
    
    // move one tick
    advance(){
        
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