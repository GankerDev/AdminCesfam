import { Component, OnInit } from '@angular/core';
import { TipoPermiso } from '../../models/tipoPermiso.models';
import { TipoPermisoService } from '../../services/tipoPermiso/tipo-permiso.service';


declare var swal: any;

@Component({
  selector: 'app-tipo-permiso',
  templateUrl: './tipo-permiso.component.html',
  styles: []
})
export class TipoPermisoComponent implements OnInit {

  tipoPermisos: TipoPermiso[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;


  constructor(
    public _tipoPermisoService: TipoPermisoService
  ) { }

  ngOnInit() {
    this.cargarTipoPermiso();
  }

  cargarTipoPermiso() {
    this.cargando = true;

    this._tipoPermisoService.cargarTipoPermiso(this.desde)
        .subscribe( (tipoPermisos: any) => {
          this.totalRegistros = this._tipoPermisoService.totalTipoPermisos;
          this.tipoPermisos = tipoPermisos;
          this.cargando = false;
        });

  }

//  buscarTipoPermiso( termino: string ) {
//    if ( termino.length <= 0 ) {
//      this.cargarTipoPermiso();
//      return;
//    }
//
//    this.cargando = true;
//
//    this._tipoPermisoService.buscarTipoPermiso( termino )
//        .subscribe( tipoPermiso => {
//  this.cargando = false;
//  this.tipoPermisos = tipoPermiso;
//  });
// }

  guardarTipoPermiso( tipoPermiso: TipoPermiso ) {
    this._tipoPermisoService.actualizarTipoPermiso( tipoPermiso )
        .subscribe();
  }

  borrarTipoPermiso( tipoPermiso: TipoPermiso ) {
        swal({
          title: '¿Esta seguro?',
          text: 'Esta a punto de borrar el tipo de permiso ' + tipoPermiso.nombre,
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        })
        .then( borrar => {
          if ( borrar ) {
            this._tipoPermisoService.borrarTipoPermiso( tipoPermiso._id )
                .subscribe(() => this.cargarTipoPermiso());
          }
        });
  }

  crearTipoPermiso() {
    swal({
      title: 'Crear tipo de permiso',
      text: 'Ingrese el nombre del tipo de permiso',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true,
    }).then( (valor: string) => {
      if (!valor || valor.length === 0) {
        return;
      }

      this._tipoPermisoService.crearTipoPermiso( valor)
          .subscribe(() => this.cargarTipoPermiso());
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
    this.cargarTipoPermiso();
  }
}
