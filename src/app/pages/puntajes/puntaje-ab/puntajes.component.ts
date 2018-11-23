import { Component, OnInit } from '@angular/core';
import { PuntajeAB } from '../../../models/puntajes/puntajeAB.models';
import { PuntajeABService } from '../../../services/puntajes/puntaje-ab.service';

declare var swal: any;

@Component({
  selector: 'app-puntajes',
  templateUrl: './puntajes.component.html',
  styles: []
})
export class PuntajesComponent implements OnInit {

  puntajeABs: PuntajeAB[] = [];
  cargando: boolean = true;

  constructor(
    public _puntajeABService:  PuntajeABService
  ) { }

  ngOnInit() {
    this.cargarPuntajeAB();
  }

  cargarPuntajeAB() {
    this.cargando = true;
    this._puntajeABService.cargarPuntajeAB()
        .subscribe( puntajeABs => {
          this.cargando = false;
          this.puntajeABs = puntajeABs;
        });

  }

  buscarPuntajeAB( termino: string ) {
     if ( termino.length <= 0 ) {
       this.cargarPuntajeAB();
       return;
     }

     this._puntajeABService.obtenerPuntajeAB( termino )
         .subscribe( puntajeABs => this.puntajeABs = puntajeABs );
   }

  borrarPuntajeAB( puntajeABs: PuntajeAB ) {
        swal({
          title: '¿Esta seguro?',
          text: 'Esta a punto de borrar un puntaje ',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        })
        .then( borrar => {
          if ( borrar ) {
            this._puntajeABService.borrarPuntajeAB( puntajeABs._id )
                .subscribe(() => this.cargarPuntajeAB());
          }
        });
  }

}

