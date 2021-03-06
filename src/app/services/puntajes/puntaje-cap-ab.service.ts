import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

import { UsuarioService } from '../usuario/usuario.service';
import { PuntajeCapAB } from '../../models/puntajes/puntajCapAB.models';


@Injectable({
  providedIn: 'root'
})
export class PuntajeCapABService {

  puntajeCapAb: PuntajeCapAB = new PuntajeCapAB();

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarPuntajeCapAB() {
    let url = URL_SERVICIOS + '/puntaje-cap-ab';
    return this.http.get(url)
            .pipe(map((resp: any) => {
              return resp.puntajeCapAB;
            }),
            catchError( err => {
              swal(err.error.mensaje, err.error.errors.message, 'error');
              return throwError(err);
            }));
  }

  obtenerPuntajeCapAB( id: string ) {
    let url = URL_SERVICIOS + '/puntaje-cap-ab/' + id;
    return this.http.get(url)
            .pipe(map((resp: any) => resp.puntajeCapAB));
  }

  borrarPuntajeCapAB( id: string ) {
    let url = URL_SERVICIOS + '/puntaje-cap-ab/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
                .pipe(map(resp => swal('Elemento borrado', 'Eliminado correctamente', 'success')),
                catchError( err => {
                  swal(err.error.mensaje, err.error.errors.message, 'error');
                  return throwError(err);
                }));
  }

  guardarPuntajeCapAB( puntajeCapAB: PuntajeCapAB ) {
    let url = URL_SERVICIOS + '/puntaje-cap-ab';
    if ( puntajeCapAB._id ) {
      // Actualizando
      url += '/' + puntajeCapAB._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, puntajeCapAB )
            .pipe(map((resp: any) => {
              swal(' Actualizado', '', 'success');
              return resp.puntajeCapAB;
          }),
          catchError( err => {
            swal(err.error.mensaje, err.error.errors.message, 'error');
            return throwError(err);
          }));

    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;

      return this.http.post( url, puntajeCapAB  )
                .pipe(map((resp: any) => {
                  swal('Creado', '', 'success');
                  return resp.puntajeCapAB;
                }),
                catchError( err => {
                  swal(err.error.mensaje, err.error.errors.message, 'error');
                  return throwError(err);
                }));
    }

  }
}
