import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService ){}

  buscar() {
    const val = this.txtBuscar.nativeElement.value;

    this.gifsService.buscarGifs( val );

    this.txtBuscar.nativeElement.value = '';
    
  }

}
