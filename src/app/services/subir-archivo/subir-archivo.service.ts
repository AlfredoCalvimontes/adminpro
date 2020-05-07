import { Injectable } from '@angular/core';
import { resolve } from 'dns';
import { rejects } from 'assert';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo: File, tipo: string, id: string) {

    return new Promise ( (resolve, reject) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append( 'imagen', archivo, archivo.name );
        //  'imagen' es en nombre del parametro que pide el PUT.

      xhr.onreadystatechange = function() {

        if ( xhr.readyState === 4 ) {  // el 4 en un estado, es cuando acaba. Otros nros son otros estados. 

          if ( xhr.status === 200 ) {

            console.log('Imagen subida');
            resolve( JSON.parse( xhr.response ) );

          } else {

            console.log('Fallo la subida');
            reject( xhr.response );

          }
        }

      };

      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send( formData );

    } );


  }

}
