
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthTokenService } from './auth-token.service';

/*
First component loaded when the app is launched, contains the top bar and the router-outlet, the top bar is hidden in the login page
*/


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'umadAngularfeur';

  constructor(
    public router: Router,
    private authTokenService: AuthTokenService
    ) { }


  //Called when the user click on the home button, redirect to the home page
  goHome():void{
    let id = +this.authTokenService.getConnectedUser();
    this.router.navigate(['/home'], { queryParams: { id: id} });
  }

  //Called when the user click on the disconnect button, remove the token and redirect to the login page
  disconnect():void{
    this.authTokenService.removeToken();
    this.authTokenService.removeConnectedUser();
    this.router.navigate(['/login']);
  }

}
