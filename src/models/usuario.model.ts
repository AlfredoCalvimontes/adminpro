export class Usuario{

    //    Tras que uno es opcional (?), todos los que le sigan tendran que serlo.

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ) { }

}

