export class CityServiceError extends Error {

}

export class CityService {
    private static instance: CityService;
    private static readonly CITIES_URL : string = "/city.list.json";
    private cities = [];

    public static getInstance(): CityService {
        if (!CityService.instance) {
            CityService.instance = new CityService();
        }
        return CityService.instance;
    }

    public async fetchCities() : Promise<any> {
        const response = await fetch(CityService.CITIES_URL);
        if (response.ok) {
            this.cities = (await response.json()).slice(0, 101);
            this.cities.sort((a, b) => (a['name'] > b['name'] ? -1 : 0));
            return this.cities;
        } else {
            throw new CityServiceError("unable to fetch cities");
        }
    }
}
