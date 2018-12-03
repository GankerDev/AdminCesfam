import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

import { UsuarioService } from '../usuario/usuario.service';
import { CapNivelTec } from '../../models/puntajes/capacitacionNivelTecnico.models';


@Injectable({
  providedIn: 'root'
})
export class CapNivelTecService {

  capNivelTec: CapNivelTec = new CapNivelTec();

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarCapNivelTec() {
    let url = URL_SERVICIOS + '/cap-nivel-tecnico';
    return this.http.get(url)
            .pipe(map((resp: any) => {
              return resp.CapacitacionesNT;
            }),
            catchError( err => {
              swal(err.error.mensaje, err.error.errors.message, 'error');
              return throwError(err);
            }));
  }

  obtenerCapNivelTec( id: string ) {
    let url = URL_SERVICIOS + '/cap-nivel-tecnico/' + id;
    return this.http.get(url)
            .pipe(map((resp: any) => {
              return resp.capacitacionNT;
            }),
            catchError( err => {
              swal(err.error.mensaje, err.error.errors.message, 'error');
              return throwError(err);
            }));
  }

  borrarCapNivelTec( id: string ) {
    let url = URL_SERVICIOS + '/cap-nivel-tecnico/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
                .pipe(map(resp => swal('Elemento borrado', 'Eliminado correctamente', 'success')),
                catchError( err => {
                  swal(err.error.mensaje, err.error.errors.message, 'error');
                  return throwError(err);
                }));
  }

  guardarCapNivelTec( capNivelTec: CapNivelTec ) {
    let url = URL_SERVICIOS + '/cap-nivel-tecnico';

    if ( capNivelTec._id ) {
      // Actualizando
      url += '/' + capNivelTec._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, capNivelTec )
            .pipe(map((resp: any) => {
              swal(' Actualizado', '', 'success');
              return resp.capacitacionNT;
          }),
          catchError( err => {
            swal(err.error.mensaje, err.error.errors.message, 'error');
            return throwError(err);
          }));

    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, capNivelTec )
                .pipe(map((resp: any) => {
                  swal('Creada', capNivelTec.nivel_tecnico, 'success');
                  return resp.capacitacionNT;
                }),
                catchError( err => {
                  swal(err.error.mensaje, err.error.errors.message, 'error');
                  return throwError(err);
                }));
    }

  }
}
