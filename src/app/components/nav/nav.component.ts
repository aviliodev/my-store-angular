import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {User} from 'src/app/models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  token = '';
  profile: User | null = null;

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login(){
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

}
