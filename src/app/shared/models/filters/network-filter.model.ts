export class NetworkFilter {
    constructor(public name?: string) {
    }

    clear(){
        this.name = '';
    }

    toObject() {
        return Object.assign({}, this);
    }
}