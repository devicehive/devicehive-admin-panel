import { SORT_DEFAULT } from '../../constants/filters';

export class UserFilter {
    constructor(
        public sortField: string = SORT_DEFAULT.FIELD.USER,
        public sortOrder: string = SORT_DEFAULT.ORDER
    ) {
    }

    toObject() {
        return Object.assign({}, this);
    }
}
