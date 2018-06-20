export class DeviceFilter {
    constructor(public name: string = '') {
    }

    clear(){
        this.name = '';
    }

    toObject() {
        return Object.assign({}, this);
    }
}