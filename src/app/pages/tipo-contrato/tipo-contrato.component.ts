import { Component, OnInit } from '@angular/core';
import { TipoContrato } from '../../models/tipoContrato.models';
import { TipoContratoService } from '../../services/tipoContrato/tipo-contrato.service';

declare var swal: any;

@Component({
  selector: 'app-tipo-contrato',
  templateUrl: './tipo-contrato.component.html',
  styles: []
})
export class TipoContratoComponent implements OnInit {

  tipoContratos: TipoContrato[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;


  constructor(
    public _tipoContratoService: TipoContratoService
  ) { }

  ngOnInit() {
    this.cargarTipoContrato();
  }

  cargarTipoContrato() {
    this.cargando = true;

    this._tipoContratoService.cargarTipoContrato(this.desde, false)
        .subscribe( (tipoContrato: any) => {
          this.totalRegistros = this._tipoContratoService.totalTipoContrato;
          this.tipoContratos = tipoContrato;
          this.cargando = false;
        });

  }

  buscarTipoContrato( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarTipoContrato();
      return;
    }

    this.cargando = true;

    this._tipoContratoService.buscarTipoContrato( termino )
        .subscribe( tipoContrato => {
          this.cargando = false;
          this.tipoContratos = tipoContrato;
        });
  }

  guardarTipoContrato( tipoContrato: TipoContrato ) {
    this._tipoContratoService.actualizarTipoContrato( tipoContrato )
        .subscribe();
  }

  borrarTipoContrato( tipoContrato: TipoContrato ) {
        swal({
          title: '¿Esta seguro?',
          text: 'Esta a punto de borrar el tipo de contrato ' + tipoContrato.nombre_tipo_contrato,
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        })
        .then( borrar => {
          if ( borrar ) {
            this._tipoContratoService.borrarTipoContrato( tipoContrato._id )
                .subscribe(() => this.cargarTipoContrato());
          }
        });
  }

  crearTipoContrato() {
    swal({
      title: 'Crear tipo de contrato',
      text: 'Ingrese el nombre del tipo de contrato',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true,
    }).then( (valor: string) => {
      if (!valor || valor.length === 0) {
        return;
      }

      this._tipoContratoService.crearTipoContrato( valor)
          .subscribe(() => this.cargarTipoContrato());
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
    this.cargarTipoContrato();
  }
}
