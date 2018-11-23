import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { PuntajeCapCDEF } from '../../models/puntajes/puntajeCapCDEF.models';


@Injectable({
  providedIn: 'root'
})
export class PuntajeCapCDEFService {

  puntajeCapCDEF: PuntajeCapCDEF = new PuntajeCapCDEF();

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarPuntajeCapCDEF() {
    let url = URL_SERVICIOS + '/puntaje-cap-cdef';
    return this.http.get(url)
            .pipe(map((resp: any) => {
              return resp.puntajeCapCDEF;
            }));
  }

  obtenerPuntajeCapCDEF( id: string ) {
    let url = URL_SERVICIOS + '/puntaje-cap-cdef/' + id;
    return this.http.get(url)
            .pipe(map((resp: any) => resp.puntajeCapCDEF));
  }

  borrarPuntajeCapCDEF( id: string ) {
    let url = URL_SERVICIOS + '/puntaje-cap-cdef/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
                .pipe(map(resp => swal('Elemento borrado', 'Eliminado correctamente', 'success')));
  }

  guardarPuntajeCapCDEF( puntajeCapCDEF: PuntajeCapCDEF ) {
    let url = URL_SERVICIOS + '/puntaje-cap-cdef';

    if ( puntajeCapCDEF._id ) {
      // Actualizando
      url += '/' + puntajeCapCDEF._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, puntajeCapCDEF )
            .pipe(map((resp: any) => {
              swal(' Actualizado', '', 'success');
              return resp.puntajeCapCDEF;
          }));

    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;

      return this.http.post( url, puntajeCapCDEF  )
                .pipe(map((resp: any) => {
                  swal('Creado', '', 'success');
                  return resp.puntajeCapCDEF;
                }));
    }

  }
}
