export default class Platek{
    constructor(){
        this.a = Math.random() * window.innerWidth;
        this.b = Math.random() * window.innerHeight;
        this.radius = this.random(1,5);
        this.speedX =  Math.sin(Math.random()*2*Math.PI);
        this.speedY =  this.random(1,2);
    }
    random(min, max) {
        return min + Math.random() * (max - min + 1);
    }
    

    move(){
        if(this.b > window.innerHeight){
            this.a = Math.random() * window.innerWidth;
            this.b = 0;
        }else{
            
            this.b += this.speedY;
            this.a += this.speedX;
        }
        
    }

    drawObjectOnCanvas(canvasCtx) {
        canvasCtx.beginPath();
        canvasCtx.arc(this.a, this.b, this.radius, 0, Math.PI * 2);
        canvasCtx.fillStyle = 'white';
        canvasCtx.closePath();
        canvasCtx.fill();
    }
}
