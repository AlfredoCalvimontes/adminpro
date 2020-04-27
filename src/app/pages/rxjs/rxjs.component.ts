import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/observable';
import { retry, map, filter } from 'rxjs/internal/operators';
import { Subscriber } from 'rxjs/internal/Subscriber';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    // El retry hace que se reanude cuando hay algun error. Si llega al complete() se acaba y listo.
      // Intentara las veces puestas en retry(2), la primera es normal, luego viene el nro de intentos.
      // De no tener un nro lo hara indefinidamente.
      // De no cortarse con clearInterval() al producirse un error retry hace que reintenta y si lo logra
      // se retoma desde donde estaban los datos y el proceso sigue con nomalidad.
    this.regresoObservable().pipe(
      retry(2)
    )
    .subscribe(
      numero => console.log( 'Subs', numero),  // aqui llega el next
      error => console.log('Error en el obs:', error),  // aqui el error
      () => console.log('El obs termino')  // aqui llega del complete
    );

    this.subscription = this.regresoObservable2()
    .subscribe(
      numero => console.log( '2 Subs', numero),  // aqui llega el next
      error => console.log('2 Error en el obs:', error),  // aqui el error
      () => console.log('2 El obs termino')  // aqui llega del complete
    );

   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('Cerrando');
    this.subscription.unsubscribe();
  }

  regresoObservable(): Observable<number /*| string*/> {
    return new Observable( observer => {

      let contador = 0;

      let intervalo = setInterval( () => {

        contador ++;

        observer.next( contador );

        if ( contador === 3 ) {
          clearInterval( intervalo );
          observer.complete();
        }

        if ( contador === 2 ) {
          // clearInterval( intervalo );
          observer.error( 'Es un 2' );
        }

      }, 1000 );

    });

  }

  regresoObservable2(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      let intervalo = setInterval( () => {

        contador++;

        const salida = {
          valor: contador
        };

        observer.next( salida );

        // if ( contador === 3 ) {
        //    clearInterval( intervalo );
        //    observer.complete();
        //  }

        // if ( contador === 2 ) {
        //   // clearInterval( intervalo );
        //   observer.error( 'Es un 2' );
        // }

      }, 1000 );

    }).pipe( map( resp => resp.valor),  // se pueden colocar varios maps y filters
      filter( (valor, index) => {

        if ( (valor % 2) === 1 ) {
          return true;
        } else {
          return false;
        }

      })
    );

  }

}
