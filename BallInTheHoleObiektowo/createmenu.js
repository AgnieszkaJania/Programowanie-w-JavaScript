let timeValue; 
export default class CreateMenu{
    
    // DisplayNextLevel() {
    //     let ann = document.querySelector('.announcement');
    //     let content = document.querySelector('.content');
    //     let guzik = document.createElement('button');
        
    //     ann.classList.add('visible');
    //     guzik.innerHTML='Ok';
    //     this.content.innerHTML = 'Kolejna runda';
    //     ann.appendChild(guzik);
        
    //     guzik.addEventListener('click', function(){
    //         ann.classList.remove('visible');
    //         ann.removeChild(guzik);
    //     });
    // }
    
    DisplyStart(){
        let ann = document.querySelector('.announcement');
        let content = document.querySelector('.content');       
        
        ann.classList.add('visible');
        console.log('hello');
        let guzik = document.createElement('button');
        guzik.innerHTML='Ok';
        content.innerHTML = 'Zaczynamy gre?';
        ann.appendChild(guzik);
        guzik.addEventListener('click', function(){
            ann.classList.remove('visible');
            ann.removeChild(guzik);
            timeValue = Date.now();
            console.log(timeValue);
        });
    }
    DisplayFinish(){
        let ann = document.querySelector('.announcement');
        let content = document.querySelector('.content');
        
        //let guzik = document.createElement('button');
        let time = document.createElement('div');
        time.id = 'time';
        time.innerHTML = 'Twój czas gry to: ' + Math.round((Date.now() - timeValue) / 1000) +' sekund';
        ann.classList.add('visible');
        content.innerHTML = 'Koniec gry';
        ann.appendChild(time);

        
    }
    DisplayWin(){
        let ann = document.querySelector('.announcement');
        let content = document.querySelector('.content');
        let time = document.createElement('div');
        time.id = 'time';
        time.innerHTML = 'Twój czas gry to: ' + Math.round((Date.now() - timeValue) / 1000) + ' sekund';
        ann.classList.add('visible');
        content.innerHTML='Wygrałeś !';
        ann.appendChild(time);
        

    }
    LostBall(){
        let ann = document.querySelector('.announcement');
        let content = document.querySelector('.content');
        ann.classList.add('visible');
        content.innerHTML='Zgubiłeś kulke !';
    }

    

}
