import {Sound} from './klasy-soundKit.js';
import {Sounds} from './klasy-soundKit.js';
import {playSounds} from './klasy-soundKit.js';

let boom = new Sound('Boom', 'boom', 'sounds/boom.wav');
let clap = new Sound('Clap','clap','sounds/clap.wav');
let hihat = new Sound('Hihat','hihat','sounds/hihat.wav');
let kick = new Sound('Kick','kick','sounds/kick.wav');
let openhat = new Sound('Openhat','openhat','sounds/openhat.wav');
let ride = new Sound('Ride','ride','sounds/ride.wav');
let snare = new Sound('Snare','snare','sounds/snare.wav');
let tink = new Sound('Tink','tink','sounds/tink.wav');
let tom = new Sound('Tom','tom','sounds/tom.wav');
let sounds = new Sounds();
sounds.Dodaj(boom);
sounds.Dodaj(clap);
sounds.Dodaj(hihat);
sounds.Dodaj(kick);
sounds.Dodaj(openhat);
sounds.Dodaj(ride);
sounds.Dodaj(snare);
sounds.Dodaj(tink);
sounds.Dodaj(tom);
console.log(boom);
let playSoundsObj = new playSounds();
