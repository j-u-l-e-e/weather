<template>
  <div id="app" :data-dark="useDark">
    <autocomplete
            :options="cities"
            v-model="city"
            @change="onCitySelect"
    />
    <div class="city">
      {{city.name}}
    </div>
    <label>
      Dark mode
      <input
              type="checkbox"
              v-model="useDark"
      />
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Autocomplete from "@/components/Autocomplete.vue";
import {IOption} from "@/helpers/ioption";
import {Geolocation, GeolocationError} from "@/helpers/geolocation";

@Component({
  components: {
    Autocomplete
  }
})

export default class App extends Vue {
  // eslint-disable-next-line no-undef
  private geolocationPosition : GeolocationPosition | undefined;
  private city: IOption = {
    name: 'Riga',
    id: 90
  };
  private cities: Array<IOption> = [
    {
      name: 'Riga',
      id: 90
    },
    {
      name: 'Daugavpils',
      id: 78
    },
  ];
  private useDark = false;

  onCitySelect(option: IOption): void {
    this.city = option;
  }

  async created() {
    try {
      this.geolocationPosition = await Geolocation.getInstance().fetchGeolocationPosition();
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
