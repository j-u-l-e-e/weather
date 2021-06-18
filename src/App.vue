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
            class="weather__autocomplete"
    />
    <div v-if="weather !== null">
      <h3 class="weather-description">
        {{weather.description}}
      </h3>
      <img :src="weather.iconUrl"/>
      <h3>
        {{weather.temperature | temperature(useFahrenheit) }}
      </h3>
      <div>
        {{weather.temperatureMax | temperature(useFahrenheit) }} / {{weather.temperatureMin | temperature(useFahrenheit)
        }}
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
    color: var(--text-color);
    width: 100%;
    height: 100%;
  }

  @media screen and (min-width: 576px) {
    h3 {
      font-size: 36px;
    }
  }
</style>

<style lang="scss" scoped>
  .weather {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--bg-color);
  }

  .weather__autocomplete {
    margin: 10px;
    font-size: 1.4em;
  }

  .weather-description {
    text-align: center;

    &::first-letter {
      text-transform: capitalize;
    }
  }
</style>
