import { JwtModuleOptions } from './../../node_modules/@auth0/angular-jwt/lib/angular-jwt.module.d';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


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

    ) { }

  goHome():void{
    //read id from base url
    // console.log("url")
    // console.log(this.router.url)
    let id = +this.router.url.split("=").splice(-1)
    // console.log(this.router.url.split("=").splice(-1))

    this.router.navigate(['/home'], { queryParams: { id: id} });
  }

}
