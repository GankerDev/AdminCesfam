import { Component, OnInit } from '@angular/core';
import { FeriadoLegal } from '../../models/feriadoLegal.models';
import { FeriadoLegalService } from '../../services/feriadoLegal/feriado-legal.service';
import { Funcionario } from '../../models/funcionario.models';


declare var swal: any;

@Component({
  selector: 'app-capacitacion-legal',
  templateUrl: './feriado-legal.component.html',
  styles: []
})
export class FeriadoLegalComponent implements OnInit {

  feriados: FeriadoLegal[] = [];
  cargando: boolean = true;
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(
    public _feriadoLegalService: FeriadoLegalService
  ) { }

  ngOnInit() {
    this.cargarFeriados();
  }

  cargarFeriados() {
    this.cargando = true;
    this._feriadoLegalService.cargarFeriados(this.desde)
        .subscribe( feriados => {
          this.totalRegistros = this._feriadoLegalService.totalferiados;
          this.cargando = false;
          this.feriados = feriados;
        });

  }

  guardarFeriado( feriado: FeriadoLegal ) {
    this._feriadoLegalService.guardarFeriado( feriado )
        .subscribe();
  }

  borrarFeriado( feriado: FeriadoLegal ) {
        swal({
          title: '¿Esta seguro?',
          text: 'Esta a punto de borrar el feriado legal ',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        })
        .then( borrar => {
          if ( borrar ) {
            this._feriadoLegalService.borrarFeriado( feriado._id )
                .subscribe(() => this.cargarFeriados());
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
    this.cargarFeriados();
  }

}
