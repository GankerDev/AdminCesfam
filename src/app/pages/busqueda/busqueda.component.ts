import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Funcionario } from '../../models/funcionario.models';
import { Categoria } from '../../models/categoria.models';
import { Capacitacion } from '../../models/capacitacion.models';
import { TipoCategoria } from '../../models/tipoCategoria.models';
import { TipoContrato } from '../../models/tipoContrato.models';
import { Usuario } from '../../models/usuario.models';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  funcionarios: Funcionario [] = [];
  categorias: Categoria[] = [];
  capacitaciones: Capacitacion[] = [];
  tipoCategorias: TipoCategoria[] = [];
  tipoContratos: TipoContrato [] = [];
  usuarios: Usuario[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {
    activatedRoute.params
        .subscribe( params  => {
          let termino = params['termino'];
          this.buscar( termino );
        });
   }

  ngOnInit() {
  }

  buscar( termino ) {
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get( url )
      .subscribe((resp: any) => {

        this.funcionarios = resp.funcionarios;
        this.capacitaciones = resp.capacitaciones;
        this.categorias = resp.categorias;
        this.tipoCategorias = resp.tiposCategorias;
        this.tipoContratos = resp.tiposContratos;
        this.usuarios = resp.usuarios;
      });
  }

}
