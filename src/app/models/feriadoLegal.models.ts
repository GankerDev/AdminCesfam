export class FeriadoLegal {

    constructor (
        public dias_vacaciones_fijos?: number,
        public dias_vacaciones_acumulados?: number,
        public fecha_inicio_vacaciones?: Date,
        public fecha_termino_vacaciones?: Date,
        public dias_vacaciones_restantes?: number,
        public _id?: string
    ) {}

}
