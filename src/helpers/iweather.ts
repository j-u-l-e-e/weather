export interface IWeather {
    cityName: string;
    cityId: number;
    description: string;
    temperature: number;
    temperatureMin: number;
    temperatureMax: number;
    humidity: number;
    pressure: number;
    windDirection: number;
    windSpeed: number;
}

export class Weather implements IWeather {
    cityName = '';
    cityId = -1;
    description = '';
    temperature = 273.15;
    temperatureMin = 273.15;
    temperatureMax = 273.15;
    humidity = -1;
    pressure = -1;
    windDirection = -1;
    windSpeed = -1;
}
