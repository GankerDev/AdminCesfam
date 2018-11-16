import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { TipoCategoria } from '../../models/tipoCategoria.models';


@Injectable({
  providedIn: 'root'
})
export class TipoCategoriaService {

  totalTipoCategoria: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarTipoCategoria( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/tipo-categoria?desde=' + desde;
    return this.http.get(url)
            .pipe(map((resp: any) => {
              this.totalTipoCategoria = resp.total;
              return resp.tipoCategorias;
            }));
  }

  obtenerTipoCategoria( id: string ) {
    let url = URL_SERVICIOS + '/tipo-categoria/' + id;
    return this.http.get(url)
            .pipe(map((resp: any) => resp.tipoCategorias));
  }

  borrarTipoCategoria( id: string ) {
    let url = URL_SERVICIOS + '/tipo-categoria/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
                .pipe(map(resp => swal('Tipo de categría borrada', 'Eliminada correctamente', 'success')));
  }

  crearTipoCategoria( nivel: string ) {
    let url = URL_SERVICIOS + '/tipo-categoria';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, { nivel } )
              .pipe(map((resp: any) => resp.tipoCategoria));
  }

  buscarTipoCategoria( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/tipoCategoria/' + termino;
    return this.http.get( url )
               .pipe(map((resp: any) => resp.tipoCategorias ));
  }

  actualizarTipoCategoria( tipoCategoria: TipoCategoria ) {
    let url =  URL_SERVICIOS + '/tipo-categoria/' + tipoCategoria._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, tipoCategoria )
            .pipe(map((resp: any) => {
              swal('Tipo categoría actualizada', '', 'success');
              return resp.tipoCategoria;
          }));
  }
}
