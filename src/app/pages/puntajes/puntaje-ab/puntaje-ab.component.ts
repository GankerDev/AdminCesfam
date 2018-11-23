import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PuntajeABService } from '../../../services/puntajes/puntaje-ab.service';
import { PuntajeAB } from '../../../models/puntajes/puntajeAB.models';


@Component({
  selector: 'app-puntaje-ab',
  templateUrl: './puntaje-ab.component.html',
  styles: []
})
export class PuntajeABComponent implements OnInit {

  puntajeAB: PuntajeAB = new PuntajeAB();

  constructor(
    public _puntajeABService:  PuntajeABService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarPuntajeAB( id );
      }
    });
  }

  ngOnInit() {
  }

  cargarPuntajeAB( id: string) {
    this._puntajeABService.obtenerPuntajeAB(id)
        .subscribe( puntajeAB => {
          this.puntajeAB = puntajeAB;
        });

  }

  guardarPuntajeAB(f: NgForm) {
    if ( f.invalid ) {
      return;
    }

    this._puntajeABService.guardarPuntajeAB( this.puntajeAB )
        .subscribe( (puntajeAB: any) => {
          this.puntajeAB = puntajeAB;
          this.router.navigate(['/puntajeAbs']);
        });
  }

}
