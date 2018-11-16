import { Component, OnInit } from '@angular/core';
import { Permiso } from 'src/app/models/permiso.models';
import { FuncionarioService } from '../../services/service.index';
import { Funcionario } from '../../models/funcionario.models';

declare var swal: any;

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styles: []
})
export class FuncionariosComponent implements OnInit {

  funcionarios: Permiso[] = [];
  cargando: boolean = true;
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(
    public _funcionarioService:  FuncionarioService
  ) { }

  ngOnInit() {
    this.cargarFuncionarios();
  }

  cargarFuncionarios() {
    this.cargando = true;
    this._funcionarioService.cargarFuncionarios(this.desde)
        .subscribe( funcionarios => {
          this.totalRegistros = this._funcionarioService.totalFuncionarios;
          this.cargando = false;
          this.funcionarios = funcionarios;
        });

  }

  buscarFuncionario( termino: string ) {
     if ( termino.length <= 0 ) {
       this.cargarFuncionarios();
       return;
     }

     this._funcionarioService.buscarFuncionario( termino )
         .subscribe( funcionario => this.funcionarios = funcionario );
   }

  borrarFuncionario( funcionario: Funcionario ) {
        swal({
          title: '¿Esta seguro?',
          text: 'Esta a punto de borrar un funcionario ',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        })
        .then( borrar => {
          if ( borrar ) {
            this._funcionarioService.borrarFuncionario( funcionario._id )
                .subscribe(() => this.cargarFuncionarios());
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
    this.cargarFuncionarios();
  }

}

