import Platek from './platek.js';

let snieg = document.getElementById('snow');
let abc = snieg.getContext('2d');
let tab = [];

function Resize(){
    snieg.width = window.innerWidth;
    snieg.height = window.innerHeight;
}

window.addEventListener('load', Resize);

function initialize(){
    for(let i = 0; i< 601; i++){ 
        tab.push(new Platek());
    }
   
}
initialize();

function updateCanvas() {
    
    
    abc.clearRect(0, 0, snieg.width, snieg.height);

    for (const platek of tab) {
        platek.drawObjectOnCanvas(abc);
        platek.move();
    }

    window.requestAnimationFrame(updateCanvas);

	
}

updateCanvas();