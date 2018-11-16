export class Funcionario {

    constructor (
        public nombre?: string,
        public rut?: string,
        public fecha_nacimiento?: Date,
        public direccion?: number,
        public email?: number,
        public telefono?: string,
        public fecha_inicio_laboral?: Date,
        public fecha_cumple_bienio?: Date,
        public puntaje_cap_acumulado?: number,
        public total_puntaje?: number,
        public nivel_actual?: string,
        public img?: string,
        public categoria_funcionario?: string,
        public capacitacion?: string,
        public tipo_contrato?: string,
        public _id?: string
    ) {}

}
