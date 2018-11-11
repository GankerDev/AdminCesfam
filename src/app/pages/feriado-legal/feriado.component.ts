import { Component, OnInit } from '@angular/core';
import { FeriadoLegalService } from '../../services/feriadoLegal/feriado-legal.service';
import { NgForm } from '@angular/forms';
import { FeriadoLegal } from '../../models/feriadoLegal.models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feriado',
  templateUrl: './feriado.component.html',
  styles: []
})
export class FeriadoComponent implements OnInit {

  feriado: FeriadoLegal = new FeriadoLegal();

  constructor(
    public _feriadoLegalService: FeriadoLegalService,
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
  }

  cargarFeriado( id: string) {
    this._feriadoLegalService.obtenerFeriado(id)
        .subscribe( feriado => {

          this.feriado = feriado;
          this.feriado.fecha_inicio_vacaciones = feriado.fecha_inicio_vacaciones;
          this.feriado.fecha_termino_vacaciones = feriado.fecha_termino_vacaciones;

        });

  }

  guardarFeriado(f: NgForm) {

    if ( f.invalid ) {
      return;
    }

    this._feriadoLegalService.guardarFeriado(this.feriado)
        .subscribe( feriado => {
          this.feriado._id = feriado._id;
          this.router.navigate(['/feriado-legal']);
        });
  }

}
