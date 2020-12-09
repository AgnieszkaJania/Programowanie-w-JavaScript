var snieg = document.querySelector('#snow');
var abc = snieg.getContext('2d');

let tab = [];
let tab1 = [];
let tab2 = [];

for (let i = 0; i < 200; i++) {

    let platek = {
        a: 0,
        b: 0
    };
    platek.a = Math.random() * 1000;
    platek.b =  Math.random() * 600;
    tab.push(platek);
    abc.beginPath();
    abc.arc(tab[i].a,tab[i].b,5,0,2*Math.PI);
    abc.fillStyle = 'white';
    abc.fill();
    
}   

for (let i = 0; i < 200; i++) {

    let platek1 = {
        a: 0,
        b: 0
    };
    platek1.a = Math.random() * 1000;
    platek1.b =  Math.random() * 600;
    tab1.push(platek1);
    abc.beginPath();
    abc.arc(tab1[i].a,tab1[i].b,2,0,2*Math.PI);
    abc.fillStyle = 'white';
    abc.fill();
}   

for (let i = 0; i < 200; i++) {

    let platek2 = {
        a: 0,
        b: 0
    };
    platek2.a = Math.random() * 1000;
    platek2.b =  Math.random() * 600;
    tab2.push(platek2);
    abc.beginPath();
    abc.arc(tab2[i].a,tab2[i].b,2,0,2*Math.PI);
    abc.fillStyle = 'white';
    abc.fill();
}   


function Snow(){
    abc.clearRect(0,0,1000,800);
    
    
    for(let i = 0; i < 99; i++){
        
        if(tab[i].b < 600){
            if(i % 2 == 0){
                tab[i].a += 1;
                tab[i].b += 1;
            }
            else{
                tab[i].a += 2;
                tab[i].b += 1;
            }
        }
        else
        {   
            tab[i].b = 0;
            tab[i].a = Math.random() * window.innerWidth;
            
        }
        abc.beginPath();
        abc.arc(tab[i].a,tab[i].b,5,0,2*Math.PI);
        abc.fillStyle = 'white';
        abc.fill();
        
            
       
    }
    for(let i = 100; i < tab.length; i++){
        if(tab[i].b < 600){
            if(i % 2 == 0){
                tab[i].a -= 1;
                tab[i].b += 1;
            }
            else{
                tab[i].a -= 2;
                tab[i].b += 1;
            }
        }
        else
        {
            tab[i].b = 0;
            tab[i].a = Math.random() * window.innerWidth;
            
        }
        abc.beginPath();
        abc.arc(tab[i].a,tab[i].b,5,0,2*Math.PI);
        abc.fillStyle = 'white';
        abc.fill();
    }
    for(let i = 0; i < 99; i++){
        if(tab1[i].b < 600){
            if(i % 2 == 0){
                tab1[i].a += 1;
                tab1[i].b += 1;
            }
            else{
                tab1[i].a += 2;
                tab1[i].b += 1;
            }
        }
        else
        {
            tab1[i].b = 0;
            tab1[i].a = Math.random() * window.innerWidth;
            
        }
        abc.beginPath();
        abc.arc(tab1[i].a,tab1[i].b,2,0,2*Math.PI);
        abc.fillStyle = 'white';
        abc.fill();
    }
    for(let i = 100; i < tab1.length; i++){
        if(tab1[i].b < 600){
            if(i % 2 == 0){
                tab1[i].a -= 1;
                tab1[i].b += 1;
            }
            else{
                tab1[i].a -= 2;
                tab1[i].b += 1;
            }
        }
        else
        {
            tab1[i].b = 0;
            tab1[i].a = Math.random() * window.innerWidth;
            
            
        }
        abc.beginPath();
        abc.arc(tab1[i].a,tab1[i].b,2,0,2*Math.PI);
        abc.fillStyle = 'white';
        abc.fill();
    }
    for(let i = 0; i < 99; i++){
        if(tab2[i].b < 600){
            if(i % 2 == 0){
                tab2[i].a -= 1;
                tab2[i].b += 2;
            }
            else{
                tab2[i].a -= 2;
                tab2[i].b += 2;
            }
        }
        else
        {
            tab2[i].b = 0;
            tab2[i].a = Math.random() * window.innerWidth;
            
            
        }
        abc.beginPath();
        abc.arc(tab2[i].a,tab2[i].b,2,0,2*Math.PI);
        abc.fillStyle = 'white';
        abc.fill();
    }
    for(let i = 100; i < 200; i++){
        if(tab2[i].b < 600){
            if(i % 2 == 0){
                tab2[i].a += 1;
                tab2[i].b += 2;
            }
            else{
                tab2[i].a += 2;
                tab2[i].b += 2;
            }
        }
        else
        {
            tab2[i].b = 0;
            tab2[i].a = Math.random() * window.innerWidth;
            
            
        }
        abc.beginPath();
        abc.arc(tab2[i].a,tab2[i].b,2,0,2*Math.PI);
        abc.fillStyle = 'white';
        abc.fill();
    }
    window.requestAnimationFrame(Snow);
}
window.requestAnimationFrame(Snow);
