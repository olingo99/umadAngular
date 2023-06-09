import { Component } from '@angular/core';
import { User, UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

/*
Component used to handle the home page, gets the user from the userService and displays 3 components, the user component, the event-day component and the friend list component
*/



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user: User = new User();  //User to display
  active: boolean = false;  //Boolean used to know if the user is loaded

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {  //Get the id of the user from the url
      this.userService.getUserById(params['id']).subscribe({  //Call the getUserById function of the userService
        next: (data) => {
          this.user = data; //Set the user to display
          this.active = true;   //Set the user as loaded, displaying the components
        },
        error: (error) => {
          console.log('error');
          console.log(error);
        },
      });
    }
    );
  }

  ngOnChanges() { //Called when the user is changed
    this.ngOnInit();
  }

  
}
