import { Component, OnInit } from '@angular/core';
import { TipoCategoria } from '../../models/tipoCategoria.models';
import { TipoCategoriaService } from '../../services/tipoCategoria/tipo-categoria.service';

declare var swal: any;

@Component({
  selector: 'app-tipo-categoria',
  templateUrl: './tipo-categoria.component.html',
  styles: []
})
export class TipoCategoriaComponent implements OnInit {

  tipoCategorias: TipoCategoria[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;


  constructor(
    public _tipoCategoriaService: TipoCategoriaService
  ) { }

  ngOnInit() {
    this.cargarTipoCategoria();
  }

  cargarTipoCategoria() {
    this.cargando = true;

    this._tipoCategoriaService.cargarTipoCategoria(this.desde, false)
        .subscribe( (tipoCategorias: any) => {
          this.totalRegistros = this._tipoCategoriaService.totalTipoCategoria;
          this.tipoCategorias = tipoCategorias;
          this.cargando = false;
        });

  }

  buscarTipoCategoria( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarTipoCategoria();
      return;
    }

    this.cargando = true;

    this._tipoCategoriaService.buscarTipoCategoria( termino )
        .subscribe( tipoCategoria => {
          this.cargando = false;
          this.tipoCategorias = tipoCategoria;
        });
  }

  guardarTipoCategoria( tipoCategoria: TipoCategoria ) {
    this._tipoCategoriaService.actualizarTipoCategoria( tipoCategoria )
        .subscribe();
  }

  borrarTipoCategoria( tipoCategoria: TipoCategoria ) {
        swal({
          title: '¿Esta seguro?',
          text: 'Esta a punto de borrar el tipo de categoría ' + tipoCategoria.nivel,
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        })
        .then( borrar => {
          if ( borrar ) {
            this._tipoCategoriaService.borrarTipoCategoria( tipoCategoria._id )
                .subscribe(() => this.cargarTipoCategoria());
          }
        });
  }

  crearTipoCategoria() {
    swal({
      title: 'Crear tipo de categoría',
      text: 'Ingrese el nombre del tipo de categoría',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true,
    }).then( (valor: string) => {
      if (!valor || valor.length === 0) {
        return;
      }

      this._tipoCategoriaService.crearTipoCategoria(valor)
          .subscribe(() => this.cargarTipoCategoria());
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
    this.cargarTipoCategoria();
  }
}
