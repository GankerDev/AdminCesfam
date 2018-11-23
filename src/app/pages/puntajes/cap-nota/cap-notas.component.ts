import { Component, OnInit } from '@angular/core';
import { CapNotaService } from '../../../services/puntajes/cap-nota.service';
import { CapNota } from '../../../models/puntajes/capacitacionNota.models';

declare var swal: any;

@Component({
  selector: 'app-cap-notas',
  templateUrl: './cap-notas.component.html',
  styles: []
})
export class CapNotasComponent implements OnInit {

  capNotas: CapNota[] = [];
  cargando: boolean = true;

  constructor(
    public _capNotaService:  CapNotaService
  ) { }

  ngOnInit() {
    this.cargarCapNota();
  }

  cargarCapNota() {
    this.cargando = true;
    this._capNotaService.cargarCapNota()
        .subscribe( CapacitacionesNT => {
          this.cargando = false;
          this.capNotas = CapacitacionesNT;
        });

  }

  buscarCapNota( termino: string ) {
     if ( termino.length <= 0 ) {
       this.cargarCapNota();
       return;
     }

     this._capNotaService.obtenerCapNota( termino )
         .subscribe( capNota => this.capNotas = capNota );
   }

  borrarCapNota( capNotas: CapNota ) {
        swal({
          title: '¿Esta seguro?',
          text: 'Esta a punto de borrar un puntaje ',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        })
        .then( borrar => {
          if ( borrar ) {
            this._capNotaService.borrarCapNota( capNotas._id )
                .subscribe(() => this.cargarCapNota());
          }
        });
  }

}

