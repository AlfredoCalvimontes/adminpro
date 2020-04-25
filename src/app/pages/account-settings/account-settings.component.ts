import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';
// import { link } from 'fs';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  constructor( public _ajustes: SettingsService ) { 
    // this.colocarCheck();
  }

  ngOnInit(): void {
    this.colocarCheck();
  }

  cambiarColor( tema: string, link: any ) {

    this.aplicarCheck(link);
    this._ajustes.aplicarTema( tema );

  }

  aplicarCheck( link: any  ) {

    let selectores: any = document.getElementsByClassName('selector');

    for ( let ref of selectores ) {
      ref.classList.remove('working');
    }

    link.classList.add('working');

  }

  colocarCheck( ) {

    const selectores = Array.from(document.getElementsByClassName('selector'));

    const tema = this._ajustes.ajustes.tema;

    for ( const ref of selectores ) {
      if ( ref.getAttribute('data-theme') === tema ) {
        ref.classList.add('working');
        break;
      }
    }

  }

}
