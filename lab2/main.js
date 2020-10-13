//pobranie referencj
/*const firstImage = document.querySelector('#firstImage');
firstImage.addEventListener('click', showLightBox);

function showLightBox(){
    const lightbox = document.querySelector('.lightbox');
    //lighbox.style.transform = 'scale(1)';
    lightbox.classList.add('visible');
    console.log('asd');
}
*/
const gallery = document.querySelectorAll('.gallery img');
//const galleryCount = gallery.length;

for (let index = 0; index < gallery.length; index++) {
    const img = gallery[index];
    img.addEventListener('click', showLightBox);
    
}
// const next = document.querySelector('.next');
// next.addEventListener('click', showLightBox);


let info;
let x=1;

function showLightBox(ev){
    
    console.log(ev.target);
    console.log(gallery[1]);
    const lightbox = document.querySelector('.lightbox');
    const img = document.querySelector('.lightbox img');
    const imgUrl = ev.target.src;  
    img.src = imgUrl;
    lightbox.classList.add('visible'); 
    lightbox.addEventListener('click', hideLightbox);
    info = ev.target;
    console.log(imgUrl);

    //=======================================
    
    for (let index = 0; index < gallery.length; index++) {
        if(gallery[index] != ev.target)
        {
            
            x+=1;
        }
        else{
            break;
        }       
    }
    
    document.getElementById('zIlu').innerHTML=gallery.length;
    document.getElementById('ile').innerHTML=x;
    
    
 
}

function hideLightbox(tmp){
    
    const d = document.querySelector('div.lightbox.visible');
    
    if(tmp.target == d) {
        const lightbox = document.querySelector('.lightbox');
        lightbox.classList.remove('visible');
        x = 1;
    }       
}
const prev = document.querySelector('.prev');
prev.addEventListener('click', previous);
const next = document.querySelector('.next');
next.addEventListener('click', fnext);

function previous(){
    
    const lightbox = document.querySelector('.lightbox');
    const img = document.querySelector('.lightbox img');

    if(info.previousElementSibling == null){
        const imgURL = gallery[gallery.length - 1].src;
        img.src=imgURL;
        info = gallery[gallery.length - 1];
    }
    else
    {
        const imgUrl = info.previousElementSibling.src; 
        img.src = imgUrl;
        lightbox.classList.add('visible'); 
        info = info.previousElementSibling; 
    }

    if(x == 1){
        x = gallery.length;
    }
    else{
        x--;
    }
    document.getElementById('zIlu').innerHTML=gallery.length;
    document.getElementById('ile').innerHTML=x;
    lightbox.addEventListener('click', hideLightbox);

   
    

}


function fnext(){
    const lightbox = document.querySelector('.lightbox');
    const img = document.querySelector('.lightbox img');
    
    
    if(info.nextElementSibling == null){
        console.log('hej');
        const imgURL = gallery[0].src;
        img.src=imgURL;
        info = gallery[0];
        
    }
    else{
        console.log('idzie');
        const imgUrl = info.nextElementSibling.src; 
        img.src = imgUrl;
        info = info.nextElementSibling;
        lightbox.classList.add('visible');
    }
    if(x == gallery.length){
        x = 1;
    }
    else{
        x++;
    }
    document.getElementById('zIlu').innerHTML=gallery.length;
    document.getElementById('ile').innerHTML=x;
    lightbox.addEventListener('click', hideLightbox);
}

let a = document.querySelector('.prev');
let b = document.querySelector('.next');

a.addEventListener('mouseover', kolor);
a.addEventListener('mouseout', kolor);
b.addEventListener('mouseover', kolor1);
b.addEventListener('mouseout', kolor1);
let flaga = 1;

function kolor(){
    if(flaga == 1){
        a.style.opacity = '1';
        a.style.transition = '0.5s';
        flaga = 2;
    }
    else
    {
        flaga = 1;
        a.style.opacity = '0';
    }
    
}

function kolor1(){
    if(flaga == 1){
        b.style.opacity = '1';
        b.style.transition = '0.5s';
        flaga = 2;
    }
    else
    {
        flaga = 1;
        b.style.opacity = '0';
    }
    
}
