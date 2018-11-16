import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Categoria } from '../../models/categoria.models';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  totalCategorias: number = 0;
  categoria: Categoria = new Categoria();

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarCategorias( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/categoria?desde=' + desde;
    return this.http.get(url)
            .pipe(map((resp: any) => {
              this.totalCategorias = resp.total;
              return resp.Categorias;
            }));
  }

  obtenerCategoria( id: string ) {
    let url = URL_SERVICIOS + '/categoria/' + id;
    return this.http.get(url)
            .pipe(map((resp: any) => resp.categoria));
  }

  borrarCategoria( id: string ) {
    let url = URL_SERVICIOS + '/categoria/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
                .pipe(map(resp => swal('Categoria borrada', 'Eliminada correctamente', 'success')));
  }

  guardarCategoria( categoria: Categoria ) {
    let url = URL_SERVICIOS + '/categoria';

    if ( categoria._id ) {
      // Actualizando
      url += '/' + categoria._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, categoria )
            .pipe(map((resp: any) => {
              swal('Categoria actualizada', categoria.nombre_cargo_funcionario, 'success');
              return resp.categoria;
          }));

    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;

      return this.http.post( url, categoria  )
                .pipe(map((resp: any) => {
                  swal('Categoría creada', categoria.nombre_cargo_funcionario, 'success');
                  return resp.categoria;
                }));
    }

  }

  buscarCategoria( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/categoria/' + termino;
    return this.http.get( url )
               .pipe(map((resp: any) => resp.categoria ));
  }
}
