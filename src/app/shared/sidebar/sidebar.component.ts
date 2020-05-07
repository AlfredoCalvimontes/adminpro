import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/shared/sidebar.service';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  // asd = [1, 2, 3];

  constructor( public _sidebar: SidebarService,
               public _usuarioService: UsuarioService ) { }

  ngOnInit(): void {
  }

}
