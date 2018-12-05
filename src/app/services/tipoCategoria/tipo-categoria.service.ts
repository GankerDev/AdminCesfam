import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

import { UsuarioService } from '../usuario/usuario.service';
import { TipoCategoria } from '../../models/tipoCategoria.models';


@Injectable({
  providedIn: 'root'
})
export class TipoCategoriaService {

  totalTipoCategoria: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarTipoCategoria( desde: number = 0, todo: boolean ) {
    if (todo) {
      let url = URL_SERVICIOS + '/tipo-categoria?todo=' + todo;
      return this.http.get(url)
              .pipe(map((resp: any) => {
                this.totalTipoCategoria = resp.total;
                return resp.tipoCategorias;
              }),
              catchError( err => {
                swal(err.error.mensaje, err.error.errors.message, 'error');
                return throwError(err);
              }));
    } else {
      let url = URL_SERVICIOS + '/tipo-categoria?desde=' + desde;
      return this.http.get(url)
              .pipe(map((resp: any) => {
                this.totalTipoCategoria = resp.total;
                return resp.tipoCategorias;
              }),
              catchError( err => {
                swal(err.error.mensaje, err.error.errors.message, 'error');
                return throwError(err);
              }));
    }
  }

  obtenerTipoCategoria( id: string ) {
    let url = URL_SERVICIOS + '/tipo-categoria/' + id;
    return this.http.get(url)
            .pipe(map((resp: any) => resp.tipoCategoria));
  }

  borrarTipoCategoria( id: string ) {
    let url = URL_SERVICIOS + '/tipo-categoria/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
                .pipe(map(resp => swal('Tipo de categría borrada', 'Eliminada correctamente', 'success')),
                catchError( err => {
                  swal(err.error.mensaje, err.error.errors.message, 'error');
                  return throwError(err);
                }));
  }

  crearTipoCategoria( nivel: string ) {
    let url = URL_SERVICIOS + '/tipo-categoria';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, { nivel } )
              .pipe(map((resp: any) => resp.tipoCategoria));
  }

  buscarTipoCategoria( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/tipoCategoria/' + termino;
    return this.http.get( url )
               .pipe(map((resp: any) => resp.tipoCategorias ));
  }

  actualizarTipoCategoria( tipoCategoria: TipoCategoria ) {
    let url =  URL_SERVICIOS + '/tipo-categoria/' + tipoCategoria._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, tipoCategoria )
            .pipe(map((resp: any) => {
              swal('Tipo categoría actualizada', '', 'success');
              return resp.tipoCategoria;
          }),
          catchError( err => {
            swal(err.error.mensaje, err.error.errors.message, 'error');
            return throwError(err);
          }));
  }
}
