import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  constructor() { }

  private token: string = "";

  setToken(token: string) {
    console.log("setToken");
    console.log(token);
    this.token = token;
  }

  getToken() {
    console.log("getToken");
    return this.token;
  }
}
