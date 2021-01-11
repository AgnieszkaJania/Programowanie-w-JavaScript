export default class Hole{
    constructor(){
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.r = 25;
        
    }
    DrawHoles(context){
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        context.fillStyle = 'grey';
        context.closePath();
        context.fill();
    }
}
