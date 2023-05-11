import { Component } from '@angular/core';
import { Event, EventService } from '../event.service';
import { User } from '../user.service';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder, FormControl } from '@angular/forms';


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
    private userService: UserService,
    private formBuilder: FormBuilder,
    // private formControl: FormControl
  ) { }

  //form to select date
  dateForm = this.formBuilder.group({
    date: new FormControl<Date>(new Date(), {nonNullable: true})
  });



  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.warn('params[] home')
      console.warn(params['id'])
      this.userService.getUserById(params['id']).subscribe({
        next: (data) => {
          this.user = data;
          console.warn('user');
          console.warn(typeof data);
          this.active = true;
          // this.getEvents(this.user.iduser);
        },
        error: (error) => {
          console.log('error');
          console.log(error);}
          });
    }
    );
  }

  onSubmit(): void {
    this.getEvents();
  }

  getEvents(): void {
    // console.warn('getEvents()');
    // console.warn(this.dateForm.value.date);
    
    let date = this.dateForm.value.date!;
    // console.warn(date.toString().replaceAll('-',''));
    this.eventService.getEventsByDate(this.user.iduser,date).subscribe({

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
