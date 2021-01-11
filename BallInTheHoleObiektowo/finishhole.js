export default class FinishHole{
    constructor(){
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.r = 30;
        this.color = 'black';
        
    }
    DrawHole(context){
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.closePath();
        context.fill();
    }
}