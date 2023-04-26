import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export class User {
  'iduser': number;
  'Name': string;
  'passWord': string;
  'Mood': number;
  'Admin': boolean;
  'token': string;
  'maxAge': number;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl : string = 'http://localhost:3000';

  constructor(private http : HttpClient) { }

  tryLogin(Name:string, passWord: string): Observable<User> {
    return this.http.post<User>(this.baseUrl+'/login', {Name, passWord});
  }

  checkUserName(Name: string): Observable<User> {
    // let params = new HttpParams().set("Name","Namezaerez"); //Create new HttpParams
    console.warn(this.baseUrl+`/user/name/${Name}`);
    return this.http.get<User>(this.baseUrl+`/user/name/${Name}`);
  }

  addUser(Name: string, passWord: string): Observable<User> {
    return this.http.post<User>(this.baseUrl+'/user', {Name, passWord});
  }
  
}
  