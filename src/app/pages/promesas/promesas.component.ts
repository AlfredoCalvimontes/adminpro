import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres().then(
        // () => console.log('Termino')
        mensaje => console.log('Termino,', mensaje)
      )
      .catch( error => console.error('Error en la promesa', error));

   }

  ngOnInit(): void {
  }

  contarTres(): Promise<boolean> {

    return new Promise( (resolve, rejects) => {

      let contador = 0;

      let intervalo = setInterval( () => {

        contador += 1;

        if ( contador === 3 ) {
          resolve(true);  // manda el texto a mensaje o en este caso booleano
          // rejects('Acabo');  // manda un mensaje de error
          clearInterval(intervalo);
        }

      }, 1000 );

    } );

  }

}
