import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../services/service.index';
import { Funcionario } from '../../models/funcionario.models';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Capacitacion } from 'src/app/models/capacitacion.models';


declare var swal: any;

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styles: []
})
export class FuncionariosComponent implements OnInit {

  funcionarios: Funcionario[] = [];
  capacitaciones: Capacitacion[] = [];
  cargando: boolean = true;
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(
    public _funcionarioService:  FuncionarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarFuncionarios();
    this._modalUploadService.notificacion
        .subscribe( resp =>  this.cargarFuncionarios());
  }

  cargarFuncionarios() {
    this.cargando = true;
    this._funcionarioService.cargarFuncionarios(this.desde, false)
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
          text: 'Esta a punto de borrar a ' + funcionario.nombre,
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

  mostrarModal( id: string ) {
    this._modalUploadService.mostrarModal( 'funcionario', id );

  }

}

