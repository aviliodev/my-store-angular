import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User, CreateUserDTO } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.API_URL}/api/users`;

  constructor(private client : HttpClient) { }

  createUser(dto: CreateUserDTO){
    return this.client.post<User>(this.apiUrl,dto);
  }

  getUsersAll(){
    return this.client.get<User[]>(this.apiUrl);
  }

}
