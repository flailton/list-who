export class Authentication {
    constructor(
        public access_token?: string,
        public token_type?: string,
        public expires_in?: string
    ) { }
}
