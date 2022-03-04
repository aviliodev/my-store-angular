import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Product} from "../models/product.model"

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private myShoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);
  total = 0;

  myCart$ = this.myCart.asObservable();

  constructor() { }

  addProduct(elproducto: Product) {
    this.myShoppingCart.push(elproducto);
    this.myCart.next(this.myShoppingCart);
  }

  getTotal(){
    this.total = this.myShoppingCart.reduce((sum, item) => sum + item.price, 0); /*esta función o método para sumar con reduce el precio de los items, es propia de javascript y manejo de arreglos*/
    return this.total;
  }

  getShoppingCart(){
    return this.myShoppingCart;
  }

}
