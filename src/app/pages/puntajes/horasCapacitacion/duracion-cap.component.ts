import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DuracionCap } from '../../../models/puntajes/horasCapacitacion.models';
import { HorasCapService } from '../../../services/service.index';


@Component({
  selector: 'app-duracion-cap',
  templateUrl: './duracion-cap.component.html',
  styles: []
})
export class DuracionCapComponent implements OnInit {

  duracionCap: DuracionCap = new DuracionCap();

  constructor(
    public _horasCapService:  HorasCapService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarDuracionCap( id );
      }
    });
  }

  ngOnInit() {
  }

  cargarDuracionCap( id: string) {
    this._horasCapService.obtenerDuracionCap(id)
        .subscribe( duracionCap => {
          this.duracionCap = duracionCap;
        });

  }

  guardarDuracionCap(f: NgForm) {
    if ( f.invalid ) {
      return;
    }

    this._horasCapService.guardarDuracionCap( this.duracionCap )
        .subscribe( (duracionCap: any) => {
          this.duracionCap = duracionCap;
          this.router.navigate(['/horas-caps']);
        });
  }

}
