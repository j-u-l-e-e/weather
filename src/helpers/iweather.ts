export interface IWeather {
    cityName: string;
    cityId: number;
    description: string;
    temperature: number;
    temperatureMin: number;
    temperatureMax: number;
    temperatureFeelsLike: number;
    humidity: number;
    pressure: number;
    windDirection: number;
    windSpeed: number;
    iconUrl: string;
}
