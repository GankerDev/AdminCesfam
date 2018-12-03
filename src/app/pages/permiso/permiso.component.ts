import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoPermiso } from '../../models/tipoPermiso.models';
import { Permiso } from '../../models/permiso.models';
import { PermisoService } from '../../services/permiso/permiso.service';
import { TipoPermisoService } from '../../services/service.index';
import { Funcionario } from '../../models/funcionario.models';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';

@Component({
  selector: 'app-permiso',
  templateUrl: './permiso.component.html',
  styles: []
})
export class PermisoComponent implements OnInit {

  tipoPermisos: TipoPermiso[] = [];
  permiso: Permiso = new Permiso();
  funcionarios: Funcionario[] = [];

  constructor(
    public _permisoService: PermisoService,
    public _funcionarioService: FuncionarioService,
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
    this._tipoPermisoService.cargarTipoPermiso(null, true)
        .subscribe( tipoPermiso => this.tipoPermisos = tipoPermiso );
    this._funcionarioService.cargarFuncionarios(null, true)
        .subscribe( funcionarios => this.funcionarios = funcionarios );
  }

  cargarPermiso( id: string) {
    this._permisoService.obtenerPermiso(id)
        .subscribe( permiso => {
          this.permiso = permiso;
          this.permiso.tipoPermisos = permiso.tipoPermisos;
          this.permiso.funcionario = permiso.funcionario._id;
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
