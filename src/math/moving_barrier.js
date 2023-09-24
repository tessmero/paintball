class MovingBarrier extends Barrier {
    constructor( x, y, w, h, rx, ry, pi ){
        super(x,y,w,h)
        
        var s = global.barSpeed
        this.path = [[s,0,rx[1]],[0,s,ry[1]],[-s,0,rx[0]],[0,-s,ry[0]]]
        this.pathIndex = pi
    }
    
    // override barrier
    advance(){
        
        // get current path segment
        var seg = this.path[this.pathIndex]
        
        // advance position
        var dx = seg[0]
        var dy = seg[1]
        this.xywh[0] += dx
        this.xr[0] += dx
        this.xr[1] += dx
        this.xywh[1] += dy
        this.yr[0] += dy
        this.yr[1] += dy
        
        // check if finished segment
        if( ((dx>0) && (this.xywh[0]>seg[2])) || ((dx<0) && (this.xywh[0]<seg[2])) || ((dy>0) && (this.xywh[1]>seg[2])) || ((dy<0) && (this.xywh[1]<seg[2])) ){
            this.pathIndex = (this.pathIndex+1) % this.path.length
        }
    }
}