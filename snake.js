// JS - Snake 

window.onload = function() {
    
  canv = document.getElementById("game"); // wielkosć okna 
  ctx = canv.getContext("2d");
  document.addEventListener("keydown", keyPush);
  setInterval(game,1000/10); // szybkość węża
}

px = py = 10;
gs = tc = 20;
ax = ay = 15;
xv = yv = 0;
trail = []; // rozmiar planszy
tail = 3; // długośc początkowa węża

// sterowanie ruchami węża (położenie na planszy + przechodzenie przez ściany)
function game() {
    
    px += xv;
    py += yv;

    if(px < 0) {
        px = tc-1
    }

    if(px > tc-1) {
        px = 0;
    }
    
    if(py < 0) {
        py = tc-1;
    }

    if(py > tc-1) {
        py = 0;
    }
    
    // tło
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height); // położenie planszy

    // wąż
    ctx.fillStyle = "green";
    for(var i = 0; i<trail.length; i++) {    
        ctx.fillRect(trail[i].x*gs, trail[i].y*gs, gs-2, gs-2); // odstępy między kawałkami węża

        if(trail[i].x==px && trail[i].y==py){
            tail = 3;
        }
    }

    trail.push({x:px, y:py});
    
    while(trail.length > tail) {
        trail.shift();
    }

    if(ax==px && ay==py){ // powiększanie węża o 1
        tail++; 
        
        ax = Math.floor(Math.random()*tc);
        ay = Math.floor(Math.random()*tc);
    }

    // element do zjadania
    ctx.fillStyle = "red";
    ctx.fillRect(ax*gs, ay*gs, gs-2, gs-2);
}

// sterowanie ruchami węża (przyciski od kierunków ruchu)
function keyPush(evt) {
    switch(evt.keyCode) {
        case 37:
            xv =- 1;
            yv = 0;
            break;
        case 38:
            xv = 0;
            yv =- 1;
            break;
        case 39:
            xv = 1;
            yv = 0;
            break;
        case 40:
            xv = 0;
            yv = 1;
            break;
    }
}
