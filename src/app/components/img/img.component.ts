import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {

  @Input() img : string = '';
  @Output() loaded = new EventEmitter<string>(); //le decimos al eventemitter que mandará strings (puede ser cualquier otra cosa si lo definimos asi), en este caso el string img.
  imgDefault : string = 'https://www.m2crowd.com/core/i/placeholder.png';

  constructor() { }

  ngOnInit(): void {
  }

  imgError() {
    this.img = this.imgDefault;
  }

  imgLoaded() {
    console.log('Imagen cargada correctamente hijo');
    this.loaded.emit(this.img); //envia la imagen "img" con nuestra variable de output "loaded" que es una instancia de EventEmitter. (ver linea 11)
  }

}
