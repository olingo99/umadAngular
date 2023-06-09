import { Component } from '@angular/core';
import { Event, EventService } from '../event.service';
import { User } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder, FormControl } from '@angular/forms';

/*
Component used to display all the events of a user's day where you can select the date. Uses the event component to display the events.
*/


@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent {

  events: Event[] = []; //Events to display
  user: User = new User();  //User to whom the events belong
  active: boolean = false;  //Boolean used to know if the user is loaded

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) { }

  //form to select date
  dateForm = this.formBuilder.group({
    date: new FormControl<Date>(new Date(), {nonNullable: true})
  });


  
  ngOnInit(): void {  
    this.route.queryParams.subscribe((params) => {  //Get the id of the user from the url
      this.userService.getUserById(params['id']).subscribe({
        next: (data) => {
          this.user = data;
          this.active = true;  //Set the user as loaded, displaying the components
        },
        error: (error) => {
          console.log('error');
          console.log(error);}
          });
    }
    );
  }

  //Called when the user clicks on the submit button
  onSubmit(): void {
    this.getEvents();
  }

  //Called when the user choosses the date, gets the events of the day
  getEvents(): void {    
    let date = this.dateForm.value.date!;
    this.eventService.getEventsByDate(this.user.iduser,date).subscribe({
      next: (data) => {
        this.events = data;
        this.active = true;
      },
      error: (error) => {
        console.log('error');
        console.log(error);
        this.events = [];
        this.active = true;
      },
    });
  }
}
