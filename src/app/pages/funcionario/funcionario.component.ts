import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Categoria } from '../../models/categoria.models';
import { Funcionario } from '../../models/funcionario.models';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { CapacitacionService } from '../../services/capacitacion/capacitacion.service';
import { TipoContratoService } from '../../services/tipoContrato/tipo-contrato.service';
import { Capacitacion } from '../../models/capacitacion.models';
import { TipoContrato } from '../../models/tipoContrato.models';


@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styles: []
})
export class FuncionarioComponent implements OnInit {

  categoria: Categoria[] = [];
  capacitacion: Capacitacion[] = [];
  tipoContrato: TipoContrato[] = [];
  funcionario: Funcionario = new Funcionario();

  constructor(
    public _funcionarioService: FuncionarioService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _categoriaService: CategoriaService,
    public _capacitacionService: CapacitacionService,
    public _tipoContratoservice: TipoContratoService
    ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarFuncionario( id );
      }
    });
  }

  ngOnInit() {
    this._categoriaService.cargarCategorias()
        .subscribe( categoria => this.categoria = categoria );
    this._capacitacionService.cargarCapacitaciones()
        .subscribe( capacitacion => this.capacitacion = capacitacion );
    this._tipoContratoservice.cargarTipoContrato()
        .subscribe( tipoContrato => this.tipoContrato = tipoContrato );
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

  guardarFuncionario(f: NgForm) {
    if ( f.invalid ) {
      return;
    }

    this._funcionarioService.guardarFuncionario( this.funcionario )
        .subscribe( funcionario => {
          this.funcionario = funcionario;
          this.router.navigate(['/funcionarios']);
        });
  }

}
