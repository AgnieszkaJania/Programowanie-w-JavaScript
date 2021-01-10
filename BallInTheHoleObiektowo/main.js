class Ball{
    constructor(){
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.r = 20;
        this.svg = document.getElementById('svg');
        this.ball = document.createElement('circle');
        this.ball.setAttribute('cx', this.x);
        this.ball.setAttribute('cy', this.y);
        this.ball.setAttribute('r', this.r);
        this.ball.setAttribute('fill', 'blue');

    }
    DrawBall(){
        this.svg.appendChild(this.ball);
    }
    RemoveBall(){
        this.svg.removeChild(this.ball);
    }
    CheckDistance=(obj)=>{
        const Distance = Math.sqrt(Math.pow((obj.x - this.x),2) + Math.pow((obj.y - this.y),2));
        return Distance;
        
    }
    

}

class Hole{
    constructor(){
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.r = 30;
        this.svg = document.getElementById('svg');
        this.ball = document.createElement('circle');
        this.ball.setAttribute('cx', this.x);
        this.ball.setAttribute('cy', this.y);
        this.ball.setAttribute('r', this.r);
        this.ball.setAttribute('r', this.r);
        this.ball.setAttribute('fill', 'black');
    }
    DrawHole(){
        this.svg.appendChild(this.ball);
    }
    RemoveHole(){
        this.svg.removeChild(this.ball);
    }
}

class Trap{
    constructor(x,y,r,color){
        this.x = x;
        this.y = y;
        this.r = 15;
        this.color = color;
        this.svg = document.getElementById('svg');
        this.trap = document.createElement('circle');
        this.trap.setAttribute('cx', this.x);
        this.trap.setAttribute('cy', this.y);
        this.trap.setAttribute('r', this.r);
        this.trap.setAttribute('fill', this.color);

    }
    DrawTrap(){
       this.svg.appendChild(this.trap); 
    }
}

class TrapHole{
    constructor(x,y,r,color){
        this.x = x;
        this.y = y;
        this.r = 30;
        this.color = color;
        this.svg = document.getElementById('svg');
        this.svg = document.getElementById('svg');
        this.trapHole = document.createElement('circle');
        this.trapHole.setAttribute('cx', this.x);
        this.trapHole.setAttribute('cy', this.y);
        this.trapHole.setAttribute('r', this.r);
        this.trapHole.setAttribute('fill', this.color);

    }
    DrawTrapHole(){
        this.svg.appendChild(this.trapHole);
        
    }
}

class InitializeGame{
    constructor(){
        this.ball = new Ball();
        this.announcement = document.querySelector('#announcement');
        this.content = document.querySelector('#content');
        this.svg = document.getElementById('svg');
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.czasGry = 0;
        this.corx =  0.2;
        this.cory = 0.2;
        this.corxx = 0.25;
        this.coryy = 0.35;
        this.przeszkodaObjArr = [];
        this.slupekObjArr = [];  
        this.i = 0;
        this.j = 0;

        for(let i = 0; i < 12; i++){
            this.przeszkodaObjArr.push(new TrapHole(this.corx * window.innerWidth, this.cory * window.innerHeight, 30, 'brown'))
            corx += 0.2;
            i++;
            if(i == 4){
                i = 0;
                cory += 0.3;
                corx = 0.2;
            }
        }
        for(let i = 0; i < przeszkodaObjArr.length; i++){
            if(this.ball.CheckDistance(przeszkodaObjArr[i])<= 30){
                this.ball.x = this.ball.x - 60;
                this.ball.y = this.ball.y + 60;
            }
            przeszkodaObjArr[i].DrawTrapHole();
        }
        for(let i = 0; i < 6; i++){
            this.przeszkodaObjArr.push(new Trap(this.corxx * window.innerWidth, this.coryy * window.innerHeight, 15, 'red'))
            corxx += 0.2;
            j++;
            if(i == 4){
                j = 0;
                coryy += 0.35;
                corxx = 0.25;
            }
        }
        for(let i = 0; i < slupekObjArr.length; i++){
            if(this.ball.CheckDistance(slupekObjArr[i]) <= 35){
                this.ball.x = this.ball.x - 80;
                
            }
            slupekObjArr[i].DrawTrap();
        }
        this.ball.DrawBall();
    }
}

let x = new InitializeGame();
