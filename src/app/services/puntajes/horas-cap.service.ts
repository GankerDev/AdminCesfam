import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { DuracionCap } from '../../models/puntajes/horasCapacitacion.models';


@Injectable({
  providedIn: 'root'
})
export class HorasCapService {

  duracionCap: DuracionCap = new DuracionCap();

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarDuracionCap() {
    let url = URL_SERVICIOS + '/horas-cap';
    return this.http.get(url)
            .pipe(map((resp: any) => {
              return resp.duracionCap;
            }));
  }

  obtenerDuracionCap( id: string ) {
    let url = URL_SERVICIOS + '/horas-cap/' + id;
    return this.http.get(url)
            .pipe(map((resp: any) => resp.duracionCap));
  }

  borrarDuracionCap( id: string ) {
    let url = URL_SERVICIOS + '/horas-cap/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
                .pipe(map(resp => swal('Elemento borrado', 'Eliminado correctamente', 'success')));
  }

  guardarDuracionCap( duracionCap: DuracionCap ) {
    let url = URL_SERVICIOS + '/horas-cap';

    if ( duracionCap._id ) {
      // Actualizando
      url += '/' + duracionCap._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, duracionCap )
            .pipe(map((resp: any) => {
              swal(' Actualizado', '', 'success');
              return resp.duracionCapGuardado;
          }));

    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;

      return this.http.post( url, duracionCap  )
                .pipe(map((resp: any) => {
                  swal('Creado', '', 'success');
                  return resp.duracionCapGuardado;
                }));
    }

  }
}
