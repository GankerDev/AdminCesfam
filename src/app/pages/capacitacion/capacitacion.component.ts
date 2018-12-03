import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Capacitacion } from '../../models/capacitacion.models';
import { CapNivelTec } from '../../models/puntajes/capacitacionNivelTecnico.models';
import { CapacitacionService } from '../../services/capacitacion/capacitacion.service';
import { CapNivelTecService } from '../../services/puntajes/cap-nivel-tec.service';


@Component({
  selector: 'app-capacitacion',
  templateUrl: './capacitacion.component.html',
  styles: []
})
export class CapacitacionComponent implements OnInit {

  capNivelTec: CapNivelTec[] = [];
  capacitacion: Capacitacion = new Capacitacion();

  constructor(
    public _capacitacionService: CapacitacionService,
    public _capNivelTecService: CapNivelTecService,
    public router: Router,
    public activatedRoute: ActivatedRoute
    ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarCapacitacion( id );
      }
    });
  }

  ngOnInit() {
    this._capNivelTecService.cargarCapNivelTec()
        .subscribe( capNivelTec => this.capNivelTec = capNivelTec );
  }

  cargarCapacitacion( id: string) {
    this._capacitacionService.obtenerCapacitacion(id)
        .subscribe( capacitacion => {
          this.capacitacion = capacitacion;
          this.capacitacion.cap_nivel_tecnico = capacitacion.cap_nivel_tecnico;
        });

  }

  guardarCapacitacion(f: NgForm) {
    if ( f.invalid ) {
      return;
    }

    this._capacitacionService.guardarCapacitacion( this.capacitacion )
        .subscribe( capacitacion => {
          this.capacitacion = capacitacion;
          this.router.navigate(['/capacitaciones']);
        });
  }

}
