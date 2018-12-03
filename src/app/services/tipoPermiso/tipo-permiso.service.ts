import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

import { UsuarioService } from '../usuario/usuario.service';
import { TipoPermiso } from '../../models/tipoPermiso.models';

@Injectable({
  providedIn: 'root'
})
export class TipoPermisoService {

  totalTipoPermisos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarTipoPermiso( desde: number = 0, todo: boolean ) {
    if (todo) {
      let url = URL_SERVICIOS + '/tipo-permiso?todo=' + todo;
      return this.http.get(url)
              .pipe(map((resp: any) => {
                this.totalTipoPermisos = resp.total;
                return resp.tipoPermisos;
              }),
              catchError( err => {
                swal(err.error.mensaje, err.error.errors.message, 'error');
                return throwError(err);
              }));
    } else {
      let url = URL_SERVICIOS + '/tipo-permiso?desde=' + desde;
      return this.http.get(url)
              .pipe(map((resp: any) => {
                this.totalTipoPermisos = resp.total;
                return resp.tipoPermisos;
              }),
              catchError( err => {
                swal(err.error.mensaje, err.error.errors.message, 'error');
                return throwError(err);
              }));
    }
  }

  obtenerTipoPermiso( id: string ) {
    let url = URL_SERVICIOS + '/tipo-permiso/' + id;
    return this.http.get(url)
            .pipe(map((resp: any) => resp.tipoPermiso));
  }

  borrarTipoPermiso( id: string ) {
    let url = URL_SERVICIOS + '/tipo-permiso/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
                .pipe(map(resp => swal('Tipo de permiso borrado', 'Eliminado correctamente', 'success')),
                catchError( err => {
                  swal(err.error.mensaje, err.error.errors.message, 'error');
                  return throwError(err);
                }));
  }

  crearTipoPermiso( nombre: string ) {
    let url = URL_SERVICIOS + '/tipo-permiso';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, { nombre } )
              .pipe(map((resp: any) => resp.tipoPermiso));
  }

  actualizarTipoPermiso( tipoPermiso: TipoPermiso ) {
    let url =  URL_SERVICIOS + '/tipo-permiso/' + tipoPermiso._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, tipoPermiso )
            .pipe(map((resp: any) => {
              swal('Tipo permiso actualizado', '', 'success');
              return resp.tipoPermiso;
          }),
          catchError( err => {
            swal(err.error.mensaje, err.error.errors.message, 'error');
            return throwError(err);
          }));
  }
}
