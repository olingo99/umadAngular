import { Component } from '@angular/core';
import { Event, EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';
import { User} from '../user.service';
import {Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-event-day',
  templateUrl: './event-day.component.html',
  styleUrls: ['./event-day.component.css']
})
export class EventDayComponent {
  @Output() reloadEvent = new EventEmitter<boolean>();

  events: Event[] = [];
  // events: string = "";

  @Input() user: User = new User();

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.eventService.getTodayEventsByUserId(this.user.iduser).subscribe({
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

  ngOnChanges() {
    console.warn("user component")
    this.ngOnInit();
  }

  reload(event : boolean){
    console.warn('reload event')
    console.warn(event)
    this.reloadEvent.emit(event);
    // this.ngOnInit();
  }
}
