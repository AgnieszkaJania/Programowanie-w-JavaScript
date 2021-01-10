export default class CreateIcon {
    constructor(Obj) {
       
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

          
    }
}