import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PuntajeExp } from '../../../models/puntajes/puntajeExp.models';
import { PuntajeExpService } from '../../../services/puntajes/puntaje-exp.service';


@Component({
  selector: 'app-puntaje-exp',
  templateUrl: './puntaje-exp.component.html',
  styles: []
})
export class PuntajeExpComponent implements OnInit {

  puntajeExp: PuntajeExp = new PuntajeExp();

  constructor(
    public _puntajeExpService:  PuntajeExpService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarPuntajeExp( id );
      }
    });
  }

  ngOnInit() {
  }

  cargarPuntajeExp( id: string) {
    this._puntajeExpService.obtenerPuntajeExp(id)
        .subscribe( puntajeExp => {
          this.puntajeExp = puntajeExp;
        });
  }

  guardarPuntajeExp(f: NgForm) {
    if ( f.invalid ) {
      return;
    }

    this._puntajeExpService.guardarPuntajeExp( this.puntajeExp )
        .subscribe( (puntajeExp: any) => {
          this.puntajeExp = puntajeExp;
          this.router.navigate(['/puntaje-exps']);
        });
  }

}
