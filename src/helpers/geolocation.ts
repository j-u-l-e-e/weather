export class GeolocationError extends Error {
}

export class GeolocationNotSupportedError extends GeolocationError {
}

export class GeolocationNotAvailableError extends GeolocationError {
}

export class Geolocation {
    private static instance: Geolocation;
    private readonly supported : boolean;

    private constructor() {
        this.supported = !!navigator.geolocation;
    }

    public static getInstance(): Geolocation {
        if (!Geolocation.instance) {
            Geolocation.instance = new Geolocation();
        }
        return Geolocation.instance;
    }

    public async fetchGeolocationPosition() : Promise<GeolocationPosition> {
        return new Promise((resolve, reject) => {
            if (this.supported) {
                navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
                        resolve(position);
                    },
                    () => {
                        // note: always thrown on http connection
                        reject(new GeolocationNotAvailableError('Unable to retrieve your location'));
                    });
            } else {
                reject(new GeolocationNotSupportedError('Geolocation is not supported by your browser'));
            }
        });
    }
}
