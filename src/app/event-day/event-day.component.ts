import { Component } from '@angular/core';
import { Event, EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';
import { User} from '../user.service';
import {Output, EventEmitter} from '@angular/core';

/*
Component used to display the events of the day of the user. Uses the event component to display the events. Used in the home component
*/



@Component({
  selector: 'app-event-day',
  templateUrl: './event-day.component.html',
  styleUrls: ['./event-day.component.css']
})
export class EventDayComponent {
  @Output() reloadEvent = new EventEmitter<boolean>();  //Event used to reload the events of the day

  events: Event[] = []; //Events to display


  @Input() user: User = new User(); //User who owns the events to display

  constructor(
    private eventService: EventService,
  ) { }

  ngOnInit(): void {
    this.eventService.getTodayEventsByUserId(this.user.iduser).subscribe({  //Call the getTodayEventsByUserId function of the eventService to get the events of the day
      next: (data) => {
        this.events = data; //Set the events to display
      },
      error: (error) => {
        console.log('error');
        console.log(error);
        this.events = [];
      },
    });
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  //Function called when an event is deleted, reloads the events of the day
  reload(event : boolean){
    console.warn('reload event')
    console.warn(event)
    this.reloadEvent.emit(event);
  }
}
