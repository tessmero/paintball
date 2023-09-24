class Barrier {
    constructor( x, y, w, h ){
        x = Math.floor(x)// * global.minDist
        y = Math.floor(y)// * global.minDist
        w = Math.floor(w)// * global.minDist
        h = Math.floor(h)// * global.minDist
        this.xywh = [x,y,w,h]
        this.xr = [
            x-global.ballRadius,
            x+w+global.ballRadius
        ]
        this.yr = [
            y-global.ballRadius,
            y+h+global.ballRadius
        ]
        
    }
    
    advance(){
        // do nothing
    }
    
    isTouchingBallAtPos(x,y){
        return (x>this.xr[0]) && (x<this.xr[1]) && (y>this.yr[0]) && (y<this.yr[1])
    }

    draw(g){
        g.fillRect( ...this.xywh )
    }
}