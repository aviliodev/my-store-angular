import { Component, OnInit, Input } from '@angular/core';
import {Product} from '../../models/product.model'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  //Debemos mandarle algo por default al Input, si no nos marcará error, pro eso se definen valores por defecto para cada propiedad de Product.
  @Input() product : Product = {
    id: '',
    name: '',
    image: '',
    price: 0
  }

  // Nota: también sería válido lo siguiente:
  //@Input() product! : Product;
  //con el signo de exclamación le decimos a Angular (o Typescript) que la propiedad product si va a existir, que no puede ser nula.

  constructor() { }

  ngOnInit(): void {
  }

}
