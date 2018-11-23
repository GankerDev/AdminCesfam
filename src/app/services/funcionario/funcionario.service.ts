import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
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
      let url = URL_SERVICIOS + '/funcionario';

      return this.http.get(url)
              .pipe(map((resp: any) => {
                this.totalFuncionarios = resp.total;
                return resp.funcionarios;
              }));
    } else {

      let url = URL_SERVICIOS + '/funcionario?desde=' + desde;
      return this.http.get(url)
              .pipe(map((resp: any) => {
                this.totalFuncionarios = resp.total;
                return resp.funcionarios;
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
                .pipe(map(resp => swal('Funcionario borrado', 'Eliminado correctamente', 'success')));
  }

  guardarFuncionario( funcionario: Funcionario ) {
    let url = URL_SERVICIOS + '/funcionario';

    if ( funcionario._id ) {
      // Actualizando
      url += '/' + funcionario._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, funcionario )
            .pipe(map((resp: any) => {
              swal('Funcionario actualizado', '', 'success');
              return resp.funcionario;
          }));

    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;

      return this.http.post( url, funcionario  )
                .pipe(map((resp: any) => {
                  swal('Funcionario creado', '' , 'success');
                  return resp.funcionario;
                }));
    }

  }

  buscarFuncionario( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/funcionario/' + termino;
    return this.http.get( url )
               .pipe(map((resp: any) => resp.funcionario ));
  }
}
