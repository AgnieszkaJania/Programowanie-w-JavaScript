export default class CreateTable{
    constructor(Obj){
        this.table = document.createElement('div');
        this.table.className = 'tabelka';
        this.tab = document.createElement('table');
        this.place = document.createElement('caption');
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



