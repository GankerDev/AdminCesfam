import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CapNota } from '../../../models/puntajes/capacitacionNota.models';
import { CapNotaService } from '../../../services/puntajes/cap-nota.service';

@Component({
  selector: 'app-cap-nota',
  templateUrl: './cap-nota.component.html',
  styles: []
})
export class CapNotaComponent implements OnInit {

  capNota: CapNota = new CapNota();
  constructor(
    public _capNotaService:  CapNotaService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarCapNota( id );
      }
    });
  }

  ngOnInit() {
  }

  cargarCapNota( id: string) {
    this._capNotaService.obtenerCapNota(id)
        .subscribe( capNota => {
          this.capNota = capNota;
        });

  }

  guardarCapNota(f: NgForm) {
    if ( f.invalid ) {
      return;
    }

    this._capNotaService.guardarCapNota( this.capNota )
        .subscribe( (capNota: any) => {
          this.capNota = capNota;
          this.router.navigate(['/cap-notas']);
        });
  }

}
