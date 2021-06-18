export function kelvinToFahrenheit(k: number): number {
    return Math.round(k * 9/5 -  459.67);
}

export function kelvinToCelsius(k: number): number {
    return Math.round(k - 273.15);
}

export function degreeDirectionToCardinal(d: number): string {
    if (d >= 11.25 && d < 33.75) {
        return 'NNE'
    } else if (d > 33.75 && d < 56.25) {
        return 'NE';
    } else if (d >= 56.25 && d < 78.75) {
        return 'ENE';
    } else if (d >= 78.75 && d < 101.25) {
        return 'E';
    } else if (d >= 101.25 && d < 123.75) {
        return 'ESE';
    } else if (d >= 123.75 && d < 146.25) {
        return 'SE';
    } else if (d >= 146.25 && d < 168.75) {
        return 'SSE';
    } else if (d >= 168.75 && d < 191.25) {
        return 'S';
    } else if (d >= 191.25 && d < 213.75) {
        return 'SSW';
    } else if (d >= 213.75 && d < 236.25) {
        return 'SW';
    } else if (d >= 236.25 && d < 258.75) {
        return 'WSW';
    } else if (d >= 281.25 && d < 303.75) {
        return 'WNW';
    } else if (d >= 303.75 && d < 326.25) {
        return 'NW';
    } else if (d >= 326.25 && d < 348.75) {
        return 'NNW';
    }
    return 'N';
}
