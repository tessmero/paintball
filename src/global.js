const global = {
    // graphics context
    canvas: null,
    ctx: null,
    
    // relate pixels to virtual units
    canvasOffsetX: 0,
    canvasOffsetY: 0,
    canvasScale: 0,

    // mouse
    canvasMousePos: v(0,0),     //pixels
    mousePos: v(0,0),           //internal units

    // 
    backgroundColor: 'white',
    
    // physics settings
    msPerTick: 5,
    minDist: 6e-5, // fraction of screen length
    ballRadius: .007, //fraction or screen length
    brickSize: .035, // fraction of screen length
    nBricksPerRow: 10,
    maxBallSpeed: 30, // in units of minDist length
    
    // state
    brickGrid: null,
    msLeftover: 0,
    allBalls: [],
    allBars: [],
    
    
    //
    autoResetCountdown: 0,
    autoResetDelay: 12000,

    
    //debug
    //debugPoint: v(0,0),
}