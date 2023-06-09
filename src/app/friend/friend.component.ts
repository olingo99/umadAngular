import { Component } from '@angular/core';
import {Input} from '@angular/core';
import { User, UserService } from '../user.service';
import { Event, EventService } from '../event.service';
import { Router } from '@angular/router';

/*
Component used to display a friend in the friend list component. Uses the event component to display the last event of the friend
*/


@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent {
  @Input() friend: User = new User(); //User to display
  event: Event = new Event(); //Last event of the user
  active: boolean = false;  //Boolean used to know if the user is loaded

  imageSource: string = "assets/images/happy.png";  //Image source

  constructor(
    private eventService: EventService,
    private router: Router,
    private userService: UserService
  ) { }


  ngOnInit() {
    this.imageSource = this.userService.getSourceImage(this.friend.Mood); //Set the image source depending on the mood of the user
    this.eventService.getLastEventsByUserId(this.friend.iduser).subscribe({ //Call the getLastEventsByUserId function of the eventService
      next : (data) => {  //Get the last event of the user
        this.event = data[0]; //Set the event to display, the last event function returns an array of 1 event
        this.active = true;
      },
      error : (error) => {
        this.event = new Event();
        this.active = true;
      }
    });

  }

  ngOnChanges() {
    this.ngOnInit();
  }

  //Function called when the user clicks on a friend, redirects to the home page of the friend
  friendClick() {
    this.router.navigate(['/home'], { queryParams: { id: this.friend.iduser } });
  }


}
