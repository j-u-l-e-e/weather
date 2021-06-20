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
    background: var(--bg-color);
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: var(--text-color);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
