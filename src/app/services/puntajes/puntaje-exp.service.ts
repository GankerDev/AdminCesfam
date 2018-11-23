import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { PuntajeExp } from '../../models/puntajes/puntajeExp.models';


@Injectable({
  providedIn: 'root'
})
export class PuntajeExpService {

  puntajeExp: PuntajeExp = new PuntajeExp();

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarPuntajeExp() {
    let url = URL_SERVICIOS + '/puntaje-exp';
    return this.http.get(url)
            .pipe(map((resp: any) => {
              return resp.puntajeExp;
            }));
  }

  obtenerPuntajeExp( id: string ) {
    let url = URL_SERVICIOS + '/puntaje-exp/' + id;
    return this.http.get(url)
            .pipe(map((resp: any) => resp.puntajeExp));
  }

  borrarPuntajeExp( id: string ) {
    let url = URL_SERVICIOS + '/puntaje-exp/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
                .pipe(map(resp => swal('Elemento borrado', 'Eliminado correctamente', 'success')));
  }

  guardarPuntajeExp( puntajeExp: PuntajeExp ) {
    let url = URL_SERVICIOS + '/puntaje-exp';

    if ( puntajeExp._id ) {
      // Actualizando
      url += '/' + puntajeExp._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, puntajeExp )
            .pipe(map((resp: any) => {
              swal(' Actualizado', '', 'success');
              return resp.puntajeExp;
          }));

    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;

      return this.http.post( url, puntajeExp  )
                .pipe(map((resp: any) => {
                  swal('Creado', '', 'success');
                  return resp.puntajeExp;
                }));
    }

  }
}
