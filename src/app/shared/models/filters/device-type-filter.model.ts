import { SORT_DEFAULT } from '../../constants/filters';

export class DeviceTypeFilter {
    constructor(
        public sortField: string = SORT_DEFAULT.FIELD.DEVICE_TYPE,
        public sortOrder: string = SORT_DEFAULT.ORDER
    ) {
    }

    toObject() {
        return Object.assign({}, this);
    }
}
