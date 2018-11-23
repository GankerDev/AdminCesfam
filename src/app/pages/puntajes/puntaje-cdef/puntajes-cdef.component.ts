import { Component, OnInit } from '@angular/core';
import { PuntajeCDEF } from '../../../models/puntajes/puntajeCDEF.models';
import { PuntajeCDEFService } from '../../../services/puntajes/puntaje-cdef.service';

declare var swal: any;

@Component({
  selector: 'app-puntajes',
  templateUrl: './puntajes-cdef.component.html',
  styles: []
})
export class PuntajesCDEFComponent implements OnInit {

  puntajeCDEFs: PuntajeCDEF[] = [];
  cargando: boolean = true;

  constructor(
    public _puntajeCDEFService:  PuntajeCDEFService
  ) { }

  ngOnInit() {
    this.cargarPuntajeCDEF();
  }

  cargarPuntajeCDEF() {
    this.cargando = true;
    this._puntajeCDEFService.cargarPuntajeCDEF()
        .subscribe( puntajeCDEFs => {
          this.cargando = false;
          this.puntajeCDEFs = puntajeCDEFs;
        });

  }

  buscarPuntajeCDEF( termino: string ) {
     if ( termino.length <= 0 ) {
       this.cargarPuntajeCDEF();
       return;
     }

     this._puntajeCDEFService.obtenerPuntajeCDEF( termino )
         .subscribe( puntajeCDEFs => this.puntajeCDEFs = puntajeCDEFs );
   }

  borrarPuntajeCDEF( puntajeCDEFs: PuntajeCDEF ) {
        swal({
          title: '¿Esta seguro?',
          text: 'Esta a punto de borrar un puntaje ',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        })
        .then( borrar => {
          if ( borrar ) {
            this._puntajeCDEFService.borrarPuntajeCDEF( puntajeCDEFs._id )
                .subscribe(() => this.cargarPuntajeCDEF());
          }
        });
  }

}

