import { LinkType } from "./LinkType";

export class Link {
    constructor(
        public id?: number,
        public link_type_id?: number,
        public link?: string,
        public link_type?: LinkType
    ) { }
}
