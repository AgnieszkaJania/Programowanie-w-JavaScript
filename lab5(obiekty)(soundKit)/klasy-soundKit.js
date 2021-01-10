class Sound{
    constructor(Id, SoundId, src){
        this.Id = Id;
        this.audioid = SoundId;
        this.src = src;
    }


}
class PlaySound{
    playSound(id){
        const sound = document.querySelector('#' + id);
        sound.play();

    }
}

class Sounds{
    constructor(){
        this.container = document.querySelector('.sounds');
        this.soundsArr = [];

    }

    Dodaj(sound){
        this.soundsArr.push(sound);
        const htmlSounDiv = document.createElement('div');
        const audio = document.createElement('audio');
        htmlSounDiv.id = sound.Id;
        htmlSounDiv.innerHTML = sound.Id;
        this.container.appendChild(htmlSounDiv);
        htmlSounDiv.appendChild(audio);
        audio.src = sound.src;
        audio.id = sound.audioid;
    }

    
}

class playSounds{
    
    constructor(){
        this.PlaySoundObj = new PlaySound();
        this.RecordedSoundsOneObj = new RecordSounds();
        this.RecordedSoundsTwoObj = new RecordSounds();
        this.RecordedSoundsThreeObj = new RecordSounds();
        this.RecordedSoundsFourObj = new RecordSounds();
        this.onKeyPress(this.PlaySoundObj, this.RecordedSoundsOneObj, this.RecordedSoundsTwoObj, this.RecordedSoundsThreeObj, this.RecordedSoundsFourObj);
    
         
    }

