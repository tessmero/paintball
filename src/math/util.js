// shorthands
var pi = Math.PI
var pio2 = Math.PI/2
var twopi = 2*Math.PI
function v(){return new Vector(...arguments)}
function vp(){return Vector.polar(...arguments)}

/*
var allColors = {
    'red': '#FAA',
    'green': '#AFA',
    'blue': '#AAF',
    'purple': '#FAF'
}
*/

/*
var allColors = {
     '#FAA': 'red',
     '#AFA': 'green',
     '#AAF': 'blue',
     '#FAF': 'purple',
}
*/

/*
var allColors = {
     '#A33': 'red',
     '#3A3': 'green',
     '#33A': 'blue',
     '#A3A': 'purple',
}
*/

var allColors = {
     '#FAA': '#A33',
     '#AFA': '#3A3',
     '#AAF': '#33A',
     '#FAF': '#A3A',
     
     '#FFF': '#AAA',
}

function randBallColor(){
    var cols = Object.keys(allColors)
    return cols[randInt(0,cols.length)]
}

function randRange(min,max){
    return min + rand()*(max-min)
}

function randInt(min,max){
    return Math.floor(randRange(min,max))
}

function randSign(){
    return rand() > .5 ? -1 : 1
}

function dist(a,b){
    var dx = a[0]-b[0]
    var dy = a[1]-b[1]
    return Math.sqrt( dx*dx + dy*dy )
}

function avg2(a,b,r=.5){
    return [
        a[0]*(1-r) + b[0]*r,
        a[1]*(1-r) + b[1]*r,
    ]
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(rand() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}