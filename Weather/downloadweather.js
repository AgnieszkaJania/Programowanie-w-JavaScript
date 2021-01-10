export default class DownloadWeather{
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