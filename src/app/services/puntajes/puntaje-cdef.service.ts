import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

import { UsuarioService } from '../usuario/usuario.service';
import { PuntajeCDEF } from '../../models/puntajes/puntajeCDEF.models';


@Injectable({
  providedIn: 'root'
})
export class PuntajeCDEFService {

  puntajeCDEF: PuntajeCDEF = new PuntajeCDEF();

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarPuntajeCDEF() {
    let url = URL_SERVICIOS + '/puntajeCDEF';
    return this.http.get(url)
            .pipe(map((resp: any) => {
              return resp.puntajeCDEF;
            }),
            catchError( err => {
              swal(err.error.mensaje, err.error.errors.message, 'error');
              return throwError(err);
            }));
  }

  obtenerPuntajeCDEF( id: string ) {
    let url = URL_SERVICIOS + '/puntajeCDEF/' + id;
    return this.http.get(url)
            .pipe(map((resp: any) => resp.puntajeCDEF));
  }

  borrarPuntajeCDEF( id: string ) {
    let url = URL_SERVICIOS + '/puntajeCDEF/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
                .pipe(map(resp => swal('Elemento borrado', 'Eliminado correctamente', 'success')),
                catchError( err => {
                  swal(err.error.mensaje, err.error.errors.message, 'error');
                  return throwError(err);
                }));
  }

  guardarPuntajeCDEF( puntajeCDEF: PuntajeCDEF ) {
    let url = URL_SERVICIOS + '/puntajeCDEF';

    if ( puntajeCDEF._id ) {
      // Actualizando
      url += '/' + puntajeCDEF._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, puntajeCDEF )
            .pipe(map((resp: any) => {
              swal(' Actualizado', '', 'success');
              return resp.puntajeCDEF;
          }),
          catchError( err => {
            swal(err.error.mensaje, err.error.errors.message, 'error');
            return throwError(err);
          }));

    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;

      return this.http.post( url, puntajeCDEF  )
                .pipe(map((resp: any) => {
                  swal('Creado', '', 'success');
                  return resp.puntajeCDEF;
                }),
                catchError( err => {
                  swal(err.error.mensaje, err.error.errors.message, 'error');
                  return throwError(err);
                }));
    }

  }
}
