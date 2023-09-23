class Barrier {
    constructor( x, y, w, h ){
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
    
    isTouchingBallAtPos(x,y){
        return (x>this.xr[0]) && (x<this.xr[1]) && (y>this.yr[0]) && (y<this.yr[1])
    }

    draw(g){
        g.fillStyle = 'black'
        g.fillRect( ...this.xywh )
    }
}