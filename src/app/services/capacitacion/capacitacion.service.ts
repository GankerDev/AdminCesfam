import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Capacitacion } from '../../models/capacitacion.models';

@Injectable({
  providedIn: 'root'
})
export class CapacitacionService {

  totalCapacitaciones: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarCapacitaciones( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/capacitacion?desde=' + desde;
    return this.http.get(url)
            .pipe(map((resp: any) => {
              this.totalCapacitaciones = resp.total;
              return resp.Capacitaciones;
            }));
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
                .pipe(map(resp => swal('Capacitación borrada', 'Eliminada correctamente', 'success')));
  }

  crearCapacitacion( nombre_capacitacion: string, descripcion_capacitacion: string ) {
    let url = URL_SERVICIOS + '/capacitacion';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, { nombre_capacitacion, descripcion_capacitacion } )
              .pipe(map((resp: any) => resp.capacitacion));
  }

  buscarCapacitacion( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/capacitacion/' + termino;
    return this.http.get( url )
               .pipe(map((resp: any) => resp.capacitacion ));
  }

  actualizarCapacitacion( capacitacion: Capacitacion ) {
    let url =  URL_SERVICIOS + '/capacitacion/' + capacitacion._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, capacitacion )
            .pipe(map((resp: any) => {
              swal('Capacitación actualizada', capacitacion.nombre_capacitacion, 'success');
              return resp.capcitacion;
          }));
  }
}
