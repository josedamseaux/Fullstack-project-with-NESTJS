import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/usersinterface';
import { PayInterface } from '../interfaces/payinterface';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  
  public approvalStageMessage = new BehaviorSubject<boolean>(true);

  constructor(public httpClient: HttpClient) { }

  urlUsers: string = 'http://localhost:3000/users';

  updateApprovalMessage(message: boolean) {
  this.approvalStageMessage.next(message)

  }


  getPayments(): Observable<any[]>{
    return this.httpClient.get<any[]>('http://localhost:3000/joined')
  }

  createPayment(pay: any){
    return this.httpClient.post<User>(`http://localhost:3000/createpayment`, pay);
  }

  getUsers(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.urlUsers)
  }

  getOneUser(id: number): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.urlUsers}/${id}`);
  }

  createContact(user: User){
    return this.httpClient.post<User>(`${this.urlUsers}/create`, user);
  }

  updateContact(user: User){
    return this.httpClient.put<User>(`${this.urlUsers}/update/${user.id}`, user);
  }

  deleteContact(id: number){
    return this.httpClient.delete(`${this.urlUsers}/delete/${id}`);
  }

}
