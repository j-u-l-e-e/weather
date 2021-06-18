<template>
    <div class="weather">
        <autocomplete
                :options="cityOptions"
                v-model="city"
                class="weather__autocomplete"
        />
        <template v-if="weather !== null">
            <h3 class="weather__description">
                {{weather.description}}
            </h3>
            <img  class="weather__icon" :src="weather.iconUrl"/>
            <div class="weather__details">
                <h3>{{weather.temperature | temperature(useFahrenheit) }}</h3>
                {{weather.temperatureMax | temperature(useFahrenheit) }} / {{weather.temperatureMin |
                temperature(useFahrenheit) }}<br>
                Feels like: {{weather.temperatureFeelsLike | temperature(useFahrenheit) }}<br>
                <label>
                    Use fahrenheit
                    <input
                            type="checkbox"
                            v-model="useFahrenheit"
                    />
                </label><br><br>
                Humidity: {{weather.humidity}}%<br>
                Pressure: {{weather.pressure}} hPa<br>
                Wind: {{weather.windSpeed}} m/s ({{weather.windDirection | direction}})
            </div>
        </template>
        <h1 v-if="weather === null">
            No city selected
        </h1>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import Autocomplete from "@/components/Autocomplete.vue";
    import {City, IOption} from "@/helpers/ioption";
    import {Geolocation} from "@/helpers/geolocation";
    import {CityService} from "@/services/city-service";
    import {OpenWeatherService} from "@/services/open-weather-service";
    import {IWeather, Weather} from "@/helpers/iweather";
    import {degreeDirectionToCardinal, kelvinToCelsius, kelvinToFahrenheit} from "@/helpers/converter";

    @Component({
        components: {
            Autocomplete
        },
        filters: {
            temperature(k: number, fahrenheit: boolean) {
                return fahrenheit ? `${kelvinToFahrenheit(k)}°F` : `${kelvinToCelsius(k)}°C`
            },
            direction(d: number) {
                return degreeDirectionToCardinal(d)
            }
        }
    })

    export default class App extends Vue {
        private city: IOption | null = null;
        private deviceCity: IOption | null = null;
        private cities: Array<IOption> = [];
        private weather: IWeather | null = null;
        private useDark = false;
        private useFahrenheit = false;

        @Watch('city')
        async onCityChanged(): Promise<void> {
            await this.updateWeather();
        }

        private get cityOptions(): Array<IOption> {
            return this.cities.map(city => ({
                name: city.name,
                id: city.id
            }));
        }

        private applyDeviceCity(): void {
            this.city = this.deviceCity;
        }

        private async updateWeather(): Promise<void> {
            if (this.city !== null) {
                this.weather = await OpenWeatherService.getInstance().fetchById(this.city.id);
            } else {
                this.weather = null;
            }
        }

        private async updateDeviceCity(): Promise<void> {
            let geolocationPosition = await Geolocation.getInstance().fetchGeolocationPosition();
            const weather = await OpenWeatherService.getInstance().fetchByCoordinates(geolocationPosition.coords.latitude, geolocationPosition.coords.longitude);
            this.deviceCity = new City(weather.cityId, weather.cityName);
        }

        private async updateCities() : Promise<void> {
            this.cities = await CityService.getInstance().fetchCities();
            if (this.deviceCity !== null) {
                this.cities.push(this.deviceCity);
            }
        }

        private async created(): Promise<void> {
            try {
                await this.updateDeviceCity();
                await this.updateCities();
                this.applyDeviceCity();
            } catch (e) {
                // ignore
            }
        }
    }
</script>

<style lang="scss" scoped>
    .weather {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 80%;

        @media screen and (min-width: 576px) {
            max-width: 500px;
        }
    }

    .weather__autocomplete {
        margin: 10px;
        font-size: 1.17em;
        width: 100%;
    }

    .weather__description, .weather__details  {
        width: 100%;
    }

    .weather__image {
        display: flex;
        margin: 0 auto;
    }

    .weather__description {
        text-align: center;
        margin-bottom: 10px;

        &::first-letter {
            text-transform: capitalize;
        }
    }

    .weather__details {
        h3 {
            margin-bottom: 0;
        }
    }

    @media screen and (min-width: 576px) {
        h3 {
            font-size: 36px;
        }

        .weather__autocomplete {
            font-size: 28px;
        }
    }
</style>
