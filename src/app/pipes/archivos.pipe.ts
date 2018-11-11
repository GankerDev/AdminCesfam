import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'archivos'
})
export class ArchivosPipe implements PipeTransform {

  transform(img: string, tipo: string= 'usuario'): any {

    let url = URL_SERVICIOS + '/archivos';

    if (!img) {
      return url + '/usuarios/xxx';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {
      case 'usuario':
        url += '/usuario/' + img;
      break;
      case 'funcionario':
        url += '/funcionario/' + img;
      break;
      case 'licencia-medica':
        url += '/licencia-medica/' + img;
      break;
      case 'categoria':
        url += '/categoria/' + img;
      break;

      default:
        console.log('Tipo de archivo no existe');
        url += '/usuarios/xxx';
        break;
    }
    return url;

  }

}
