import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; //sirve para leer parametro que viene escrito en la ruta. ejemplo: /category/id
import { switchMap } from 'rxjs';
import { ProductosService } from 'src/app/services/productos.service';
import {Product} from "../../models/product.model";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryID: string | null = null;
  products : Product[] = [];
  limit = 10;
  offset = 0;

  constructor( private route : ActivatedRoute,
                private productosService: ProductosService)
    {

    }

/*ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
     this.categoryID = params.get('id');
     if (this.categoryID){
       this.productosService.getProductsByCategory(this.limit,this.offset,this.categoryID)
       .subscribe(data => {
         this.products = data;
       })
     }
    })
  }*/

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.categoryID = params.get('id');
        if (this.categoryID){
          return this.productosService.getProductsByCategory(this.limit,this.offset,this.categoryID);
        }
        return [];//si el return dentro del if no devuelve nada, entonces este return devuelve vacio.
      })
    )
    .subscribe(data => {
      this.products = data;
    });
  }

  onLoadMore() {
    if (this.categoryID) {
      this.productosService
        .getProductsByCategory(this.limit, this.offset,this.categoryID)
        .subscribe((data) => {
          this.products = this.products.concat(data);
          this.offset += this.limit;
        });
    }
  }

}
