import { Component, OnInit } from '@angular/core';
import { CapacitacionService } from '../../services/service.index';
import { Capacitacion } from '../../models/capacitacion.models';

declare var swal: any;

@Component({
  selector: 'app-capacitacion',
  templateUrl: './capacitacion.component.html',
  styles: []
})
export class CapacitacionComponent implements OnInit {

  capacitaciones: Capacitacion[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;


  constructor(
    public _capacitacionService: CapacitacionService
  ) { }

  ngOnInit() {
    this.cargarCapacitaciones();
  }

  cargarCapacitaciones() {
    this.cargando = true;

    this._capacitacionService.cargarCapacitaciones(this.desde)
        .subscribe( (Capacitaciones: any) => {
          this.totalRegistros = this._capacitacionService.totalCapacitaciones;
          this.capacitaciones = Capacitaciones;
          this.cargando = false;
        });

  }

  buscarCapacitacion( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarCapacitaciones();
      return;
    }

    this.cargando = true;

    this._capacitacionService.buscarCapacitacion( termino )
        .subscribe( capacitacion => {
          this.cargando = false;
          this.capacitaciones = capacitacion;
        });
  }

  guardarCapacitacion( capacitacion: Capacitacion ) {
    this._capacitacionService.actualizarCapacitacion( capacitacion )
        .subscribe();
  }

  borrarCapacitacion( capacitacion: Capacitacion ) {
        swal({
          title: '¿Esta seguro?',
          text: 'Esta a punto de borrar la capacitación ' + capacitacion.nombre_capacitacion,
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

  crearCapacitacion() {
    swal({
      title: 'Crear capacitación',
      text: 'Ingrese el nombre de la capacitación',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true,
    }).then( (valor: string) => {
      if (!valor || valor.length === 0) {
        return;
      }

      this._capacitacionService.crearCapacitacion(valor, null)
          .subscribe(() => this.cargarCapacitaciones());
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
