import { Component } from '@angular/core';
// import { Event, EventService } from '../event.service';

@Component({
  selector: 'app-event-day',
  templateUrl: './event-day.component.html',
  styleUrls: ['./event-day.component.css']
})
export class EventDayComponent {

  // events: Event[] = [];
  events: string = "";

  constructor(
    // private eventService: EventService
  ) { }

  // ngOnInit(): void {
  //   this.eventService.getTodayEventsByUserId(1).subscribe({
  //     next: (data) => {
  //       console.warn(data)
  //       this.events = data;
  //     },
  //     error: (error) => {
  //       console.log('error');
  //       console.log(error);
  //     },
  //   });
  // }
}
