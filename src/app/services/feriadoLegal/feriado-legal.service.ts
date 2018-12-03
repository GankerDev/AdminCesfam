import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

import { UsuarioService } from '../usuario/usuario.service';
import { FeriadoLegal } from '../../models/feriadoLegal.models';

@Injectable({
  providedIn: 'root'
})
export class FeriadoLegalService {

  totalferiados: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarFeriados( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/feriado-legal?desde=' + desde;
    return this.http.get(url)
            .pipe(map((resp: any) => {
              this.totalferiados = resp.total;
              return resp.feriadosLegales;
            }),
            catchError( err => {
              swal(err.error.mensaje, err.error.errors.message, 'error');
              return throwError(err);
            }));
  }

  obtenerFeriado( id: string ) {
    let url = URL_SERVICIOS + '/feriado-legal/' + id;
    return this.http.get(url)
            .pipe(map((resp: any) => resp.feriadoLegal));
  }

  borrarFeriado( id: string ) {
    let url = URL_SERVICIOS + '/feriado-legal/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
                .pipe(map(resp => swal('Feriado legal borrado', 'Eliminado correctamente', 'success')),
                catchError( err => {
                  swal(err.error.mensaje, err.error.errors.message, 'error');
                  return throwError(err);
                }));
  }

  guardarFeriado( feriadoLegal: FeriadoLegal ) {
    let url = URL_SERVICIOS + '/feriado-legal';
    if ( feriadoLegal._id ) {
      // actualizando
      url += '/' + feriadoLegal._id;
      url += '?token=' + this._usuarioService.token;

    return this.http.put( url, feriadoLegal )
            .pipe(map((resp: any) => {
              swal('Feriado legal actualizado', '', 'success');
              return resp.feriadoLegal;
          }),
          catchError( err => {
            swal(err.error.mensaje, err.error.errors.message, 'error');
            return throwError(err);
          }));
    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, feriadoLegal )
            .pipe(map((resp: any) => {
              swal('Feriado legal creado', '', 'success');
              return resp.feriadoLegal;
          }),
          catchError( err => {
            swal(err.error.mensaje, err.error.errors.message, 'error');
            return throwError(err);
          }));
    }

  }
}
