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

  categorias: Categoria[] = [];
  capacitaciones: Capacitacion[] = [];
  tipoContratos: TipoContrato[] = [];
  funcionario: Funcionario = new Funcionario();
  capacitacion: Capacitacion = new Capacitacion();

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
    this._categoriaService.cargarCategorias(null, true)
        .subscribe( categoria => this.categorias = categoria );
    this._capacitacionService.cargarCapacitacion(null, true)
        .subscribe( capacitacion => this.capacitaciones = capacitacion );
    this._tipoContratoservice.cargarTipoContrato(null, true)
        .subscribe( tipoContrato => this.tipoContratos = tipoContrato );
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
    let nota = f.value.nota;
    if ( f.invalid ) {
      return;
    }

    for (const cap of this.funcionario.capacitacion) {

    }

    this._funcionarioService.guardarFuncionario( this.funcionario )
        .subscribe( funcionario => {
          this.funcionario = funcionario;
          this._capacitacionService.obtenerCapacitacion(f.value.capacitacion)
              .subscribe(capacitacion => {
                this._capacitacionService.actualizarCapacitacion(capacitacion, nota)
              .subscribe();
              });
           this.router.navigate(['/funcionarios']);
        });

  }

}
