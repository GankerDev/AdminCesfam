import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LicenciaMedica } from '../../models/licenciaMedica.models';
import { LicenciaMedicaService } from 'src/app/services/service.index';

@Component({
  selector: 'app-licencia',
  templateUrl: './licencia.component.html',
  styles: []
})
export class LicenciaComponent implements OnInit {

  licencia: LicenciaMedica = new LicenciaMedica();

  constructor(
    public _licenciaMedicaService: LicenciaMedicaService,
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
  }

  cargarLicencia( id: string) {
    this._licenciaMedicaService.obtenerLicencia(id)
        .subscribe( licenciaMedica => {
          this.licencia = licenciaMedica;
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
