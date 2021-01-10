let ball = {
    x: 0,
    y: 0
};
let hole = {
    x: 0,
    y: 0
};


let distance;
let ann = document.querySelector('.announcement');
let content = document.querySelector('.container');
let kulka = document.querySelector('#kulka');

kulka.setAttribute('height', window.innerHeight);
kulka.setAttribute('width', window.innerWidth);
let kulkaKsztalt = document.querySelector('#kulkaKsztalt');
ball.x = Math.random() * window.innerWidth;
ball.y = Math.random() * window.innerHeight;
kulkaKsztalt.setAttribute('cx', ball.x);
kulkaKsztalt.setAttribute('cy', ball.y);
console.log(ball.x + ',' + ball.y);


let dziuraKsztalt = document.querySelector('#dziuraKsztalt');
hole.x = Math.random() * window.innerWidth;
hole.y = Math.random() * window.innerHeight;
dziuraKsztalt.setAttribute('cx', hole.x);
dziuraKsztalt.setAttribute('cy', hole.y);
let xSpeed = 0;
let ySpeed = 0;
let czasGry;
let corx = 0.2;
let cory = 0.2;
let corxx = 0.25;
let coryy = 0.35;
let przeszkodaObjArr = [];
let slupekObjArr = [];
let przeszkody = document.getElementsByClassName('przeszkoda');
let slupki = document.getElementsByClassName('slupek');
let j = 0;
for (let index = 0; index < slupki.length; index++) {
    
    let cxx = corxx * window.innerWidth;
    let cyy = coryy * window.innerHeight;
    let slupekObj = {
        cxx:cxx,
        cyy:cyy
    };
    slupekObjArr.push(slupekObj);

    slupki[index].setAttribute('cx', cxx);
    slupki[index].setAttribute('cy', cyy);
    corxx += 0.25;
    j++;
    if(j == 3){
        j = 0;
        coryy += 0.35;
        corxx = 0.25;
    }
}


let i = 0;
for (let index = 0; index < przeszkody.length; index++) {
    
   
    let cx = corx * window.innerWidth;
    let cy = cory * window.innerHeight;

    let przeszkodaObj = {
        cx:cx,
        cy:cy
    };
    przeszkodaObjArr.push(przeszkodaObj);
    przeszkody[index].setAttribute('cx', cx);
    przeszkody[index].setAttribute('cy', cy);
    corx += 0.2;
    i++;
    if(i == 4){
        i = 0;
        cory += 0.3;
        corx = 0.2;
    }
    
}


for (let index = 0; index < przeszkodaObjArr.length; index++) {
    
    let odlPrzeszkoda = Math.sqrt(Math.pow((przeszkodaObjArr[index].cx - ball.x),2) + Math.pow((przeszkodaObjArr[index].cy - ball.y),2));
    if(odlPrzeszkoda <= 30 ){
        ball.y = ball.y + 60;
        ball.x = ball.x - 60;
        kulkaKsztalt.setAttribute('cx', ball.x);
        kulkaKsztalt.setAttribute('cy', ball.y);
        console.log(ball.x + ',' + ball.y);
    }
}
for (let index = 0; index < slupekObjArr.length; index++) {
    
    let odlSlupek = Math.sqrt(Math.pow((slupekObjArr[index].cxx - ball.x),2) + Math.pow((slupekObjArr[index].cyy - ball.y),2));
    if(odlSlupek <= 35 ){
        ball.x = ball.x - 80;
        kulkaKsztalt.setAttribute('cx', ball.x);
        console.log(ball.x + ',' + ball.y);
    }
}
console.log(przeszkodaObjArr);
let czasRozpoczeciaGry;
content.innerHTML = 'Zaczynamy grę ?';
ann.classList.add('visible');
let guzik = document.createElement('button');
guzik.innerHTML='Ok';
ann.appendChild(guzik);
let runda = 1;
let game;

guzik.addEventListener('click', function(){
    czasRozpoczeciaGry = Date.now();
    ann.classList.remove('visible');
    ann.removeChild(guzik);
    
    window.addEventListener('deviceorientation', function(ev){
    
    
        console.log(ev);
        ySpeed = ev.beta * 0.1;
        xSpeed = ev.gamma * 0.1;
        console.log(xSpeed);
        console.log(ySpeed);
    
    });
    game = setInterval(Play, 100);

});






