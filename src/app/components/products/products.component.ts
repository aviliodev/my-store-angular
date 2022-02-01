import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product.model"

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  total = 0;

  products: Product[] = [
    {
      id: '1',
      name: 'EL mejor juguete',
      price: 565,
      image: '../assets/images/toy.jpg'
    },
    {
      id: '2',
      name: 'Bicicleta casi nueva',
      price: 356,
      image: '../assets/images/bike.jpg'
    },
    {
      id: '3',
      name: 'Colleción de albumes',
      price: 34,
      image: '../assets/images/album.jpg'
    },
    {
      id: '4',
      name: 'Mis libros',
      price: 23,
      image: '../assets/images/books.jpg'
    },
    {
      id: '5',
      name: 'Casita michi',
      price: 125,
      image: '../assets/images/house.jpg'
    },
    {
      id: '6',
      name: 'Lentes vintage',
      price: 82,
      image: '../assets/images/glasses.jpg'
    },
  ];

  myShoppingCart: Product[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onAddToShoppingCart(elproducto: Product) {
    this.myShoppingCart.push(elproducto);
    this.total = this.myShoppingCart.reduce((sum, item) => sum + item.price, 0); /*esta función o método para sumar con reduce el precio de los items, es propia de javascript y manejo de arreglos*/
  }

}
