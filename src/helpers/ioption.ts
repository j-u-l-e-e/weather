export interface IOption {
    id: number;
    name: string;
}

export class City implements IOption {
    id = -1;
    name = '';

    constructor(id = -1, name = '') {
        this.id = id;
        this.name = name;
    }
}
