import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LicenciaMedica } from '../../models/licenciaMedica.models';
import { LicenciaMedicaService } from 'src/app/services/service.index';
import { Funcionario } from '../../models/funcionario.models';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';


@Component({
  selector: 'app-licencia',
  templateUrl: './licencia.component.html',
  styles: []
})
export class LicenciaComponent implements OnInit {

  licencia: LicenciaMedica = new LicenciaMedica();
  funcionarios: Funcionario[] = [];

  constructor(
    public _licenciaMedicaService: LicenciaMedicaService,
    public _funcionarioService: FuncionarioService,
    public router: Router,
    public activatedRoute: ActivatedRoute
    ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarLicencia( id );
      }
    });
  }

  ngOnInit() {
    this._funcionarioService.cargarFuncionarios(null, true)
        .subscribe( funcionarios => this.funcionarios = funcionarios );
  }

  cargarLicencia( id: string) {
    this._licenciaMedicaService.obtenerLicencia(id)
        .subscribe( licenciaMedica => {
          this.licencia = licenciaMedica;
          this.licencia.funcionario = licenciaMedica.funcionario._id;
        });

  }

  guardarLicencia(f: NgForm) {

    if ( f.invalid ) {
      return;
    }

    this._licenciaMedicaService.guardarLicencia(this.licencia)
        .subscribe( licenciaMedica => {
          this.licencia._id = licenciaMedica._id;
          this.router.navigate(['/licencia-medica']);
        });
  }

}
