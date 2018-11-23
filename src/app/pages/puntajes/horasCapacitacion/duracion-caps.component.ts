import { Component, OnInit } from '@angular/core';
import { DuracionCap } from '../../../models/puntajes/horasCapacitacion.models';
import { HorasCapService } from '../../../services/puntajes/horas-cap.service';

declare var swal: any;


@Component({
  selector: 'app-duracion-caps',
  templateUrl: './duracion-caps.component.html',
  styles: []
})
export class DuracionCapsComponent implements OnInit {

  duracionCaps: DuracionCap[] = [];
  cargando: boolean = true;

  constructor(
    public _horasCapService:  HorasCapService
  ) { }

  ngOnInit() {
    this.cargarDuracionCap();
  }

  cargarDuracionCap() {
    this.cargando = true;
    this._horasCapService.cargarDuracionCap()
        .subscribe( duracionCaps => {
          this.cargando = false;
          this.duracionCaps = duracionCaps;
        });

  }

  buscarDuracionCap( termino: string ) {
     if ( termino.length <= 0 ) {
       this.cargarDuracionCap();
       return;
     }

     this._horasCapService.obtenerDuracionCap( termino )
         .subscribe( duracionCaps => this.duracionCaps = duracionCaps );
   }

  borrarDuracionCap( duracionCaps: DuracionCap ) {
        swal({
          title: '¿Esta seguro?',
          text: 'Esta a punto de borrar un elemento ',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        })
        .then( borrar => {
          if ( borrar ) {
            this._horasCapService.borrarDuracionCap( duracionCaps._id )
                .subscribe(() => this.cargarDuracionCap());
          }
        });
  }

}

