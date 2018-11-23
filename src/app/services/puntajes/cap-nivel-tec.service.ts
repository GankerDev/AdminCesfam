import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map } from 'rxjs/operators';
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
            }));
  }

  obtenerCapNivelTec( id: string ) {
    let url = URL_SERVICIOS + '/cap-nivel-tecnico/' + id;
    return this.http.get(url)
            .pipe(map((resp: any) => resp.capacitacionNT));
  }

  borrarCapNivelTec( id: string ) {
    let url = URL_SERVICIOS + '/cap-nivel-tecnico/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
                .pipe(map(resp => swal('Elemento borrado', 'Eliminado correctamente', 'success')));
  }

  guardarCapNivelTec( capNivelTec: CapNivelTec ) {
    let url = URL_SERVICIOS + '/cap-nivel-tecnico';
    console.log(capNivelTec);

    if ( capNivelTec._id ) {
      // Actualizando
      url += '/' + capNivelTec._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, capNivelTec )
            .pipe(map((resp: any) => {
              swal(' Actualizado', '', 'success');
              return resp.capacitacionNT;
          }));

    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, capNivelTec )
                .pipe(map((resp: any) => {
                  swal('Creada', capNivelTec.nivel_tecnico, 'success');
                  return resp.capacitacionNT;
                }));
    }

  }
}
