import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria.models';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { TipoCategoria } from '../../models/tipoCategoria.models';


declare var swal: any;

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: []
})
export class CategoriasComponent implements OnInit {

  categorias: Categoria[] = [];
  cargando: boolean = true;
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(
    public _categoriaService:  CategoriaService
  ) { }

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.cargando = true;
    this._categoriaService.cargarCategorias(this.desde, false)
        .subscribe( categorias => {
          this.totalRegistros = this._categoriaService.totalCategorias;
          this.cargando = false;
          this.categorias = categorias;
        });

  }

  buscarCategoria( termino: string ) {
     if ( termino.length <= 0 ) {
       this.cargarCategorias();
       return;
     }

     this._categoriaService.buscarCategoria( termino )
         .subscribe( categoria => this.categorias = categoria );
   }

  borrarCategoria( categoria: Categoria ) {
        swal({
          title: '¿Esta seguro?',
          text: 'Esta a punto de borrar una Categoría ',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        })
        .then( borrar => {
          if ( borrar ) {
            this._categoriaService.borrarCategoria( categoria._id )
                .subscribe(() => this.cargarCategorias());
          }
        });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarCategorias();
  }

}

