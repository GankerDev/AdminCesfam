import { Component, OnInit } from '@angular/core';
import { PuntajeCapCDEF } from '../../../models/puntajes/puntajeCapCDEF.models';
import { PuntajeCapCDEFService } from '../../../services/puntajes/puntaje-cap-cdef.service';

declare var swal: any;

@Component({
  selector: 'app-puntajes',
  templateUrl: './puntajes-cap-cdef.component.html',
  styles: []
})
export class PuntajesCapCDEFComponent implements OnInit {

  puntajeCapCDEFs: PuntajeCapCDEF[] = [];
  cargando: boolean = true;

  constructor(
    public _puntajeCapCDEFService:  PuntajeCapCDEFService
  ) { }

  ngOnInit() {
    this.cargarPuntajeCapCDEF();
  }

  cargarPuntajeCapCDEF() {
    this.cargando = true;
    this._puntajeCapCDEFService.cargarPuntajeCapCDEF()
        .subscribe( puntajeCapCDEFs => {
          this.cargando = false;
          this.puntajeCapCDEFs = puntajeCapCDEFs;
        });

  }

  buscarPuntajeCapCDEF( termino: string ) {
     if ( termino.length <= 0 ) {
       this.cargarPuntajeCapCDEF();
       return;
     }

     this._puntajeCapCDEFService.obtenerPuntajeCapCDEF( termino )
         .subscribe( puntajeCapCDEFs => this.puntajeCapCDEFs = puntajeCapCDEFs );
   }

  borrarPuntajeCapCDEF( puntajeCapCDEFs: PuntajeCapCDEF ) {
        swal({
          title: '¿Esta seguro?',
          text: 'Esta a punto de borrar un puntaje ',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        })
        .then( borrar => {
          if ( borrar ) {
            this._puntajeCapCDEFService.borrarPuntajeCapCDEF( puntajeCapCDEFs._id )
                .subscribe(() => this.cargarPuntajeCapCDEF());
          }
        });
  }

}

