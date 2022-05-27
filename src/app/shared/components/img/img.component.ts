import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() img : string = '';
  @Output() loaded = new EventEmitter<string>(); //le decimos al eventemitter que mandará strings (puede ser cualquier otra cosa si lo definimos asi), en este caso el string img.
  imgDefault : string = 'https://www.m2crowd.com/core/i/placeholder.png';

  /*counter = 0;
  counterFn : number | undefined; //no le asignamos valor, solo especificamos el tipo de variable: number o indefinido.*/

  constructor() {
    //Todo lo que se corra aqui dentro se hace solo una vez, y antes dle render
    //NO async - once time
    console.log('constructor', 'imngValue =>', this.img)
  }

  ngOnChanges() {
    //antes y durante render
    //changes inputs -- many times
    console.log('ngOnChanges', 'imngValue =>', this.img)
  }

  ngOnInit(): void {
    //before render
    // SI async - fetch -- once time
    console.log('ngOnInit', 'imngValue =>', this.img)

    /*this.counterFn =  window.setInterval(() => {
      this.counter += 1
      console.log('corre el contador')
    }, 1000)*/

  }

  ngAfterViewInit(): void {
    //after render
    //handler children
    console.log('ngOnInit')
  }

  ngOnDestroy(): void {
    // delete
    console.log('ngOnDestroy')
    /*window.clearInterval(this.counterFn); //Detenemos el counter que se creó en el ngOnInit.*/
  }

  imgError() {
    this.img = this.imgDefault;
  }

  imgLoaded() {
    console.log('Imagen cargada correctamente hijo');
    this.loaded.emit(this.img); //envia la imagen "img" con nuestra variable de output "loaded" que es una instancia de EventEmitter. (ver linea 11)
  }


}
