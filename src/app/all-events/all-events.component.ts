import { Component } from '@angular/core';
import { Event, EventService } from '../event.service';
import { User } from '../user.service';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent {

  events: Event[] = [];
  user: User = new User();
  active: boolean = false;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }



  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.warn('params[] home')
      console.warn(params['id'])
      this.userService.getUserById(params['id']).subscribe({
        next: (data) => {
          this.user = data;
          console.warn('user');
          console.warn(typeof data);
          this.getEvents(this.user.iduser);
        },
        error: (error) => {
          console.log('error');
          console.log(error);}
          });
    }
    );
  }


  getEvents(id:number): void {
    this.eventService.getTodayEventsByUserId(id).subscribe({
      next: (data) => {
        console.warn(data)
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
