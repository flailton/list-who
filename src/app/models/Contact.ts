import { Link } from "./Link";
import { Phone } from "./Phone";
import { User } from "./User";

export class Contact {
    constructor(
        public id?: number,
        public user?: User,
        public name?: string,
        public email?: string,
        public links?: Link[],
        public phones?: Phone[]
    ) { }
}
