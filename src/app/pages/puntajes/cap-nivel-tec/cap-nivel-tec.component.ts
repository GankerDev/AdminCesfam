import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CapNivelTecService } from '../../../services/puntajes/cap-nivel-tec.service';
import { CapNivelTec } from '../../../models/puntajes/capacitacionNivelTecnico.models';


@Component({
  selector: 'app-cap-nivel-tec',
  templateUrl: './cap-nivel-tec.component.html',
  styles: []
})
export class CapNivelTecComponent implements OnInit {

  capNivelTec: CapNivelTec = new CapNivelTec();

  constructor(
    public _capNivelTecService:  CapNivelTecService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarCapNivelTec( id );
      }
    });
  }

  ngOnInit() {
  }

  cargarCapNivelTec( id: string) {
    this._capNivelTecService.obtenerCapNivelTec(id)
        .subscribe( (capNivelTec: any) => {
          this.capNivelTec = capNivelTec;
        });

  }

  guardarCapNivelTec(f: NgForm) {
    if ( f.invalid ) {
      return;
    }

    this._capNivelTecService.guardarCapNivelTec( this.capNivelTec )
        .subscribe( capNivelTec => {
          this.capNivelTec = capNivelTec;
          this.router.navigate(['/cap-nivel-tecnicos']);
        });
  }

}
