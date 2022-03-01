import { Component } from '@angular/core';
import { Product } from './models/product.model';

import { UsersService } from './services/users.service';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  imgParent = '';
  showImg = true;

constructor(
  private userService: UsersService,
  private authService: AuthService)
  {

  }

  onLoaded(img: string) {
    console.log('Padre. url de imagen hijo: ', img);
  }

  toggleImg() {
    this.showImg = !this.showImg; //cambia el estado de true a false y viceversa.
  }

  createUser(){
    this.userService.createUser({email: 'user1@correo.com', password:'12345',name:'User1'})
    .subscribe(respuesta => {
      console.log(respuesta);
    })
  }

  login(){
    this.authService.login('user1@correo.com', '12345')
    .subscribe(respuesta => {
      console.log(respuesta);
    })
  }


}

