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
    public router: Router ) { }

  // ngOnChanges() {
  //   // test = this.router.url
  // }

}
