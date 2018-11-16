import { Component, OnInit } from '@angular/core';
import { Permiso } from 'src/app/models/permiso.models';
import { TipoPermiso } from '../../models/tipoPermiso.models';
import { PermisoService } from '../../services/permiso/permiso.service';


declare var swal: any;

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styles: []
})
export class PermisosComponent implements OnInit {

  permisos: Permiso[] = [];
  cargando: boolean = true;
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(
    public _permisoService:  PermisoService
  ) { }

  ngOnInit() {
    this.cargarPermisos();
  }

  cargarPermisos() {
    this.cargando = true;
    this._permisoService.cargarPermisos(this.desde)
        .subscribe( permisos => {
          this.totalRegistros = this._permisoService.totalPermisos;
          this.cargando = false;
          this.permisos = permisos;
        });

  }

  buscarPermiso( termino: string ) {
     if ( termino.length <= 0 ) {
       this.cargarPermisos();
       return;
     }

     this._permisoService.buscarPermiso( termino )
         .subscribe( permiso => this.permisos = permiso );
   }

  borrarPermiso( permiso: Permiso ) {
        swal({
          title: '¿Esta seguro?',
          text: 'Esta a punto de borrar un permiso ',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        })
        .then( borrar => {
          if ( borrar ) {
            this._permisoService.borrarPermiso( permiso._id )
                .subscribe(() => this.cargarPermisos());
          }
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
    this.cargarPermisos();
  }

}

