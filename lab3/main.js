document.body.addEventListener('keypress', onKeyPress);
document.querySelector('#recordButton').addEventListener('click', recordBtn);
document.querySelector('#playButton').addEventListener('click', playBtn);

let recordedSound = [];

let recordedStartTime;

function onKeyPress(ev){
    console.log(ev);
    let soundId;

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

    }
    if(soundId){
        const soundTime = Date.now() - recordedStartTime;
        
        const soundObj = {
            soundId: soundId,
            time: soundTime

        };
        playSound(soundId);
        recordedSound.push(soundObj);
    }
}

function recordBtn(){
    recordedStartTime = Date.now();
}

function playBtn(){
    for (let index = 0; index < recordedSound.length; index++) {
        const soundObj = recordedSound[index];
        setTimeout(()=> {
            playSound(soundObj.soundId);
        },
        soundObj.time);   
        
    }
}

function playSound(soundId){
    const sound = document.querySelector('#' + soundId);
    sound.play();
}