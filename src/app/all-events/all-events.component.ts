import { Component } from '@angular/core';
import { Event, EventService } from '../event.service';
import { User } from '../user.service';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent {

  events: Event[] = [];
  userId: number = 0;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) { }



  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.warn('params[] home')
      console.warn(params['id'])
      this.userId = params['id'];
        });
    } 

  getEvents(id:number): void {
    this.eventService.getTodayEventsByUserId(id).subscribe({
      next: (data) => {
        console.warn(data)
        this.events = data;
      },
      error: (error) => {
        console.log('error');
        console.log(error);
        this.events = [];
      },
    });
  }
}
