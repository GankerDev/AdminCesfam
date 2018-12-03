import { Component, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Categoria } from '../../models/categoria.models';
import { Funcionario } from '../../models/funcionario.models';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { CapacitacionService } from '../../services/capacitacion/capacitacion.service';
import { TipoContratoService } from '../../services/tipoContrato/tipo-contrato.service';
import { Capacitacion } from '../../models/capacitacion.models';
import { TipoContrato } from '../../models/tipoContrato.models';
import { PuntajeService } from '../../services/funcionario/puntaje.service';

import * as moment from '../../../assets/js/moment';
import { CapNivelTecService } from '../../services/puntajes/cap-nivel-tec.service';
import { CapNivelTec } from '../../models/puntajes/capacitacionNivelTecnico.models';


@Component({
  selector: 'app-puntaje',
  templateUrl: './puntaje.component.html',
  styles: []
})
export class PuntajeComponent implements OnInit {

  categorias: Categoria[] = [];
  capacitaciones: Capacitacion[] = [];
  tipoContratos: TipoContrato[] = [];
  funcionario: Funcionario = new Funcionario();
  capNivelTec: CapNivelTec = new CapNivelTec();
  duracion: number = 0;
  nota: number = 0;
  nivel: any;
  bienio: number = 0;

  constructor(
    public _funcionarioService: FuncionarioService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _categoriaService: CategoriaService,
    public _capacitacionService: CapacitacionService,
    public _tipoContratoservice: TipoContratoService,
    public _puntajeService: PuntajeService,
    public _capacitacionNTService: CapNivelTecService
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];
        this.cargarFuncionario( id );
        this.calcularBienio(id);
      });
   }

  ngOnInit() {
  }

  cargarFuncionario( id: string) {
    this._funcionarioService.obtenerFuncionario(id)
        .subscribe( funcionario => {
          this.funcionario = funcionario;
          this.funcionario.categoria_funcionario = funcionario.categoria_funcionario;
          this.funcionario.capacitacion = funcionario.capacitacion;
          this.funcionario.tipo_contrato = funcionario.tipo_contrato;
        });
  }

  calcularBienio( id: string ) {
    let inicio: any;
    let hoy = moment().format('');
    let diferencia: any;


    this._funcionarioService.obtenerFuncionario(id)
        .subscribe(resp => {
          inicio = moment(resp.fecha_inicio_laboral, 'YYYYMMDD');
          diferencia = (inicio.diff(hoy, 'years')) * -1;
          this.bienio = diferencia / 2;
          this.bienio = Math.floor(this.bienio);
          console.log(this.bienio);
        });

  }

  calcularPuntajeCapacitacion(funcionario: Funcionario) {
    let totalPuntajeCap: number = 0;

    this._funcionarioService.obtenerFuncionario(funcionario._id)
      .subscribe(( resp: any) => {
        this.funcionario = resp;
        for (const cap  of resp.capacitacion) {
          this.nota = cap.nota;
          this.duracion = cap.duracion;

          this._capacitacionNTService.obtenerCapNivelTec(cap.cap_nivel_tecnico)
              .subscribe((capNivelTec: any) => {
                this.capNivelTec = capNivelTec;
                this.capNivelTec.factor = capNivelTec.factor;
                totalPuntajeCap += (this.duracion * this.nota) * this.capNivelTec.factor;
                this.funcionario.puntaje_cap_acumulado = totalPuntajeCap;
                this.totalPuntaje(totalPuntajeCap, this.funcionario);
              });

        }
      });

  }
  totalPuntaje(totalPuntajeCap: number, funcionario: Funcionario) {
    this._funcionarioService.actualizarPuntaje(funcionario, totalPuntajeCap)
        .subscribe(resp => {
          swal('Puntaje actualizado', 'correctamente', 'success');
        });
  }

}
