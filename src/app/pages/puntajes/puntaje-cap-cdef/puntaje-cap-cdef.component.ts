import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PuntajeCapCDEF } from '../../../models/puntajes/puntajeCapCDEF.models';
import { PuntajeCapCDEFService } from '../../../services/puntajes/puntaje-cap-cdef.service';



@Component({
  selector: 'app-puntaje-cap-cdef',
  templateUrl: './puntaje-cap-cdef.component.html',
  styles: []
})
export class PuntajeCapCDEFComponent implements OnInit {

  puntajeCapCDEF: PuntajeCapCDEF = new PuntajeCapCDEF();

  constructor(
    public _puntajeCapCDEFService:  PuntajeCapCDEFService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarPuntajeCapCDEF( id );
      }
    });
  }

  ngOnInit() {
  }

  cargarPuntajeCapCDEF( id: string) {
    this._puntajeCapCDEFService.obtenerPuntajeCapCDEF(id)
        .subscribe( puntajeCapCDEF => {
          this.puntajeCapCDEF = puntajeCapCDEF;
        });
  }

  guardarPuntajeCapCDEF(f: NgForm) {
    if ( f.invalid ) {
      return;
    }

    this._puntajeCapCDEFService.guardarPuntajeCapCDEF( this.puntajeCapCDEF )
        .subscribe( (puntajeCapCDEF: any) => {
          this.puntajeCapCDEF = puntajeCapCDEF;
          this.router.navigate(['/puntaje-cap-cdefs']);
        });
  }

}
