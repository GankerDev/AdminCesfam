import { Component, OnInit } from '@angular/core';
import { FeriadoLegalService } from '../../services/feriadoLegal/feriado-legal.service';
import { NgForm } from '@angular/forms';
import { FeriadoLegal } from '../../models/feriadoLegal.models';
import { Router, ActivatedRoute } from '@angular/router';
import { Funcionario } from '../../models/funcionario.models';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';

import * as moment from '../../../assets/js/moment';

@Component({
  selector: 'app-feriado',
  templateUrl: './feriado.component.html',
  styles: []
})
export class FeriadoComponent implements OnInit {

  feriado: FeriadoLegal = new FeriadoLegal();
  funcionarios: Funcionario[] = [];
  constructor(
    public _feriadoLegalService: FeriadoLegalService,
    public _funcionarioService: FuncionarioService,
    public router: Router,
    public activatedRoute: ActivatedRoute
    ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarFeriado( id );
      }
    });
  }

  ngOnInit() {
    this._funcionarioService.cargarFuncionarios(null, true)
        .subscribe( funcionarios => this.funcionarios = funcionarios );
  }

  cargarFeriado( id: string) {
    this._feriadoLegalService.obtenerFeriado(id)
        .subscribe( feriado => {
          this.feriado = feriado;
          this.feriado.fecha_inicio_vacaciones = feriado.fecha_inicio_vacaciones;
          this.feriado.fecha_termino_vacaciones = feriado.fecha_termino_vacaciones;
          this.feriado.funcionario = feriado.funcionario;
        });

  }

  guardarFeriado(f: NgForm) {
    let diferencia: number;
    if ( f.invalid ) {
      return;
    }
    let inicio = moment(f.value.fecha_inicio_vacaciones, 'YYYYMMDD');
    let fin = moment(f.value.fecha_termino_vacaciones, 'YYYYMMDD');
    diferencia = (inicio.diff(fin, 'days')) * -1;

    this.feriado.dias_vacaciones_restantes = this.feriado.dias_vacaciones_fijos - diferencia;
    this.feriado.dias_vacaciones_acumulados = this.feriado.dias_vacaciones_restantes;
    this._feriadoLegalService.guardarFeriado(this.feriado)
        .subscribe( feriado => {
          this.feriado._id = feriado._id;
          this.router.navigate(['/feriado-legal']);
        });
  }

}
