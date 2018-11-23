import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PuntajeCDEF } from '../../../models/puntajes/puntajeCDEF.models';
import { PuntajeCDEFService } from '../../../services/puntajes/puntaje-cdef.service';


@Component({
  selector: 'app-puntaje-cdef',
  templateUrl: './puntaje-cdef.component.html',
  styles: []
})
export class PuntajeCDEFComponent implements OnInit {

  puntajeCDEF: PuntajeCDEF = new PuntajeCDEF();

  constructor(
    public _puntajeCDEFService:  PuntajeCDEFService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarPuntajeCDEF( id );
      }
    });
  }

  ngOnInit() {
  }

  cargarPuntajeCDEF( id: string) {
    this._puntajeCDEFService.obtenerPuntajeCDEF(id)
        .subscribe( puntajeCDEF => {
          this.puntajeCDEF = puntajeCDEF;
        });
  }

  guardarPuntajeCDEF(f: NgForm) {
    if ( f.invalid ) {
      return;
    }

    this._puntajeCDEFService.guardarPuntajeCDEF( this.puntajeCDEF )
        .subscribe( (puntajeCDEF: any) => {
          this.puntajeCDEF = puntajeCDEF;
          this.router.navigate(['/puntajeCDEFs']);
        });
  }

}