    onKeyPress(PlaySoundObj, RecordedSoundsOneObj, RecordedSoundsTwoObj, RecordedSoundsThreeObj, RecordedSoundsFourObj){
       
        let soundId = undefined;
        let isRecordingOne = false;
        let isRecordingTwo = false;
        let isRecordingThree = false;
        let isRecordingFour = false;
        let RecordingTimeOne;
        let RecordingTimeTwo;
        let RecordingTimeThree;
        let RecordingTimeFour;
        document.body.addEventListener('keypress', function(ev){
            
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
            console.log(soundId);
            

            if(soundId != undefined){
                   
                PlaySoundObj.playSound(soundId);
                if(isRecordingOne){
                    const time = Date.now() - RecordingTimeOne;
                    const SoundObj = {
                        soundId: soundId,
                        time: time
                    };
                    RecordedSoundsOneObj.AddSound(SoundObj);
                }
                if(isRecordingTwo){
                    const time = Date.now() - RecordingTimeTwo;
                    const SoundObj = {
                        soundId: soundId,
                        time: time
                    };
                    RecordedSoundsTwoObj.AddSound(SoundObj);
                }
                if(isRecordingThree){
                    const time = Date.now() - RecordingTimeThree;
                    const SoundObj = {
                        soundId: soundId,
                        time: time
                    };
                    RecordedSoundsThreeObj.AddSound(SoundObj);
                }
                if(isRecordingFour){
                    const time = Date.now() - RecordingTimeFour;
                    const SoundObj = {
                        soundId: soundId,
                        time: time
                    };
                    RecordedSoundsFourObj.AddSound(SoundObj);
                }
            }
           
        });
        const gallery = document.querySelectorAll('.sounds div');
        for(let i = 0; i < gallery.length; i++){
            
            gallery[i].addEventListener('click', function(ev){
                console.log(ev);
                soundId = ev.target.lastElementChild.id;
                PlaySoundObj.playSound(soundId);
                if(isRecordingOne){
                    console.log(RecordingTimeOne);
                    const time = Date.now() - RecordingTimeOne;
                    console.log(time);
                    const SoundObj = {
                        soundId: soundId,
                        time: time
                    };
                    RecordedSoundsOneObj.AddSound(SoundObj);
                }
                if(isRecordingTwo){
                    console.log(RecordingTimeTwo);
                    const time = Date.now() - RecordingTimeTwo;
                    console.log(time);
                    const SoundObj = {
                        soundId: soundId,
                        time: time
                    };
                    RecordedSoundsTwoObj.AddSound(SoundObj);
                }
                if(isRecordingThree){
                    const time = Date.now() - RecordingTimeThree;
                    const SoundObj = {
                        soundId: soundId,
                        time: time
                    };
                    RecordedSoundsThreeObj.AddSound(SoundObj);
                }
                if(isRecordingFour){
                    const time = Date.now() - RecordingTimeFour;
                    const SoundObj = {
                        soundId: soundId,
                        time: time
                    };
                    RecordedSoundsFourObj.AddSound(SoundObj);
                }
                
            });
        }
        let recordBtnOne = document.querySelector('#recordButtonOne');
        recordBtnOne.addEventListener('click', function(){
            
            RecordedSoundsOneObj.ClearArray();
            isRecordingOne = true;
            console.log(isRecordingOne);
            RecordingTimeOne = Date.now();
            console.log(RecordingTimeOne);

        });
        let playBtnOne = document.querySelector('#playButtonOne');
        playBtnOne.addEventListener('click',function(){
            isRecordingOne = false;
            RecordedSoundsOneObj.PlayRecordedSounds();
        });

        let recordBtnTwo = document.querySelector('#recordButtonTwo');
        recordBtnTwo.addEventListener('click', function(){
            RecordedSoundsTwoObj.ClearArray();
            isRecordingTwo = true;
            RecordingTimeTwo = Date.now();
            console.log(RecordingTimeTwo);  
        });
        let playBtnTwo = document.querySelector('#playButtonTwo');
        playBtnTwo.addEventListener('click',function(){
            isRecordingTwo = false;
            RecordedSoundsTwoObj.PlayRecordedSounds();
        });
        let recordBtnThree = document.querySelector('#recordButtonThree');
        recordBtnThree.addEventListener('click', function(){
            RecordedSoundsThreeObj.ClearArray();
            isRecordingThree = true;
            RecordingTimeThree = Date.now();
            console.log(RecordingTimeThree);  
        });
        let playBtnThree = document.querySelector('#playButtonThree');
        playBtnThree.addEventListener('click',function(){
            isRecordingThree = false;
            RecordedSoundsThreeObj.PlayRecordedSounds();
        });
        let recordBtnFour = document.querySelector('#recordButtonFour');
        recordBtnFour.addEventListener('click', function(){
            RecordedSoundsFourObj.ClearArray();
            isRecordingFour = true;
            RecordingTimeFour = Date.now();
            console.log(RecordingTimeFour);  
        });
        let playBtnFour = document.querySelector('#playButtonFour');
        playBtnFour.addEventListener('click',function(){
            isRecordingFour = false;
            RecordedSoundsFourObj.PlayRecordedSounds();
        });
        let playBtnAll = document.querySelector('#playButtonAll');
        playBtnAll.addEventListener('click', function(){
            RecordedSoundsOneObj.PlayRecordedSounds();
            RecordedSoundsTwoObj.PlayRecordedSounds();
            RecordedSoundsThreeObj.PlayRecordedSounds();
            RecordedSoundsFourObj.PlayRecordedSounds();

        });
       


    }
   
        
}

class RecordSounds{
    constructor(){
        this.recordedSoundsArr = [];
    }

    AddSound(SoundObj){
        this.recordedSoundsArr.push(SoundObj);
        console.log(this.recordedSoundsArr);
    }
    ClearArray(){
        this.recordedSoundsArr = [];
    }

    PlayRecordedSounds(){
        let PlaySoundObj2 = new PlaySound();
        for (let index = 0; index < this.recordedSoundsArr.length; index++){
            const soundObject = this.recordedSoundsArr[index];
            setTimeout(() => {
                PlaySoundObj2.playSound(soundObject.soundId);
            },
            soundObject.time);
        }
    }   
}

export{Sounds};
export{Sound};
export{playSounds};