function Play(){
    kulka.removeChild(kulkaKsztalt);
    ball.x += xSpeed;
    ball.y += ySpeed;
    kulkaKsztalt.setAttribute('cx', ball.x);
    kulkaKsztalt.setAttribute('cy', ball.y);
    kulka.appendChild(kulkaKsztalt);

    if(kulkaKsztalt.getAttribute('cx') < 0 || kulkaKsztalt.getAttribute('cx') > window.innerWidth){
        clearInterval(game);
        runda = 4;
        content.innerHTML = 'Ups ! Zgubiłeś kulkę :( ';
        CreateMenu();

    }
    if(kulkaKsztalt.getAttribute('cy') < 0 || kulkaKsztalt.getAttribute('cy') > window.innerHeight){
        clearInterval(game);
        runda = 4;
        content.innerHTML = 'Ups ! Zgubiłeś kulkę :( ';
        CreateMenu();
    }

    
    distance = Math.sqrt(Math.pow((hole.x - ball.x),2) + Math.pow((hole.y - ball.y), 2)); 

    for (let index = 0; index < przeszkodaObjArr.length; index++) {
        let distanceOdPrzeszkody = Math.sqrt(Math.pow((przeszkodaObjArr[index].cx - ball.x),2) + Math.pow((przeszkodaObjArr[index].cy - ball.y),2));
        if(distanceOdPrzeszkody < 30){
            
            czasGry = Math.round((((Date.now() - czasRozpoczeciaGry) / 1000) / 60) * 100) /100;
            clearInterval(game);
            przeszkody[index].setAttribute('fill', 'red');
            runda = 4;
            content.innerHTML = 'Przegrałeś !' + '\n' + 'Twoja kulka wpadła do złej dziury !' + '\n' +
            'Twój czas to: ' + czasGry + ' minut';
            CreateMenu();


        }
    }

    for (let index = 0; index < slupekObjArr.length; index++) {
        let distanceOdSlupka = Math.sqrt(Math.pow((slupekObjArr[index].cxx - ball.x),2) + Math.pow((slupekObjArr[index].cyy - ball.y),2));
        if(distanceOdSlupka <= 35){
            czasGry = Math.round((((Date.now() - czasRozpoczeciaGry) / 1000) / 60) * 100) /100;
            clearInterval(game);
            slupki[index].setAttribute('fill', 'red');
            runda = 4;
            content.innerHTML = 'Przegrałeś !' + '\n' + 'Twoja kulka dobiła do słupka !' + '\n' +
            'Twój czas to: ' + czasGry + ' minut';
            CreateMenu();


        }
    }



    if(distance <= dziuraKsztalt.getAttribute('r')){
       
        console.log(runda);
        dziuraKsztalt.setAttribute('fill', 'green');
        clearInterval(game);
        if(runda < 3){

            setTimeout(function(){
                hole.x = Math.random() * window.innerWidth;
                hole.y = Math.random() * window.innerHeight;
                dziuraKsztalt.setAttribute('cx', hole.x);
                dziuraKsztalt.setAttribute('cy', hole.y);
                dziuraKsztalt.setAttribute('fill', 'black');
                runda++;
                content.innerHTML = 'Runda: ' + runda;
                ann.classList.add('visible');
                let guzik = document.createElement('button');
                guzik.innerHTML='Ok';
                ann.appendChild(guzik);
                guzik.addEventListener('click', function(){
                    ann.classList.remove('visible');
                    ann.removeChild(guzik);
                    game = setInterval(Play, 100);
                });
                
            }, 2000);
        }
        else if(runda >= 3 && runda < 5) 
        {
            setTimeout(function(){


                hole.x = Math.random() * window.innerWidth;
                hole.y = Math.random() * window.innerHeight;
                dziuraKsztalt.setAttribute('cx', hole.x);
                dziuraKsztalt.setAttribute('cy', hole.y);
                dziuraKsztalt.setAttribute('fill', 'black');
                runda++;
                for (let index = 0; index < slupekObjArr.length; index++) {
                    slupki[index].setAttribute('fill', 'rgba(255,255,255,0)');
                
                }
                content.innerHTML = 'Runda: ' + runda +'\n' + 'Uważaj słupki są niewidzalne !';
                ann.classList.add('visible');
                let guzik = document.createElement('button');
                guzik.innerHTML='Ok';
                ann.appendChild(guzik);
                guzik.addEventListener('click', function(){
                    ann.classList.remove('visible');
                    ann.removeChild(guzik);
                    game = setInterval(Play, 100);
                });

            }, 2000);
            
        }
        else
        {       
            czasGry = Math.round((((Date.now() - czasRozpoczeciaGry) / 1000) / 60) * 100) /100; 
            content.innerHTML = 'Wygrałeś !' + '\n' +
            'Twój czas to: ' + czasGry + ' minut';
            
            CreateMenu();  
        }  
        
    }
}

function CreateMenu(){
    ann.classList.add('visible');
    let guzik = document.createElement('button');
    guzik.innerHTML='Ok';
    ann.appendChild(guzik);
    guzik.addEventListener('click', function(){
        ann.classList.remove('visible');
        ann.removeChild(guzik);
    });
}
