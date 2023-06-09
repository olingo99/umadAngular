import { Component } from '@angular/core';
import { User, UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { Category, CategoryService } from '../category.service';

/*
Component for the page dispaleying the event creation. Contains the category list component, the template list component and the event day component
*/




@Component({
  selector: 'app-event-creation-page',
  templateUrl: './event-creation-page.component.html',
  styleUrls: ['./event-creation-page.component.css']
})
export class EventCreationPageComponent {

  user: User = new User();  //User for who we want to create an event
  category: Category = new Category();  //Category of the event to create
  active: boolean = false;  //Boolean used to know if the user is loaded

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {  //Get the id of the user from the url
      this.userService.getUserById(params['id']).subscribe({  //Call the getUserById function of the userService
        next: (data) => {   
          this.user = data; //Set the user to display
          this.active = true;  //Set the user as loaded, displaying the components
        },
        error: (error) => {
          console.log('error');
          console.log(error);
        },
      });
    }
    );
  }

  onCategoryChange(category: Category): void {  //Called when the category is changed, event emitted by the category list component
    this.category = category; //Set the category
  }

  onRefreshEvent(res: boolean): void {  //Called when the event is created, event emitted by the event day component
    this.ngOnInit();
  }

}
