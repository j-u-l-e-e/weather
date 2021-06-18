import {IWeather, IWeatherService} from "@/services/iweather-service";

export class OpenWeatherServiceError extends Error {
}

export class OpenWeatherServiceNoResultsError extends OpenWeatherServiceError {
}

export class OpenWeatherService implements IWeatherService {
    static baseUrl = 'https://api.openweathermap.org/data/2.5/';
    private static apiKey = process.env.VUE_APP_OPEN_WEATHER_API_KEY;
    private static instance: OpenWeatherService;

    public static getInstance(): OpenWeatherService {
        if (!OpenWeatherService.instance) {
            OpenWeatherService.instance = new OpenWeatherService();
        }
        return OpenWeatherService.instance;
    }

    convertSingleResponseToIWeather(jsonResponse: any) : IWeather {
        return {
            cityName: jsonResponse.name,
            cityId: jsonResponse.id,
            description: jsonResponse.weather.length > 0 ? jsonResponse.weather[0].description: '',
            temperature: jsonResponse.main.temp,
            temperatureMin: jsonResponse.main.temp_min,
            temperatureMax: jsonResponse.main.temp_max,
            humidity: jsonResponse.main.humidity,
            pressure: jsonResponse.main.pressure,
            windDirection: jsonResponse.wind.direction,
            windSpeed: jsonResponse.wind.speed
        }
    }

    convertListResponseToIWeather(jsonResponse: any) : IWeather {
        if (jsonResponse.count > 0) {
            const weather = jsonResponse.list[0];
            return {
                cityName: weather.name,
                cityId: weather.id,
                description: weather.weather.length > 0 ? weather.weather[0].description: '',
                temperature: weather.main.temp,
                temperatureMin: weather.main.temp_min,
                temperatureMax: weather.main.temp_max,
                humidity: weather.main.humidity,
                pressure: weather.main.pressure,
                windDirection: weather.wind.direction,
                windSpeed: weather.wind.speed
            }
        } else {
            throw new OpenWeatherServiceNoResultsError();
        }
    }

    async fetchById(id: number): Promise<IWeather> {
        const response = await fetch(`${OpenWeatherService.baseUrl}weather?id=${id}&appid=${OpenWeatherService.apiKey}`);
        if (response.ok) {
            const json = await response.json();
            return this.convertSingleResponseToIWeather(json);
        } else {
            throw new Error('Cannot fetch weather');
        }
    }

    async fetchByCoordinates(latitute: number, longitude: number): Promise<IWeather> {
        const response = await fetch(`${OpenWeatherService.baseUrl}find?lat=${latitute}&lon=${longitude}&cnt=${1}&appid=${OpenWeatherService.apiKey}`);
        if (response.ok) {
            const json = await response.json();
            return this.convertListResponseToIWeather(json);
        } else {
            throw new Error('Cannot fetch weather');
        }
    }
}
