import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';


@Injectable({
  providedIn: 'root'
})
export class PuntajeService {

    puntajeDuracion: Number;
    factorNota: Number;
    factorNivel: Number;

  constructor(
    public http: HttpClient,
  ) { }

  obtenerDatos( duracion: number, nota: number, nivel: string ) {

    let url = URL_SERVICIOS + '/calcular-puntaje/duracion/' + duracion;
    this.http.get( url )
        .pipe(map((resp: any) => {
            this.puntajeDuracion = resp.obj;
        }),
        catchError( err => {
          swal(err.error.mensaje, err.error.errors.message, 'error');
          return throwError(err);
        }));

    let url1 = URL_SERVICIOS + '/calcular-puntaje/nota/' + nota;
    this.http.get( url1 )
        .pipe(map((resp: any) => {
            this.factorNota = resp.obj;
        }),
        catchError( err => {
            swal(err.error.mensaje, err.error.errors.message, 'error');
            return throwError(err);
        }));

    let url2 = URL_SERVICIOS + '/nivel-tecnico/nivel/' + nivel;
    this.http.get( url2 )
        .pipe(map((resp: any) => {
            this.factorNivel = resp.obj;
        }),
        catchError( err => {
          swal(err.error.mensaje, err.error.errors.message, 'error');
          return throwError(err);
        }));

  }
}
