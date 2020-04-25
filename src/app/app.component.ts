import { Component } from '@angular/core';
import { SettingsService } from './services/settings/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adminpro';

  constructor( public _ajustes: SettingsService ) {}  //  Con cargar los ajustes aqui ya se carga
                                                      //  el cosntructor del servicio y este puede establecer el tema 

}
