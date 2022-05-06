import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; //sirve para leer parametro que viene escrito en la ruta. ejemplo: /category/id
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

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
     this.categoryID = params.get('id');
     if (this.categoryID){
       this.productosService.getProductsByCategory(this.limit,this.offset,this.categoryID)
       .subscribe(data => {
         this.products = data;
       })
     }

    })
  }

}
