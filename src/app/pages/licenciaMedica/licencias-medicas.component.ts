import { Component, OnInit } from '@angular/core';
import { LicenciaMedica } from '../../models/licenciaMedica.models';
import { LicenciaMedicaService } from '../../services/licenciaMedica/licencia-medica.service';


declare var swal: any;

@Component({
  selector: 'app-licencias-medicas',
  templateUrl: './licencias-medicas.component.html',
  styles: []
})
export class LicenciasMedicasComponent implements OnInit {

  licencias: LicenciaMedica[] = [];
  cargando: boolean = true;
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(
    public _licenciaMedicaService: LicenciaMedicaService
  ) { }

  ngOnInit() {
    this.cargarLicencias();
  }

  cargarLicencias() {
    this.cargando = true;
    this._licenciaMedicaService.cargarLicencias(this.desde)
        .subscribe( licenciasMedicas => {
          this.totalRegistros = this._licenciaMedicaService.totalLicencias;
          this.cargando = false;
          this.licencias = licenciasMedicas;
        });

  }

  // buscarFeriado( termino: string ) {
  //   if ( termino.length <= 0 ) {
  //     this.cargarFeriados();
  //     return;
  //   }

  //   this._feriadoLegalService.buscarFeriado( termino )
  //       .subscribe( capacitacion => this.capacitaciones = capacitacion );
  // }

  guardarLicencia( licencia: LicenciaMedica ) {
    this._licenciaMedicaService.guardarLicencia( licencia )
        .subscribe();
  }

  borrarLicencia( licencia: LicenciaMedica ) {
        swal({
          title: '¿Esta seguro?',
          text: 'Esta a punto de borrar licencia médica ',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        })
        .then( borrar => {
          if ( borrar ) {
            this._licenciaMedicaService.borrarLicencia( licencia._id )
                .subscribe(() => this.cargarLicencias());
          }
        });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarLicencias();
  }

}
