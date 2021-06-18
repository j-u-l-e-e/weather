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
            :value="city"
            @change="onCitySelect"
            class="weather__autocomplete"
    />
    <h1  v-if="city !== null">
      {{city.name}}
    </h1>
    <template v-if="weather !== null">
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
    </template>
    <template v-else>
      <h1>
        No city selected
      </h1>
    </template>
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
  async onPropertyChanged(): Promise<void> {
    await this.updateWeather();
  }

  private onCitySelect(option: IOption): void {
    this.city = option;
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
