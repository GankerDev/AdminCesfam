import { Component, OnInit } from '@angular/core';
import { PuntajeCapAB } from '../../../models/puntajes/puntajCapAB.models';
import { PuntajeCapABService } from '../../../services/puntajes/puntaje-cap-ab.service';

declare var swal: any;

@Component({
  selector: 'app-puntajes',
  templateUrl: './puntajes-cap-ab.component.html',
  styles: []
})
export class PuntajesCapABComponent implements OnInit {

  puntajeCapABs: PuntajeCapAB[] = [];
  cargando: boolean = true;

  constructor(
    public _puntajeCapABService:  PuntajeCapABService
  ) { }

  ngOnInit() {
    this.cargarPuntajeCapAB();
  }

  cargarPuntajeCapAB() {
    this.cargando = true;
    this._puntajeCapABService.cargarPuntajeCapAB()
        .subscribe( puntajeCapABs => {
          this.cargando = false;
          this.puntajeCapABs = puntajeCapABs;
        });

  }

  buscarPuntajeCapAB( termino: string ) {
     if ( termino.length <= 0 ) {
       this.cargarPuntajeCapAB();
       return;
     }

     this._puntajeCapABService.obtenerPuntajeCapAB( termino )
         .subscribe( puntajeCapABs => this.puntajeCapABs = puntajeCapABs );
   }

  borrarPuntajeCapAB( puntajeCapABs: PuntajeCapAB ) {
        swal({
          title: '¿Esta seguro?',
          text: 'Esta a punto de borrar un puntaje ',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        })
        .then( borrar => {
          if ( borrar ) {
            this._puntajeCapABService.borrarPuntajeCapAB( puntajeCapABs._id )
                .subscribe(() => this.cargarPuntajeCapAB());
          }
        });
  }

}

