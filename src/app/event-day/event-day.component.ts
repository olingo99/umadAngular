import { Component } from '@angular/core';
import { Event, EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';
import { User} from '../user.service';

@Component({
  selector: 'app-event-day',
  templateUrl: './event-day.component.html',
  styleUrls: ['./event-day.component.css']
})
export class EventDayComponent {

  events: Event[] = [];
  // events: string = "";

  @Input() user: User = new User();

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    // this.route.params.subscribe((params) => {
    //   console.warn('params[]')
    //   console.warn(params['id'])
    //   this.eventService.getTodayEventsByUserId(params['id']).subscribe({
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
    // );

    // this.route.queryParams.subscribe((params) => {
    //   this.userService.getUserById(params['id']).subscribe({
    //     next: (data) => {
    //       this.user = data;
    //       console.warn('user');
    //       console.warn(typeof data);
    //       this.active = true;
    //     },
    //     error: (error) => {
    //       console.log('error');
    //       console.log(error);
    //     },
    //   });
    // }
    // );



    this.eventService.getTodayEventsByUserId(this.user.iduser).subscribe({
      next: (data) => {
        console.warn(data)
        this.events = data;
      },
      error: (error) => {
        console.log('error');
        console.log(error);
      },
    });
  }
}