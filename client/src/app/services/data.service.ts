import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserClass } from '../class/user';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(public httpClient: HttpClient) { }

  urlUsers: string = 'http://localhost:3000/users';

  getUsers(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.urlUsers)
  }

  getOneUser(id: number): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.urlUsers}/${id}`);
  }

  createContact(user: UserClass){
    return this.httpClient.post<UserClass>(`${this.urlUsers}/create`, user);
  }

  updateContact(user: UserClass){
    return this.httpClient.put<UserClass>(`${this.urlUsers}/update/${user.id}`, user);
  }

  deleteContact(id: number){
    return this.httpClient.delete(`${this.urlUsers}/delete/${id}`);
  }

}
