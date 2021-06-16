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

@Component({
  components: {
    Autocomplete
  }
})

export default class App extends Vue {
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
}
</script>

<style lang="scss">
  @import "styles/variables.css";

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 60px;
    background-color: var(--bg-color);
    color: var(--text-color);
  }

  .city {
    color: var(--text-color);
  }
</style>
