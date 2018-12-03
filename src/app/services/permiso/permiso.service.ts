import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

import { UsuarioService } from '../usuario/usuario.service';
import { Permiso } from '../../models/permiso.models';


@Injectable({
  providedIn: 'root'
})
export class PermisoService {

  totalPermisos: number = 0;
  permiso: Permiso = new Permiso();

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarPermisos( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/permiso?desde=' + desde;

    return this.http.get(url)
            .pipe(map((resp: any) => {
              this.totalPermisos = resp.total;
              return resp.permisos;
            }),
            catchError( err => {
              swal(err.error.mensaje, err.error.errors.message, 'error');
              return throwError(err);
            }));
  }

  obtenerPermiso( id: string ) {
    let url = URL_SERVICIOS + '/permiso/' + id;
    return this.http.get(url)
            .pipe(map((resp: any) => resp.permiso));
  }

  borrarPermiso( id: string ) {
    let url = URL_SERVICIOS + '/permiso/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
                .pipe(map(resp => swal('Permiso borrado', 'Eliminado correctamente', 'success')),
                catchError( err => {
                  swal(err.error.mensaje, err.error.errors.message, 'error');
                  return throwError(err);
                }));
  }

  guardarPermiso( permiso: Permiso ) {
    let url = URL_SERVICIOS + '/permiso';

    if ( permiso._id ) {
      // Actualizando
      url += '/' + permiso._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, permiso )
            .pipe(map((resp: any) => {
              swal('Permiso actualizado', '', 'success');
              return resp.permiso;
          }),
          catchError( err => {
            swal(err.error.mensaje, err.error.errors.message, 'error');
            return throwError(err);
          }));

    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;

      return this.http.post( url, permiso  )
                .pipe(map((resp: any) => {
                  swal('Permiso creado', '' , 'success');
                  return resp.permiso;
                }),
                catchError( err => {
                  swal(err.error.mensaje, err.error.errors.message, 'error');
                  return throwError(err);
                }));
    }

  }

  buscarPermiso( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/permiso/' + termino;
    return this.http.get( url )
               .pipe(map((resp: any) => resp.permiso ));
  }
}
