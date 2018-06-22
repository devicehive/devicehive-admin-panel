import { SORT_DEFAULT } from '../../constants/filters';

export class DeviceFilter {
    constructor(
        public name: string = '',
        public sortField: string = SORT_DEFAULT.FIELD.DEVICE,
        public sortOrder: string = SORT_DEFAULT.ORDER
    ) {
    }

    clear() {
        this.name = '';
    }

    toObject() {
        return Object.assign({}, this);
    }
}
