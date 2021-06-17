export interface IWeather {
    temperatureCurr: number;
    temperatureMin: number;
    temperatureMax: number;
    humidity: number;
    pressure: number;
    windDirection: number;
    windSpeed: number;
}

export interface IWeatherService {
    fetchById(id: number) : Promise<IWeather>;
    fetchByCoordinates(latitute: number, longitude: number) : Promise<IWeather>;
}
