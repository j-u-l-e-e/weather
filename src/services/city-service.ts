export class CityServiceError extends Error {

}

export class CityService {
    private static instance: CityService;
    private static readonly citiesUrl : string = "/city.list.json";

    public static getInstance(): CityService {
        if (!CityService.instance) {
            CityService.instance = new CityService();
        }
        return CityService.instance;
    }

    public async fetchCities() : Promise<any> {
        const response = await fetch(CityService.citiesUrl);
        if (response.ok) {
            const cities = (await response.json()).slice(0, 101);
            cities.sort((a: any, b: any) => (a['name'] > b['name'] ? -1 : 0));
            return cities;
        } else {
            throw new CityServiceError("unable to fetch cities");
        }
    }
}
