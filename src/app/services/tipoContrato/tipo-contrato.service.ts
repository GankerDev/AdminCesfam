import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

import { UsuarioService } from '../usuario/usuario.service';
import { TipoContrato } from '../../models/tipoContrato.models';

@Injectable({
  providedIn: 'root'
})
export class TipoContratoService {

  totalTipoContrato: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarTipoContrato( desde: number = 0, todo: boolean ) {
    if (todo) {
      let url = URL_SERVICIOS + '/tipo-contrato?todo=' + todo;
      return this.http.get(url)
              .pipe(map((resp: any) => {
                this.totalTipoContrato = resp.total;
                return resp.tipoContratos;
              }),
              catchError( err => {
                swal(err.error.mensaje, err.error.errors.message, 'error');
                return throwError(err);
              }));
    } else {
      let url = URL_SERVICIOS + '/tipo-contrato?desde=' + desde;
      return this.http.get(url)
              .pipe(map((resp: any) => {
                this.totalTipoContrato = resp.total;
                return resp.tipoContratos;
              }),
              catchError( err => {
                swal(err.error.mensaje, err.error.errors.message, 'error');
                return throwError(err);
              }));
    }
  }

  obtenerTipoCategoria( id: string ) {
    let url = URL_SERVICIOS + '/tipo-contrato/' + id;
    return this.http.get(url)
            .pipe(map((resp: any) => resp.tipoCategorias));
  }

  borrarTipoContrato( id: string ) {
    let url = URL_SERVICIOS + '/tipo-contrato/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
                .pipe(map(resp => swal('Tipo de contrato borrado', 'Eliminada correctamente', 'success')),
                catchError( err => {
                  swal(err.error.mensaje, err.error.errors.message, 'error');
                  return throwError(err);
                }));
  }

  crearTipoContrato( nombre_tipo_contrato: string ) {
    let url = URL_SERVICIOS + '/tipo-contrato';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, { nombre_tipo_contrato } )
              .pipe(map((resp: any) => resp.tipoContrato));
  }

  buscarTipoContrato( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/tipoContrato/' + termino;
    return this.http.get( url )
               .pipe(map((resp: any) => resp.tipoContrato ));
  }

  actualizarTipoContrato( tipoContrato: TipoContrato) {
    let url =  URL_SERVICIOS + '/tipo-contrato/' + tipoContrato._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, tipoContrato )
            .pipe(map((resp: any) => {
              swal('Tipo contrato actualizado', '', 'success');
              return resp.tipoContrato;
          }),
          catchError( err => {
            swal(err.error.mensaje, err.error.errors.message, 'error');
            return throwError(err);
          }));
  }
}
