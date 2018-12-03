import { Component, OnInit } from '@angular/core';
import { Capacitacion } from '../../models/capacitacion.models';
import { CapacitacionService } from '../../services/capacitacion/capacitacion.service';

declare var swal: any;

@Component({
  selector: 'app-capacitaciones',
  templateUrl: './capacitaciones.component.html',
  styles: []
})
export class CapacitacionesComponent implements OnInit {

  capacitaciones: Capacitacion[] = [];
  cargando: boolean = true;
  desde: number = 0;
  totalRegistros: number = 0;
  nivel_tecnico: string;

  constructor(
    public _capacitacionService:  CapacitacionService
  ) { }

  ngOnInit() {
    this.cargarCapacitaciones();
  }

  cargarCapacitaciones() {
    this.cargando = true;
    this._capacitacionService.cargarCapacitacion(this.desde, false)
        .subscribe( capacitaciones => {
          this.totalRegistros = this._capacitacionService.totalCapacitaciones;
          this.cargando = false;
          this.capacitaciones = capacitaciones;
        });

  }

  buscarCapacitacion( termino: string ) {
     if ( termino.length <= 0 ) {
       this.cargarCapacitaciones();
       return;
     }

     this._capacitacionService.buscarCapacitacion( termino )
         .subscribe( capacitacion => this.capacitaciones = capacitacion );
   }

  borrarCapacitacion( capacitacion: Capacitacion ) {
        swal({
          title: '¿Esta seguro?',
          text: 'Esta a punto de borrar una capacitación',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        })
        .then( borrar => {
          if ( borrar ) {
            this._capacitacionService.borrarCapacitacion( capacitacion._id )
                .subscribe(() => this.cargarCapacitaciones());
          }
        });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarCapacitaciones();
  }

}

