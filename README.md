# Weather webapp

## Description
A forecast web application made on Vue 2.
Weather is presented by default based on the device's location. A city can also be chosen from an autocomplete list. 
Weather data being displayed: 
- temperature (current, min, max, feels like), 
- humidity, 
- pressure, 
- wind (speed, direction).

The device's position is retrieved via the Geolocation API when it is first started.
To get weather data, OpenWeather API is used.

Additional features:
- dark mode,
- Celsius/Fahrenheit unit switch,
- layout responsiveness.

Link to the deployed webapp: https://wonderful-khorana-fd91a5.netlify.app/

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```
