import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Permiso } from '../../models/permiso.models';


@Injectable({
  providedIn: 'root'
})
export class PermisoService {

  totalPermisos: number = 0;
  permiso: Permiso = new Permiso();

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarPermisos( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/permiso?desde=' + desde;

    return this.http.get(url)
            .pipe(map((resp: any) => {
              this.totalPermisos = resp.total;
              return resp.permisos;
            }));
  }

  obtenerPermiso( id: string ) {
    let url = URL_SERVICIOS + '/permiso/' + id;
    return this.http.get(url)
            .pipe(map((resp: any) => resp.permiso));
  }

  borrarPermiso( id: string ) {
    let url = URL_SERVICIOS + '/permiso/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
                .pipe(map(resp => swal('Permiso borrado', 'Eliminado correctamente', 'success')));
  }

  guardarPermiso( permiso: Permiso ) {
    let url = URL_SERVICIOS + '/permiso';

    if ( permiso._id ) {
      // Actualizando
      url += '/' + permiso._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, permiso )
            .pipe(map((resp: any) => {
              swal('Permiso actualizado', '', 'success');
              return resp.permiso;
          }));

    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;

      return this.http.post( url, permiso  )
                .pipe(map((resp: any) => {
                  swal('Permiso creado', '' , 'success');
                  return resp.permiso;
                }));
    }

  }

  buscarPermiso( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/permiso/' + termino;
    return this.http.get( url )
               .pipe(map((resp: any) => resp.permiso ));
  }
}
