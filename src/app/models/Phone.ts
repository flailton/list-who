import { PhoneType } from "./PhoneType";

export class Phone {
    constructor(
        public id?: number,
        public phone_type_id?: number,
        public phone?: string,
        public phone_type?: PhoneType,
    ) { }

}
