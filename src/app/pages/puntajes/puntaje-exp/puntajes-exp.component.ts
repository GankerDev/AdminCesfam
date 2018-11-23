import { Component, OnInit } from '@angular/core';
import { PuntajeExp } from '../../../models/puntajes/puntajeExp.models';
import { PuntajeExpService } from '../../../services/puntajes/puntaje-exp.service';

declare var swal: any;

@Component({
  selector: 'app-puntajes',
  templateUrl: './puntajes-exp.component.html',
  styles: []
})
export class PuntajesExpComponent implements OnInit {

  puntajeExps: PuntajeExp[] = [];
  cargando: boolean = true;

  constructor(
    public _puntajeExpService:  PuntajeExpService
  ) { }

  ngOnInit() {
    this.cargarPuntajeExp();
  }

  cargarPuntajeExp() {
    this.cargando = true;
    this._puntajeExpService.cargarPuntajeExp()
        .subscribe( puntajeExps => {
          this.cargando = false;
          this.puntajeExps = puntajeExps;
        });

  }

  buscarPuntajeExp( termino: string ) {
     if ( termino.length <= 0 ) {
       this.cargarPuntajeExp();
       return;
     }

     this._puntajeExpService.obtenerPuntajeExp( termino )
         .subscribe( puntajeExps => this.puntajeExps = puntajeExps );
   }

  borrarPuntajeExp( puntajeExps: PuntajeExp ) {
        swal({
          title: '¿Esta seguro?',
          text: 'Esta a punto de borrar un puntaje ',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        })
        .then( borrar => {
          if ( borrar ) {
            this._puntajeExpService.borrarPuntajeExp( puntajeExps._id )
                .subscribe(() => this.cargarPuntajeExp());
          }
        });
  }

}

