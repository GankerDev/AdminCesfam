import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

import { UsuarioService } from '../usuario/usuario.service';
import { Funcionario } from '../../models/funcionario.models';


@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  totalFuncionarios: number = 0;
  funcionario: Funcionario = new Funcionario();

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarFuncionarios( desde: number = 0, todo: boolean ) {

    if ( todo ) {
      let url = URL_SERVICIOS + '/funcionario?todo=' + todo;

      return this.http.get(url)
              .pipe(map((resp: any) => {
                this.totalFuncionarios = resp.total;
                return resp.funcionarios;
              }),
              catchError( err => {
                swal(err.error.mensaje, err.error.errors.message, 'error');
                return throwError(err);
              }));
    } else {

      let url = URL_SERVICIOS + '/funcionario?desde=' + desde;
      return this.http.get(url)
              .pipe(map((resp: any) => {
                this.totalFuncionarios = resp.total;
                return resp.funcionarios;
              }),
              catchError( err => {
                swal(err.error.mensaje, err.error.errors.message, 'error');
                return throwError(err);
              }));
    }
  }

  obtenerFuncionario( id: string ) {
    let url = URL_SERVICIOS + '/funcionario/' + id;
    return this.http.get(url)
            .pipe(map((resp: any) => resp.funcionario));
  }

  borrarFuncionario( id: string ) {
    let url = URL_SERVICIOS + '/funcionario/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
                .pipe(map(resp => swal('Funcionario borrado', 'Eliminado correctamente', 'success')),
                catchError( err => {
                  swal(err.error.mensaje, err.error.errors.message, 'error');
                  return throwError(err);
                }));
  }

  guardarFuncionario( funcionario: Funcionario ) {
    let url = URL_SERVICIOS + '/funcionario';
    if ( funcionario._id ) {
      // Actualizando
      let nota = true;
      url += '/' + funcionario._id;
      url += '/' + nota;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, funcionario )
            .pipe(map((resp: any) => {
              swal('Funcionario actualizado', '', 'success');
              return resp.funcionario;
          }),
          catchError( err => {
            swal(err.error.mensaje, err.error.errors.message, 'error');
            return throwError(err);
          }));

    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;
      funcionario.puntaje_cap_acumulado = 0;
      return this.http.post( url, funcionario  )
                .pipe(map((resp: any) => {
                  swal('Funcionario creado', '' , 'success');
                  return resp.funcionario;
                }),
                catchError( err => {
                  swal(err.error.mensaje, err.error.errors.message, 'error');
                  return throwError(err);
                }));
    }

  }

  actualizarPuntaje( funcionario: Funcionario, puntaje: number ) {
    let url = URL_SERVICIOS + '/funcionario';
    url += '/' + funcionario._id;
    url += '?token=' + this._usuarioService.token;

    funcionario.puntaje_cap_acumulado = Math.round(puntaje);

    return this.http.put( url, funcionario )
          .pipe(map((resp: any) => {
            swal('Puntaje actualizado', 'correctamente', 'success');
            return;
        }),
        catchError( err => {
          swal(err.error.mensaje, err.error.errors.message, 'error');
          return throwError(err);
        }));
  }

  actualizarPuntajeTotal( funcionario: Funcionario, total: number ) {
    let url = URL_SERVICIOS + '/funcionario';
    url += '/' + funcionario._id;
    url += '?token=' + this._usuarioService.token;

    funcionario.total_puntaje = Math.round(total);

    return this.http.put( url, funcionario )
          .pipe(map((resp: any) => {
            swal('Puntaje actualizado', 'correctamente', 'success');
            return;
        }),
        catchError( err => {
          swal(err.error.mensaje, err.error.errors.message, 'error');
          return throwError(err);
        }));
  }

  actualizaNivel(funcionario, nivel) {
    let url = URL_SERVICIOS + '/funcionario';
    url += '/' + funcionario._id;
    url += '?token=' + this._usuarioService.token;

    funcionario.nivel_actual = nivel;

    return this.http.put( url, funcionario )
          .pipe(map((resp: any) => {
            swal('Nivel actualizado', 'correctamente', 'success');
            return;
        }),
        catchError( err => {
          swal(err.error.mensaje, err.error.errors.message, 'error');
          return throwError(err);
        }));
  }

  buscarFuncionario( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/funcionario/' + termino;
    return this.http.get( url )
               .pipe(map((resp: any) => resp.funcionario ));
  }
}
