import { DEFAULT_SORT_FIELD, DEFAULT_SORT_ORDER } from '../../constants/filters';

export class DeviceTypeFilter {
    constructor(
        public sortField: string = DEFAULT_SORT_FIELD,
        public sortOrder: string = DEFAULT_SORT_ORDER
    ) {
    }

    toObject() {
        return Object.assign({}, this);
    }
}