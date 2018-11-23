import { Component, OnInit } from '@angular/core';
import { CapNivelTec } from '../../../models/puntajes/capacitacionNivelTecnico.models';
import { CapNivelTecService } from '../../../services/service.index';

declare var swal: any;

@Component({
  selector: 'app-cap-nivel-tecs',
  templateUrl: './cap-nivel-tecs.component.html',
  styles: []
})
export class CapNivelTecsComponent implements OnInit {

  capNivelTec: CapNivelTec[] = [];
  cargando: boolean = true;

  constructor(
    public _capNivelTecService:  CapNivelTecService
  ) { }

  ngOnInit() {
    this.cargarCapNivelTec();
  }

  cargarCapNivelTec() {
    this.cargando = true;
    this._capNivelTecService.cargarCapNivelTec()
        .subscribe( CapacitacionesNT => {
          this.cargando = false;
          this.capNivelTec = CapacitacionesNT;
        });

  }

  buscarCapNivelTec( termino: string ) {
     if ( termino.length <= 0 ) {
       this.cargarCapNivelTec();
       return;
     }

     this._capNivelTecService.obtenerCapNivelTec( termino )
         .subscribe( capNivelTec => this.capNivelTec = capNivelTec );
   }

  borrarCapNivelTec( capNivelTec: CapNivelTec ) {
        swal({
          title: '¿Esta seguro?',
          text: 'Esta a punto de borrar un puntaje ',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        })
        .then( borrar => {
          if ( borrar ) {
            this._capNivelTecService.borrarCapNivelTec( capNivelTec._id )
                .subscribe(() => this.cargarCapNivelTec());
          }
        });
  }

}

