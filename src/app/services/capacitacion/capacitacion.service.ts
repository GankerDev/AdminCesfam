import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Capacitacion } from '../../models/capacitacion.models';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class CapacitacionService {

  capacitacion: Capacitacion = new Capacitacion();
  totalCapacitaciones: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarCapacitacion( desde: number = 0, todo: boolean ) {

    if (todo) {
      let url = URL_SERVICIOS + '/capacitacion?todo=' + todo;
      return this.http.get(url)
              .pipe(map((resp: any) => {
                this.totalCapacitaciones = resp.total;
                return resp.Capacitaciones;
              }),
              catchError( err => {
                swal(err.error.mensaje, err.error.errors.message, 'error');
                return throwError(err);
              }));
    } else {
      let url = URL_SERVICIOS + '/capacitacion?desde=' + desde;
      return this.http.get(url)
              .pipe(map((resp: any) => {
                this.totalCapacitaciones = resp.total;
                return resp.Capacitaciones;
              }),
              catchError( err => {
                swal(err.error.mensaje, err.error.errors.message, 'error');
                return throwError(err);
              }));
    }

  }

  obtenerCapacitacion( id: string ) {
    let url = URL_SERVICIOS + '/capacitacion/' + id;
    return this.http.get(url)
            .pipe(map((resp: any) => resp.capacitacion));
  }

  borrarCapacitacion( id: string ) {
    let url = URL_SERVICIOS + '/capacitacion/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
                .pipe(map(resp => swal('Capacitación borrada', 'Eliminada correctamente', 'success')),
                catchError( err => {
                  swal(err.error.mensaje, err.error.errors.message, 'error');
                  return throwError(err);
                }));
  }

  actualizarCapacitacion( capacitacion: Capacitacion, nota: number ) {
    let url = URL_SERVICIOS + '/capacitacion';
    url += '/' + capacitacion._id;
      url += '?token=' + this._usuarioService.token;
      capacitacion.nota = nota;
      return this.http.put( url, capacitacion )
            .pipe(map((resp: any) => {
              return resp.capacitacion;
          }),
          catchError( err => {
            swal(err.error.mensaje, err.error.errors.message, 'error');
            return throwError(err);
          }));
  }

  guardarCapacitacion( capacitacion: Capacitacion ) {
    let url = URL_SERVICIOS + '/capacitacion';

    if ( capacitacion._id ) {
      // Actualizando
      url += '/' + capacitacion._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, capacitacion )
            .pipe(map((resp: any) => {
              swal('Capacitación actualizada', '', 'success');
              return resp.capacitacion;
          }),
          catchError( err => {
            swal(err.error.mensaje, err.error.errors.message, 'error');
            return throwError(err);
          }));

    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;

      return this.http.post( url, capacitacion  )
                .pipe(map((resp: any) => {
                  swal('Capacitación creada', '' , 'success');
                  return resp.capacitacion;
                }),
                catchError( err => {
                  swal(err.error.mensaje, err.error.errors.message, 'error');
                  return throwError(err);
                }));
    }

  }

  buscarCapacitacion( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/capacitacion/' + termino;
    return this.http.get( url )
               .pipe(map((resp: any) => resp.capacitacion ));
  }
}
