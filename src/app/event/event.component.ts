import { Component, Input } from '@angular/core';
// import { Event } from '../event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  // @Input() event: Event= new Event();
  @Input() event: string= "";

}
