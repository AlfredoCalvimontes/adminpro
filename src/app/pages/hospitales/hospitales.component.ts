import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from 'src/models/hospital.model';
import { ModalUploadService } from '../../componentes/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';
import { URL_SERVICIOS } from '../../config/config';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;

  cargando: boolean = true;

  constructor( public _hospitalService: HospitalService,
               public _modalUploadService: ModalUploadService ) { }

  ngOnInit(): void {

    this.cargarHospitales();
    this._modalUploadService.notificacion
        .subscribe( () => this.cargarHospitales() ) ;

  }

  mostrarModal( id: string ) {

    this._modalUploadService.mostrarModal( 'hospitales', id );

  }

  cargarHospitales() {

    this.cargando = true;

    this._hospitalService.cargarHospitales( this.desde )
          .subscribe( (hospitales: Hospital[]) => {

            this.hospitales = hospitales;
            this.cargando = false;

          } );

  }
  
  borrarHospital( hospital: Hospital ) {

    Swal.fire({
      title: '¿Estas seguro',
      text: 'Está a punto de borrar el hospital ' + hospital.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => {

      if (result.value) {

        this._hospitalService.borrarHospital( hospital._id )
              .subscribe( borrado => {
                console.log( borrado );
                this.cargarHospitales();
              } );

      } else {
        console.log(result.value + ' no borrar');
      }

    });

  }

  guardarHospital( hospital: Hospital, nombre: string ) {

    hospital.nombre = nombre;

    this._hospitalService.actualizarHospital( hospital )
        .subscribe();

  }


  cambiarDesde( valor: number ) {

    let desde = this.desde + valor;

    if ( desde >= this._hospitalService.totalHospitales ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();

  }

  crearHospital() {

    Swal.fire({
      title: 'Nuevo Hospital',
      text: 'Ingrese el nombre del Hospital',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (!result.value || result.value.length === 0) {
        return;
      }

      this._hospitalService.crearHospital( result.value )
        .subscribe( () => this.cargarHospitales() );

    });

  }

  buscarHospital( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this._hospitalService.buscarHospitales( termino )
          .subscribe( (hospitales: Hospital[]) => {

            this.hospitales = hospitales;
            this.cargando = false;

          } );

  }

}
