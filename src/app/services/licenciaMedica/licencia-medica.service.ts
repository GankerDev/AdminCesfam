import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { LicenciaMedica } from '../../models/licenciaMedica.models';



@Injectable({
  providedIn: 'root'
})
export class LicenciaMedicaService {


  totalLicencias: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarLicencias( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/licencia-medica?desde=' + desde;
    return this.http.get(url)
            .pipe(map((resp: any) => {
              this.totalLicencias = resp.total;
              return resp.licenciasMedicas;
            }));
  }

  obtenerLicencia( id: string ) {
    let url = URL_SERVICIOS + '/licencia-medica/' + id;
    return this.http.get(url)
            .pipe(map((resp: any) => resp.licenciaMedica));
  }

  borrarLicencia( id: string ) {
    let url = URL_SERVICIOS + '/licencia-medica/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
                .pipe(map(resp => swal('Licencia médica borrada', 'Eliminada correctamente', 'success')));
  }

  guardarLicencia( licenciaMedica: LicenciaMedica ) {
    let url = URL_SERVICIOS + '/feriado-legal';
    if ( licenciaMedica._id ) {
      // actualizando
      url += '/' + licenciaMedica._id;
      url += '?token=' + this._usuarioService.token;

    return this.http.put( url, licenciaMedica )
            .pipe(map((resp: any) => {
              swal('Licencia médica actualizada', '', 'success');
              return resp.licenciaMedica;
          }));
    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, licenciaMedica )
            .pipe(map((resp: any) => {
              swal('Licencia médica creada', '', 'success');
              return resp.licenciaMedica;
          }));
    }

  }
}
