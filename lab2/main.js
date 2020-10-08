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
const next = document.querySelector('.next');
next.addEventListener('click', showLightBox);





function showLightBox(ev){
    console.log(ev.target);
    const lightbox = document.querySelector('.lightbox');
    const img = document.querySelector('.lightbox img');
    const imgUrl = ev.target.src;  
    img.src = imgUrl;
    lightbox.classList.add('visible'); 
    
}
