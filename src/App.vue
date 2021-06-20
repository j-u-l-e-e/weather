<template>
  <div
          id="app"
          :data-dark="useDark"
  >
    <label>
      Dark mode
      <input
              type="checkbox"
              v-model="useDark"
      />
    </label>
    <the-weather></the-weather>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import TheWeather from "@/components/TheWeather.vue";

@Component({
  components: {
    TheWeather
  }
})

export default class App extends Vue {
  private useDark = false;
}
</script>

<style lang="scss">
  @import "styles/variables.css";

  body {
    margin: unset;
    min-height: 100vh;
  }

  #app {
    background: var(--bg-color);
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: var(--text-color);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
