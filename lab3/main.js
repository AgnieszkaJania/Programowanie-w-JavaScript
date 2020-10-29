/* eslint-disable indent */
document.body.addEventListener('keypress', onKeyPress);
document.querySelector('#recordButtonOne').addEventListener('click', recordBtnOne);
document.querySelector('#recordButtonTwo').addEventListener('click', recordBtnTwo);
document.querySelector('#recordButtonThree').addEventListener('click', recordBtnThree);
document.querySelector('#recordButtonFour').addEventListener('click', recordBtnFour);
document.querySelector('#playButtonOne').addEventListener('click', playBtnOne);
document.querySelector('#playButtonTwo').addEventListener('click', playBtnTwo);
document.querySelector('#playButtonThree').addEventListener('click', playBtnThree);
document.querySelector('#playButtonFour').addEventListener('click', playBtnFour);
document.querySelector('#playButtonAll').addEventListener('click', playBtnAll);

const gallery = document.querySelectorAll('.sounds div');

for(let i = 0; i < gallery.length; i++){
    const audio = gallery[i];
    audio.addEventListener('click', Play);
    audio.addEventListener('mouseover', kolor);
    audio.addEventListener('mouseout', kolorout);
}

const a = document.querySelector('#Boom');
const b = document.querySelector('#Clap');
const c = document.querySelector('#Hihat');
const d = document.querySelector('#Kick');
const e = document.querySelector('#Openhat');
const f = document.querySelector('#Ride');
const g = document.querySelector('#Snare');
const h = document.querySelector('#Tink');
const i = document.querySelector('#Tom');

function kolor(tmp){
    let x = tmp.target;
    x.style.background = 'rgb(202, 85, 167)';
    x.style.transition = '0.5s';
}
function kolorout(tmp){
    let x = tmp.target;
    x.style.background = 'rgba(185, 144, 173, 1)';
    x.style.transition = '0.5s';
}

let recordedSoundOne = [];
let recordedSoundTwo = [];
let recordedSoundThree = [];
let recordedSoundFour = [];

let recordedStartTimeOne;
let recordedStartTimeTwo;
let recordedStartTimeThree;
let recordedStartTimeFour;
let recordOne = false;
let recordTwo = false;
let recordThree = false;
let recordFour = false;
let soundId;

function RecordOne(){
    const soundTime = Date.now() - recordedStartTimeOne;
    
    const soundObj = {
        soundId: soundId,
        time: soundTime

    };
    recordedSoundOne.push(soundObj);
}

function RecordTwo(){
    const soundTime = Date.now() - recordedStartTimeTwo;
        
        const soundObj = {
            soundId: soundId,
            time: soundTime
    
        };
        recordedSoundTwo.push(soundObj);
}

function RecordThree(){
    const soundTime = Date.now() - recordedStartTimeThree;
        
        const soundObj = {
            soundId: soundId,
            time: soundTime
    
        };
        recordedSoundThree.push(soundObj);
}

function RecordFour(){
    const soundTime = Date.now() - recordedStartTimeFour;
        
        const soundObj = {
            soundId: soundId,
            time: soundTime
    
        };
        recordedSoundFour.push(soundObj);
}

function Play(ev){
    soundId = undefined;
    console.log(ev);
    
    switch(ev.target){
        case a:
            soundId = 'boom';
            break;
        case b:
            soundId = 'clap';
            break;
        case c:
            soundId = 'hihat';
            break;
        case d:
            soundId = 'kick';
            break;
        case e:
            soundId = 'openhat';
            break;
        case f:
            soundId = 'ride';
            break;
        case g:
            soundId = 'snare';
            break;
        case h:
            soundId = 'tink';
            break;
        case i:
            soundId = 'tom';
            break;

        
    }
    playSound(soundId);

    

    if(recordOne){
        RecordOne();
    }
    console.log(recordedSoundOne);

    if(recordTwo){
        RecordTwo();
    }
    console.log(recordedSoundTwo);
    if(recordThree){
        RecordThree();
    }
    console.log(recordedSoundThree);
    if(recordFour){
        RecordFour();
    }
    console.log(recordedSoundFour);
}


function onKeyPress(ev){
    console.log(ev);
    soundId = undefined;

    // if(ev.code ==='KeyA'){
    //     const sound = document.querySelector('#boom');
    //     sound.play();

    // }
    switch(ev.code){
        case 'KeyA':
            soundId ='boom';
            break;
        case 'KeyS':
            soundId = 'clap';
            break;
        case 'KeyQ':
            soundId = 'hihat';
            break;
        case 'KeyP':
            soundId = 'kick';
            break;
        case 'KeyR':
            soundId = 'openhat';
            break;
        case 'KeyY':
            soundId = 'ride';
            break;
        case 'KeyO':
            soundId = 'snare';
            break;
        case 'KeyB':
            soundId = 'tink';
            break;
        case 'KeyC':
            soundId = 'tom';
            break;

    }
    console.log(recordedStartTimeOne);
    console.log(soundId);
    if(soundId != undefined){
        playSound(soundId);
    }

    if(recordOne){
        RecordOne();
    }
    console.log(recordedSoundOne);
    if(recordTwo){
        RecordTwo();

    }
    console.log(recordedSoundTwo);
    if(recordThree){
        RecordThree();
    }
    console.log(recordedSoundThree);
    if(recordFour){
        RecordFour();
    }
    console.log(recordedSoundFour);
      
}


function recordBtnOne(){
    recordedSoundOne = [];
    recordOne = true;
    recordedStartTimeOne = Date.now();
}
function recordBtnTwo(){
    recordedSoundTwo = [];
    recordTwo = true;
    recordedStartTimeTwo = Date.now();
}
function recordBtnThree(){
    recordedSoundThree = [];
    recordThree = true;
    recordedStartTimeThree = Date.now();
}
function recordBtnFour(){
    recordedSoundFour = [];
    recordFour = true;
    recordedStartTimeFour = Date.now();
}


function playBtnOne(){
    recordOne = false;
    for (let index = 0; index < recordedSoundOne.length; index++) {
        const soundObj = recordedSoundOne[index];
        if(soundObj.soundId != undefined){
            setTimeout(()=> {
                playSound(soundObj.soundId);
            },
            soundObj.time);  
        } 
  
    }
    
}
function playBtnTwo(){
    recordTwo = false;
    for (let index = 0; index < recordedSoundTwo.length; index++) {
        const soundObj = recordedSoundTwo[index];
        if(soundObj.soundId != undefined){
            setTimeout(()=> {
                playSound(soundObj.soundId);
            },
            soundObj.time);  
        } 
   
    }
    
}
function playBtnThree(){
    recordThree = false;
    for (let index = 0; index < recordedSoundThree.length; index++) {
        const soundObj = recordedSoundThree[index];
        if(soundObj.soundId != undefined){
            setTimeout(()=> {
                playSound(soundObj.soundId);
            },
            soundObj.time);  
        }    
    }
    
}
function playBtnFour(){
    recordFour = false;
    for (let index = 0; index < recordedSoundFour.length; index++) {
        const soundObj = recordedSoundFour[index];
        if(soundObj.soundId != undefined){
            setTimeout(()=> {
                playSound(soundObj.soundId);
            },
            soundObj.time);  
        }         
    }
    
}


function playBtnAll(){
    playBtnOne();
    playBtnTwo();
    playBtnThree();
    playBtnFour();
}

 
function playSound(soundId){
    const sound = document.querySelector('#' + soundId);
    sound.play();
}

