import {IWeather} from "@/helpers/iweather";

export interface IWeatherService {
    fetchById(id: number) : Promise<IWeather>;
    fetchByCoordinates(latitude: number, longitude: number) : Promise<IWeather>;
}
