
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthTokenService } from './auth-token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'umadAngularfeur';

  displayTopBar=false;
  // test = ;

  constructor(
    public router: Router,
    private authTokenService: AuthTokenService

    ) { }

  goHome():void{
    //read id from base url
    console.log("url go home")
    // console.log(this.router.url)
    // let id = +this.router.url.split("=").splice(-1)
    // console.log(this.router.url.split("=").splice(-1))
    let id = +this.authTokenService.getConnectedUser();
    console.log(id);
    this.router.navigate(['/home'], { queryParams: { id: id} });
  }

  disconnect():void{
    this.authTokenService.removeToken();
    this.router.navigate(['/login']);
  }

}
