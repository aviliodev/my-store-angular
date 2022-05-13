import { Component, OnInit } from '@angular/core';

import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import {User} from 'src/app/models/user.model';
import {Category} from 'src/app/models/product.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];

  constructor(private authService : AuthService,
              private storeService : StoreService,
              private categoriesService : CategoriesService) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    })
    this.getAllCategories()
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  /*login(){
    this.authService.login('user1@correo.com', '12345')
    .subscribe(respuesta => {
      this.token = respuesta.access_token;
      this.getProfile();
    })
  }

  getProfile(){
    this.authService.profile(this.token)
    .subscribe(respuesta => {
      console.log(respuesta);
      this.profile = respuesta;
    })
  }

  loginAndGet(email: string, password: string){
    return this.login(email, password)
    .pipe(

    )
  }*/

  login() {
    // this.authService.login('sebas@mail.com', '1212')
    // .subscribe(rta => {
    //   this.token = rta.access_token;
    //   console.log(this.token);
    //   this.getProfile();
    // });
    this.authService.loginAndGet('user1@correo.com', '12345')
    .subscribe(user => {
      this.profile = user;
    });
  }

  getAllCategories(){
    this.categoriesService.getAll()
    .subscribe(data => {
      this.categories = data;
    });
  }

}
