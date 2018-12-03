import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Categoria } from '../../models/categoria.models';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { TipoCategoria } from '../../models/tipoCategoria.models';
import { TipoCategoriaService } from '../../services/service.index';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styles: []
})
export class CategoriaComponent implements OnInit {

  tipoCategorias: TipoCategoria[] = [];
  categoria: Categoria = new Categoria('', '', '');

  constructor(
    public _categoriaService: CategoriaService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _tipoCategoriaService: TipoCategoriaService
    ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarCategoria( id );
      }
    });
  }

  ngOnInit() {
    this._tipoCategoriaService.cargarTipoCategoria(null, true)
        .subscribe( tipoCategorias => this.tipoCategorias = tipoCategorias );
  }

  cargarCategoria( id: string) {
    this._categoriaService.obtenerCategoria(id)
        .subscribe( categoria => {
          this.categoria = categoria;
          this.categoria.tipoCategoria = categoria.tipoCategoria._id;
        });

  }

  guardarCategoria(f: NgForm) {
    if ( f.invalid ) {
      return;
    }

    this._categoriaService.guardarCategoria( this.categoria )
        .subscribe( categoria => {
          this.categoria = categoria;
          this.router.navigate(['/categorias']);
        });
  }

}
