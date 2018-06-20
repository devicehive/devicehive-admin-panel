import { DEFAULT_SORT_FIELD, DEFAULT_SORT_ORDER } from '../../constants/filters';

export class NetworkFilter {
    constructor(
        public name: string = '',
        public sortField: string = DEFAULT_SORT_FIELD,
        public sortOrder: string = DEFAULT_SORT_ORDER
    ) {
    }

    clear() {
        this.name = '';
    }

    toObject() {
        return Object.assign({}, this);
    }
}