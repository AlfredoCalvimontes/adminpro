import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input('nombre') leyenda = 'Leyenda';
  // Al colocar otro nombre en el Input, se coloca el nombre de elemento de
  // etiqueta de la variable, el como sera nombrada al usarse en una etiqueta.
  // Pero aun se usara dentro del .ts con el nombre puesto de la variable.
  @Input() progreso = 50;

  onChanges( newValu: number ) {

    // let elemHTML: any = document.getElementsByName('progreso')[0];
    //  Para encontrar un elemento especifico dentro del html, pero, siendo por ejemplo
    //  un componente llamado dos veces o si hay mas elementos con ese nombre de los que 
    //  quieres manejar, solo agarrara uno, para eso es  ViewChild

    if ( newValu >= 100 ) {
      newValu = 100;
    } else if ( newValu <= 0 ) {
      newValu = 0;
    }

    this.progreso = newValu;
    // elemHTML.value = Number( this.progreso ); igual funciona
    // elemHTML.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit( this.progreso );

  }

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    console.log('Leyenda', this.leyenda);
    console.log('Progreso', this.progreso);
    // Aqui aun se usa el valor por defecto de las variables
  }

  ngOnInit(): void {
    // En caso de ser variables con Input, aqui es donde se vera su valor recibido.
  }

  cambiarValor( valor: number ) {

    this.progreso += valor;

    if ( this.progreso > 100 || this.progreso < 0 ) {
      this.progreso -= valor;
    }

    this.cambioValor.emit( this.progreso );

    this.txtProgress.nativeElement.focus();

  }

}
