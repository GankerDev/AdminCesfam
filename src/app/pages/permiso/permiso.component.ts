import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoPermiso } from '../../models/tipoPermiso.models';
import { Permiso } from '../../models/permiso.models';
import { PermisoService } from '../../services/permiso/permiso.service';
import { TipoPermisoService } from '../../services/service.index';


@Component({
  selector: 'app-permiso',
  templateUrl: './permiso.component.html',
  styles: []
})
export class PermisoComponent implements OnInit {

  tipoPermisos: TipoPermiso[] = [];
  permiso: Permiso = new Permiso();

  constructor(
    public _permisoService: PermisoService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _tipoPermisoService: TipoPermisoService
    ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarPermiso( id );
      }
    });
  }

  ngOnInit() {
    this._tipoPermisoService.cargarTipoPermiso()
        .subscribe( tipoPermiso => this.tipoPermisos = tipoPermiso );
  }

  cargarPermiso( id: string) {
    this._permisoService.obtenerPermiso(id)
        .subscribe( permiso => {
          this.permiso = permiso;
          this.permiso.tipoPermisos = permiso.tipoPermisos;
        });

  }

  guardarPermiso(f: NgForm) {
    if ( f.invalid ) {
      return;
    }

    this._permisoService.guardarPermiso( this.permiso )
        .subscribe( permiso => {
          this.permiso = permiso;
          this.router.navigate(['/permisos']);
        });
  }

}
