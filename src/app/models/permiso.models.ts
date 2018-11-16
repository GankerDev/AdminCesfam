export class Permiso {

    constructor (
        public fecha?: Date,
        public dias_fijos?: string,
        public tiempo_permiso?: Date,
        public dias_restantes?: number,
        public dias_adm_fijos?: number,
        public dias_adm_acumulados?: number,
        public tipoPermisos?: string,
        public _id?: string
    ) {}

}
