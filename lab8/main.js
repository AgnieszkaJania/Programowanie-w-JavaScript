class Note{
    constructor(city){
        this.city = city;
        // this.temp = temp;
        // this.humidity = humidity;
        // this.clouds = clouds;
        // this.wind = wind;
        // this.desc = desc;
    }
}


class Dane {
    constructor(){
        this.arr = [];
    }
    AddNote(note){
        this.arr.push(note);
        
    }
    getNotes(){ 
        return [...this.arr];
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

class DownloadForecast{
    constructor(){
        this.serverForecast = `http://api.openweathermap.org/data/2.5/forecast?q={City}&lang={Lang}&units=metric&appid={Key}`;
        this.keyForecast = 'dcd1bd22b28d38df327c7af10fe8e896';
        this.lang = 'PL';
    }

    StringConventerForecast(string, object) {
        for (const key in object) {
            const value = object[key];

            string = string.replace('{' + key + '}', value);
        }
        return string;
    }

    GetWeatherForecast(name) {
        const URL =
            this.StringConventerForecast(this.serverForecast, { City: name, Lang: this.lang, Key: this.keyForecast });

        const promise = fetch(URL);
        return promise
            .then((e) => e.json())
            .catch(e => console.error(e));
    }
}
const weatherDownloadForecast = new DownloadForecast();

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
        // dane.arr = dane.arr.filter(el => el.city != id);
        // console.log(dane.arr);
    }
}
const db = new Database();
const ri = new RemoveIcon();


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
        let ta = ["Brno"];
        weatherDownload.GetWeather(cityName).then(this.ShowObj).then(this.SaveCity);
        
        weatherDownloadForecast.GetWeatherForecast(cityName).then(this.ShowObjTable);
        
        
       
        
    }
    SaveCity=(obj)=>{
        
        const note = new Note(obj.name);
        dane.AddNote(note);
        
        console.log(dane.arr);
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
const eventHandler = new EventHandlers();
    
// setInterval(()=>{
//     const container = document.querySelector('#container');
//     const container1 = document.querySelector('#container1');
//     let elementy = document.querySelectorAll('.kafelka');
//     let elementy1 = document.querySelectorAll('.tabelka');
//     console.log(elementy);
//     for(let i = 0; i < elementy.length; i++){
//         container.removeChild(elementy[i]);
//     }
//     for(let i = 0; i < elementy1.length; i++){
//         container1.removeChild(elementy1[i]);
//     }
   
//     for(let i = 0; i < dane.arr.length; i++){
        
//         let s = dane.arr[i].city;
//         weatherDownload.GetWeather(s).then(eventHandler.ShowObj);
        
//         weatherDownloadForecast.GetWeatherForecast(s).then(eventHandler.ShowObjTable);
        
//     }
    

// }, 120000)


class CreateTable{
    constructor(Obj){
        this.table = document.createElement('div');
        this.table.className = 'tabelka';
        this.tab = document.createElement('table');
        this.place = document.createElement('tr');
        this.place.innerHTML = Obj.city.name + ' - prognoza pogody';
        this.title = document.createElement('tr');
        this.colDateTime = document.createElement('th');
        this.colDateTime.innerHTML = 'Czas';
        this.colTemp = document.createElement('th');
        this.colTemp.innerHTML = 'Temperatura';
        this.colHumidity = document.createElement('th');
        this.colHumidity.innerHTML = 'Humidity';
        this.colClouds = document.createElement('th');
        this.colClouds.innerHTML = 'Clouds';
        this.colWind = document.createElement('th');
        this.colWind.innerHTML = 'Wind';
        this.tab.appendChild(this.place);
        this.title.appendChild(this.colDateTime);
        this.title.appendChild(this.colTemp);
        this.title.appendChild(this.colHumidity);
        this.title.appendChild(this.colClouds);
        this.title.appendChild(this.colWind);
        this.tab.appendChild(this.title);
        
        for(let i = 0; i < 12; i++){
            
            this.row = document.createElement('tr');
            var daneCzas = document.createElement('td');
            daneCzas.innerHTML = Obj.list[i].dt_txt;
            var daneTemp = document.createElement('td');
            daneTemp.innerHTML = Obj.list[i].main.temp;
            var daneHumidity = document.createElement('td');
            daneHumidity.innerHTML = Obj.list[i].main.humidity;
            var daneClouds = document.createElement('td');
            daneClouds.innerHTML = Obj.list[i].clouds.all;
            var daneWind = document.createElement('td');
            daneWind.innerHTML = Obj.list[i].wind.speed;
            
            this.row.appendChild(daneCzas);
            this.row.appendChild(daneTemp);
            this.row.appendChild(daneHumidity);
            this.row.appendChild(daneClouds);
            this.row.appendChild(daneWind);

            this.tab.appendChild(this.row); 

        }
        this.table.appendChild(this.tab);
        console.log(Obj);
        console.log(Obj.list[0].main.temp);

    }
}



class CreateIcon {
    constructor(Obj) {
        console.log(Obj.name);
        console.log(Obj.temp);
        this.box = document.createElement('div');
        this.box.className = 'kafelka';
        //this.box.id = Obj.name;
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


