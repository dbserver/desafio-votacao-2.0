import {BaseEntity} from "typeorm";

export default class ExtendedBaseEntity<T> extends BaseEntity {

    constructor(init?:Partial<T>) {
        super()
        if (init) Object.assign(this, init)
    }

    // static teste() {
    //     return 'ok'
    // }

}
