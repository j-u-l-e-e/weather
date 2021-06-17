export class CityError extends Error {

}

export class City {
    private static instance: City;
    private static readonly CITIES_URL : string = "/city.list.json";
    private cities = [];

    public static getInstance(): City {
        if (!City.instance) {
            City.instance = new City();
        }
        return City.instance;
    }

    public async fetchCities() : Promise<any> {
        const response = await fetch(City.CITIES_URL);
        if (response.ok) {
            this.cities = await response.json();
            return this.cities;
        } else {
            throw new CityError("unable to fetch cities");
        }
    }
}
