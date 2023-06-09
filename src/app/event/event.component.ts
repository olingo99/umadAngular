import { Component, Input,Output, EventEmitter } from '@angular/core';
import { Event } from '../event.service';
import { CategoryService, Category } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.service';
import { EventService } from '../event.service';
import { AuthTokenService } from '../auth-token.service';
import { Router } from '@angular/router';

/*
Component used to display an event. Used in the event day component
*/

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  @Input() event: Event = new Event();  //Event to display
  @Input() user: User = new User(); //User who owns the event
  @Output() deleteEventEvent = new EventEmitter<boolean>(); //Event used to notify the event day component that an event has been deleted
  @Input() friend: boolean = false; //Boolean used to know if the event is displayed in the friend list

  deleteVisible: boolean = false; //Boolean used to know if the delete button is visible
  category: Category = new Category();  //Category of the event

  constructor(
    private categoryService: CategoryService,
    private eventService: EventService,
    private authTokenService: AuthTokenService,
  ) { }

  ngOnInit(): void {
    this.deleteVisible = (+this.authTokenService.getConnectedUser() == this.user.iduser) && !this.friend; //Set the delete button visible if the user is the owner of the event and if the event is not displayed in the friend list

    this.categoryService.getCategoryById(this.user.iduser, this.event.idcategory).subscribe({ //Call the getCategoryById function of the categoryService to get the category of the event
      next: (data) => {
        this.category = data;
      },
      error: (error) => {
        console.log('error');
        console.log(error);
        this.category = new Category();
      },
    });
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  getColor(weight: number): string {  //Function used to get the color of the event's weight depending on its value
    return weight > 0 ? "green" : "red";
  }

  //Function called when the delete button is clicked, deletes the event
  deleteEvent() {
    this.eventService.deleteEventById(this.user.iduser, this.event.idevent).subscribe({
      next: (data) => {
        this.deleteEventEvent.emit(true);
      },
      error: (error) => {
        this.deleteEventEvent.emit(false);
      },
    });
  }
}
