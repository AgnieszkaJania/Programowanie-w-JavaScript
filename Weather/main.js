import Database from './database.js';
import Dane from './dane.js';
import DownloadWeather from './downloadweather.js';
import DownloadForecast from './downloadforecast.js';
import CreateIcon from './createicon.js';
import CreateTable from './createtable.js';
console.log(Database);

class Note{
    constructor(city){
        this.city = city;
    }
}

class EventHandlers{

    constructor(){
        this.button = document.querySelector('#button');
        this.inputCity = document.querySelector('#city');
        this.container = document.querySelector('#container');
        this.container1 = document.querySelector('#container1');
        this.button.addEventListener('click', () => this.GetWeather());
        
        
        
    }

    GetWeather(){
        const cityName = this.inputCity.value;
        weatherDownload.GetWeather(cityName).then(this.ShowObj).then(this.SaveCity);
        weatherDownloadForecast.GetWeatherForecast(cityName).then(this.ShowObjTable);
        
    }

    SaveCity=(obj)=>{
        
        const note = new Note(obj.name);
        dane.AddNote(note);
        db.setItem(dane.arr);
    }
        
    ShowObj=(obj)=>{
        const tmp = new CreateIcon(obj);
        console.log(obj);
        this.container.appendChild(tmp.box);
        return obj;
    }

    ShowObjTable=(obj)=>{
        const tmp = new CreateTable(obj);
        this.container1.appendChild(tmp.table);

    }

}

const dane = new Dane();

const weatherDownloadForecast = new DownloadForecast();

const weatherDownload = new DownloadWeather();

const db = new Database();


const eventHandler = new EventHandlers();
    
setInterval(()=>{
    const container = document.querySelector('#container');
    const container1 = document.querySelector('#container1');
    let elementy = document.querySelectorAll('.kafelka');
    let elementy1 = document.querySelectorAll('.tabelka');
    console.log(elementy);
    for(let i = 0; i < elementy.length; i++){
        container.removeChild(elementy[i]);
    }
    for(let i = 0; i < elementy1.length; i++){
        container1.removeChild(elementy1[i]);
    }
    console.log(dane.arr);
    async function RenewWeather(){
        for(let i = 0; i < dane.arr.length; i++){
        
            let cityN = dane.arr[i].city;
            const objectPlace = await weatherDownload.GetWeather(cityN).then(eventHandler.ShowObj);
            const objTable = await  weatherDownloadForecast.GetWeatherForecast(cityN).then(eventHandler.ShowObjTable);
            // ??? tutaj tablice obiektów dodać i await 
        }
    }
    RenewWeather();
    

}, 10000)


