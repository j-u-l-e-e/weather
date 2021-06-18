import {degreeDirectionToCardinal, kelvinToFahrenheit, kelvinToCelsius} from './converter'

describe('@helpers/converter/kelvinToFahrenheit', () => {
    it('correctly converts to fahrenheit', () => {
        expect(kelvinToFahrenheit(0)).toBeCloseTo(-460);
    });
});

describe('@helpers/converter/kelvinToCelsius', () => {
    it('correctly converts to celsius', () => {
        expect(kelvinToCelsius(273.15)).toBeCloseTo(0);
    });
});

describe('@helpers/converter/degreeDirectionToCardinal', () => {
    it('correctly converts to N', () => {
        expect(degreeDirectionToCardinal(0)).toEqual('N');
    });

    it('correctly converts to NNE', () => {
        expect(degreeDirectionToCardinal(20)).toEqual('NNE');
    });

    it('correctly converts to ENE', () => {
        expect(degreeDirectionToCardinal(60)).toEqual('ENE');
    });

    it('correctly converts to E', () => {
        expect(degreeDirectionToCardinal(90)).toEqual('E');
    });

    it('correctly converts to ESE', () => {
        expect(degreeDirectionToCardinal(110)).toEqual('ESE');
    });
});
