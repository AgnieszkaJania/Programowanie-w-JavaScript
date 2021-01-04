class Note{
    constructor(city, temp, humidity, clouds, wind, desc){
        this.city = city;
        this.temp = temp;
        this.humidity = humidity;
        this.clouds = clouds;
        this.wind = wind;
        this.desc = desc;
    }
}


class Dane {
    constructor(){
        this.arr = [];
        this.cityArr = [];
    }
    AddNote(note){
        this.arr.push(note);
        
    }
    getNotes(){ 
        return [...this.arr];
    }
    AddCity(city){
        this.cityArr.push(city);
    } 
    removeNotes(){
        this.arr = [];
    }
}

const dane = new Dane();

class DownloadWeather{
    constructor(){
        this.server ='https://api.openweathermap.org/data/2.5/weather?q={City}&appid={Key}';
        this.key = 'dcd1bd22b28d38df327c7af10fe8e896';
    }

    StringConventer(string, object) {
        for (const key in object) {
            const value = object[key];

            string = string.replace('{' + key + '}', value);
        }
        return string;
    }

    GetWeather(name) {
        const URL =
            this.StringConventer(this.server, { City: name, Key: this.key });

        const promise = fetch(URL);
        return promise
            .then((e) => e.json())
            .catch(e => console.error(e));
    }

    
}

const weatherDownload = new DownloadWeather();

class Database{
    constructor(itemName = 'weather'){
        this.itemName = itemName;
    }
    setItem(item){
        localStorage.clear();
        localStorage.setItem(this.itemName, JSON.stringify(item));
    }
    
    getItem(){

        const check = localStorage.getItem(this.itemName);
        if(check != null){
        return JSON.parse(localStorage.getItem(this.itemName))}; 
    }
    removeItems(){
        localStorage.clear();
    }
    
        
    
}


class RemoveIcon{
    constructor(){
        this.container = document.querySelector('#container');
        
    }
    removePlace(id){
        let cont = document.querySelector('#container');
        const place = document.getElementById(id);
        
        cont.removeChild(place);
    }
}
const db = new Database();
const ri = new RemoveIcon();


class EventHandlers{

    constructor(){
        this.button = document.querySelector('#button');
        this.inputCity = document.querySelector('#city');
        this.container = document.querySelector('#container');
        this.button.addEventListener('click', () => this.GetWeather());
        
        
    }

    GetWeather(){
        const cityName = this.inputCity.value;
        
        weatherDownload.GetWeather(cityName).then(this.ShowObj);;
        
        
    }
        
    ShowObj=(obj)=>{
        const tmp = new CreateIcon(obj);
        console.log(obj);
        this.container.appendChild(tmp.box);
        const note = new Note(obj.name, obj.main.temp, obj.main.humidity, obj.clouds.all, obj.wind.speed, obj.weather[0].description);
        console.log(note);
        dane.AddNote(note);
        
        console.log(dane.arr);
        db.setItem(dane.arr);
        
       
    }

}
const eventHandler = new EventHandlers();

setInterval(()=> {

    dane.cityArr = [];
    for(let i = 0; i < dane.arr.length; i ++){
        
        dane.cityArr.push(dane.arr[i].city);
    }
    console.log(dane.cityArr);
    dane.removeNotes();
    db.removeItems();
    console.log(dane.cityArr.length);
    
    for(let i = 0; i < dane.cityArr.length; i++){
        console.log(dane.cityArr[i]);
        ri.removePlace(dane.cityArr[i]);
    }

    for(let i = 0; i < dane.cityArr.length; i++){
        weatherDownload.GetWeather(dane.cityArr[i]).then(eventHandler.ShowObj);
    }

    

}, 120000)





class CreateIcon {
    constructor(Obj) {
        console.log(Obj.name);
        console.log(Obj.temp);
        this.box = document.createElement('div');
        this.box.className = 'kafelka';
        this.box.id = Obj.name;
        this.nameC = document.createElement('div');
        this.tempC = document.createElement('div');
        this.humidityC = document.createElement('div');
        this.cloudsC = document.createElement('div');
        this.windC = document.createElement('div');
        this.desc = document.createElement('div');
        this.pict = document.createElement('div');
        this.box.appendChild(this.nameC);
        this.box.appendChild(this.tempC);
        this.box.appendChild(this.humidityC);
        this.box.appendChild(this.cloudsC);
        this.box.appendChild(this.windC);
        this.box.appendChild(this.desc);
        this.box.appendChild(this.pict);
        this.tempInC = (Math.round((Obj.main.temp - 273.15)*10)/10);
        

        this.nameC.innerHTML =  Obj.name;
        this.tempC.innerHTML = 'Temperature: ' + this.tempInC + ' ℃';
        this.humidityC.innerHTML = 'Humidity: ' + Obj.main.humidity;
        this.cloudsC.innerHTML = 'Clouds: ' + Obj.clouds.all;
        this.windC.innerHTML = 'Wind: ' + Obj.wind.speed;
        this.desc.innerHTML = Obj.weather[0].description;
        this.pict.innerHTML = `<img src="http://openweathermap.org/img/wn/${Obj.weather[0].icon}.png" alt="Pusto">`;

        this.box.addEventListener('dblclick', function(){
            ri.removePlace(Obj.name);
        });
        
        
       
          
    }
}


