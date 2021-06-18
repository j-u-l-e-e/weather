<template>
  <div
          id="app"
          :data-dark="useDark"
          class="weather"
  >
    <label>
      Dark mode
      <input
              type="checkbox"
              v-model="useDark"
      />
    </label>
    <autocomplete
            :options="cityOptions"
            v-model="city"
            @change="onCitySelect"
            class="weather__autocomplete"
    />
    <h1>
      {{city.name}}
    </h1>
    <h3>
      {{weather.description}}
    </h3>
    <h3>
      {{weather.temperature | temperature(useFahrenheit) }}
    </h3>
    <div>
      {{weather.temperatureMax | temperature(useFahrenheit) }} / {{weather.temperatureMin | temperature(useFahrenheit) }}
    </div>
    <label>
      Use fahrenheit
      <input
              type="checkbox"
              v-model="useFahrenheit"
      />
    </label>
    <div>
      Humidity: {{weather.humidity}}%
    </div>
    <div>
      Pressure: {{weather.pressure}} hPa
    </div>
    <div>
      Wind: {{weather.windSpeed}} m/s ({{weather.windDirection | direction}})
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
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
  // eslint-disable-next-line no-undef
  private geolocationPosition : GeolocationPosition | undefined;
  private city: IOption = new City();
  private deviceCity: IOption = new City();
  private cities: Array<IOption> = [];
  private useDark = false;
  private weather: IWeather = new Weather();
  private useFahrenheit = false;

  onCitySelect(option: IOption): void {
    this.city = option;
  }

  get cityOptions(): Array<IOption> {
    return this.cities.map(city => ({
      name: city.name,
      id: city.id
    }));
  }

  async updateGeolocation(): Promise<void> {
    this.geolocationPosition = await Geolocation.getInstance().fetchGeolocationPosition();
    this.weather = await OpenWeatherService.getInstance().fetchByCoordinates(this.geolocationPosition.coords.latitude, this.geolocationPosition.coords.longitude);
    this.city = this.deviceCity = new City(this.weather.cityId, this.weather.cityName);
  }

  async created(): Promise<void> {
    try {
      await this.updateGeolocation();
      this.cities = await CityService.getInstance().fetchCities();
    } catch (e) {
      // ignore
    }
  }
}
</script>

<style lang="scss">
  @import "styles/variables.css";

  html {
    width: 100%;
    height: 100%;
  }

  body {
    margin: unset;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    background-color: var(--bg-color);
    color: var(--text-color);
    width: 100%;
    height: 100%;
  }

  .city {
    color: var(--text-color);
  }
</style>

<style lang="scss" scoped>
  .weather {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .weather__autocomplete {
    margin: 10px;
  }
</style>
