import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

import { UsuarioService } from '../usuario/usuario.service';
import { CapNota } from '../../models/puntajes/capacitacionNota.models';

@Injectable({
  providedIn: 'root'
})
export class CapNotaService {

  capNota: CapNota = new CapNota();

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarCapNota() {
    let url = URL_SERVICIOS + '/cap-nota';
    return this.http.get(url)
            .pipe(map((resp: any) => {
              return resp.CapacitacionNota;
            }),
            catchError( err => {
              swal(err.error.mensaje, err.error.errors.message, 'error');
              return throwError(err);
            }));
  }

  obtenerCapNota( id: string ) {
    let url = URL_SERVICIOS + '/cap-nota/' + id;
    return this.http.get(url)
            .pipe(map((resp: any) => resp.capacitacionNota));
  }

  borrarCapNota( id: string ) {
    let url = URL_SERVICIOS + '/cap-nota/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
                .pipe(map(resp => swal('Elemento borrado', 'Eliminado correctamente', 'success')),
                catchError( err => {
                  swal(err.error.mensaje, err.error.errors.message, 'error');
                  return throwError(err);
                }));
  }

  guardarCapNota( capNota: CapNota ) {
    let url = URL_SERVICIOS + '/cap-nota';

    if ( capNota._id ) {
      // Actualizando
      url += '/' + capNota._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, capNota )
            .pipe(map((resp: any) => {
              swal(' Actualizado', '', 'success');
              return resp.capacitacionNota;
          }),
          catchError( err => {
            swal(err.error.mensaje, err.error.errors.message, 'error');
            return throwError(err);
          }));

    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;

      return this.http.post( url, capNota  )
                .pipe(map((resp: any) => {
                  swal('Creado', '', 'success');
                  return resp.capacitacionNota;
                }),
                catchError( err => {
                  swal(err.error.mensaje, err.error.errors.message, 'error');
                  return throwError(err);
                }));
    }

  }
}
