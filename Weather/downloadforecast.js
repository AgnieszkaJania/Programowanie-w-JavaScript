export default class DownloadForecast{
    constructor(){
        this.serverForecast = 'http://api.openweathermap.org/data/2.5/forecast?q={City}&lang={Lang}&units=metric&appid={Key}';
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