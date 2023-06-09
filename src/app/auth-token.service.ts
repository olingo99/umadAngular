import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  constructor() { sessionStorage.setItem('token', "");}

  private token: string = "";
  private connectedUser: number = 0;
  

  setToken(token: string) {
    console.log("setToken");
    console.log(token);
    // this.token = token;
    sessionStorage.setItem('token', token);
  }

  setConnectedUser(id: number) {
    console.log("setConnectedUser");
    console.log(id);
    sessionStorage.setItem('connectedUser', id.toString());
  }

  getToken() {
    console.log("getToken");
    // return this.token;
    return sessionStorage.getItem('token')!;
  }

  getConnectedUser() {
    console.log("getConnectedUser");
    // return this.connectedUser;
    return sessionStorage.getItem('connectedUser')!;
  }



  removeToken() {
    console.log("removeToken");
    // this.token = "";
    sessionStorage.removeItem('token');
  }


  removeConnectedUser() {
    console.log("removeConnectedUser");
    // this.connectedUser = 0;
    sessionStorage.removeItem('connectedUser');
  }
}
