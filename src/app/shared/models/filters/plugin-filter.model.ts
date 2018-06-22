import { SORT_DEFAULT } from '../../constants/filters';

export class PluginFilter {
    constructor(
        public sortField: string = SORT_DEFAULT.FIELD.PLUGIN,
        public sortOrder: string = SORT_DEFAULT.ORDER
    ) {
    }

    toObject() {
        return Object.assign({}, this);
    }
}
