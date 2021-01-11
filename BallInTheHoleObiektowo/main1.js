import Ball from './ball.js';
import CreateMenu from './createmenu.js';
import Hole from './hole.js';
import FinishHole from './finishhole.js';

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener('deviceorientation', function(ev){
    
    b.speedX = ev.gamma * 0.1;
    b.speedY = ev.beta * 0.1;
    
    
});

var b = new Ball();   
b.DrawBall(context);

var cm = new CreateMenu();
cm.DisplyStart();

var f = new FinishHole();
f.DrawHole(context);

var tab = [];
for(let i = 0; i< 50; i++){
    tab.push(new Hole());

}
for(let i = 0; i< 50; i++){
    tab[i].DrawHoles(context);
    
}

let idInt = window.setInterval(Update,100);

    
function Update(){
    b.move();
    b.DrawBall(context);
    f.DrawHole(context);
    
    for(let i = 0; i< 50; i++){
        tab[i].DrawHoles(context);        
    }
    for(let i =0; i< 50; i++){
        if(b.checkDistance(tab[i]) < 25){
            clearInterval(idInt);
            cm.DisplayFinish();
        }
        
    }
    if(b.x < 0 || b.x > window.innerWidth || b.y < 0 || b.y > window.innerHeight ){
        clearInterval(idInt);
        cm.LostBall();
    }
    if(b.checkDistance(f)< 25){
        clearInterval(idInt);
        f.color = 'green';
        f.DrawHole(context);
        cm.DisplayWin();
    }
}

