export default class Ball{
    constructor(){
        
        
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.r = 10;
        this.col = 0;
        this.colors = ['red','orange','pink','violet','blue','yellow','green'];
        this.speedX = 0;
        this.speedY = 0;

    }
    DrawBall(context){
        context.clearRect(0,0,canvas.width,canvas.height);
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        if(this.col == 7){
            this.col = 0;
        }
        context.fillStyle = this.colors[this.col];
        context.closePath();
        context.fill();
        this.col++;
    }
    move(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
    checkDistance=(hole)=>{
        const Distance = Math.sqrt(Math.pow((hole.x - this.x),2) + Math.pow((hole.y - this.y),2));
        return Distance;
    }
    
    

}