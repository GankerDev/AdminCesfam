import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { PuntajeAB } from '../../models/puntajes/puntajeAB.models';


@Injectable({
  providedIn: 'root'
})
export class PuntajeABService {

  puntajeAb: PuntajeAB = new PuntajeAB();

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarPuntajeAB() {
    let url = URL_SERVICIOS + '/puntajeAb';
    return this.http.get(url)
            .pipe(map((resp: any) => {
              return resp.puntajeAB;
            }));
  }

  obtenerPuntajeAB( id: string ) {
    let url = URL_SERVICIOS + '/puntajeAb/' + id;
    return this.http.get(url)
            .pipe(map((resp: any) => resp.puntajeAB));
  }

  borrarPuntajeAB( id: string ) {
    let url = URL_SERVICIOS + '/puntajeAb/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
                .pipe(map(resp => swal('Elemento borrado', 'Eliminado correctamente', 'success')));
  }

  guardarPuntajeAB( puntajeAB: PuntajeAB ) {
    let url = URL_SERVICIOS + '/puntajeAb';

    if ( puntajeAB._id ) {
      // Actualizando
      url += '/' + puntajeAB._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, puntajeAB )
            .pipe(map((resp: any) => {
              swal(' Actualizado', '', 'success');
              return resp.puntajeAB;
          }));

    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;

      return this.http.post( url, puntajeAB  )
                .pipe(map((resp: any) => {
                  swal('Creado', '', 'success');
                  return resp.puntajeAB;
                }));
    }

  }
}
