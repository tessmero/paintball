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
    backgroundColor: 'black',
    barrierColor: '#AAA',
    
    // physics settings
    msPerTick: 5,
    minDist: 6e-5, // fraction of screen length
    ballRadius: 100, // units of minDist
    brickSize: 600, // units of minDist
    nBricksPerRow: 10,
    ballSpeed: [3,30], // units of minDist 
    barSpeed: 2,// moving barriers, units of minDist per tick
    gravityTickCountdown: 0 ,
    gravityTickDelay: 30 ,// number of ticks
    
    //
    nBalls: 200,
    startlineDuration: 3000, // ticks to completely release lineup
    startlineTerminals: [[-30000,2000],[15000,3000]],
    
    // state
    brickGrid: null,
    msLeftover: 0,
    allBalls: [],
    allBars: [],
    
    
    //
    autoResetCountdown: 0,
    autoResetDelay: 12000,

    
    //debug
    debugVels: [],
}