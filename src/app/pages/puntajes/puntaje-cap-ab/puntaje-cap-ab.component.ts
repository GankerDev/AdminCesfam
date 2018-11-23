import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PuntajeCapABService } from '../../../services/puntajes/puntaje-cap-ab.service';
import { PuntajeCapAB } from '../../../models/puntajes/puntajCapAB.models';


@Component({
  selector: 'app-puntaje-cap-ab',
  templateUrl: './puntaje-cap-ab.component.html',
  styles: []
})
export class PuntajeCapABComponent implements OnInit {

  puntajeCapAB: PuntajeCapAB = new PuntajeCapAB();

  constructor(
    public _puntajeCapABService:  PuntajeCapABService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarPuntajeCapAB( id );
      }
    });
  }

  ngOnInit() {
  }

  cargarPuntajeCapAB( id: string) {
    this._puntajeCapABService.obtenerPuntajeCapAB(id)
        .subscribe( puntajeCapAB => {
          this.puntajeCapAB = puntajeCapAB;
        });
  }

  guardarPuntajeCapAB(f: NgForm) {
    if ( f.invalid ) {
      return;
    }

    this._puntajeCapABService.guardarPuntajeCapAB( this.puntajeCapAB )
        .subscribe( (puntajeCapAB: any) => {
          this.puntajeCapAB = puntajeCapAB;
          this.router.navigate(['/puntaje-cap-abs']);
        });
  }

}
