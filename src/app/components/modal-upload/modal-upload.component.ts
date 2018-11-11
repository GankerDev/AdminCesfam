import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/subirArchivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: String;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
   ) {
    console.log('Modal listo');
  }

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;

    this._modalUploadService.ocultarModal();
  }

  seleccionImage( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal('Solo imágenes', 'El archivo selecionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result.toString();
  }

  subirImagen() {
    this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id )
        .then(resp => {
          this._modalUploadService.notificacion.emit( resp );
          this.cerrarModal();
        })
        .catch( err => {
          console.log('Error en la carga...');
        });
  }

}
