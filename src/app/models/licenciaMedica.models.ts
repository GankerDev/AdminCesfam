export class LicenciaMedica {

    constructor (
        public cant_licencias_pedidas?: number,
        public cant_dias_licencia?: number,
        public desde?: Date,
        public hasta?: Date,
        public numero_licencia?: number,
        public entidad_pagadora?: string,
        public renta1?: number,
        public renta2?: number,
        public renta3?: number,
        public promedio?: number,
        public funcionario?: string,
        public _id?: string
    ) {}

}
