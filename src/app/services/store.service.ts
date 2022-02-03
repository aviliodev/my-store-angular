import { Injectable } from '@angular/core';
import {Product} from "../models/product.model"

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private myShoppingCart: Product[] = [];
  total = 0;
  constructor() { }

  addProduct(elproducto: Product) {
    this.myShoppingCart.push(elproducto);
  }

  getTotal(){
    this.total = this.myShoppingCart.reduce((sum, item) => sum + item.price, 0); /*esta función o método para sumar con reduce el precio de los items, es propia de javascript y manejo de arreglos*/
    return this.total;
  }

  getShoppingCart(){
    return this.myShoppingCart;
  }

}
