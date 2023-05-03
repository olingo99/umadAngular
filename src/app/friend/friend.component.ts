import { Component } from '@angular/core';
import {Input} from '@angular/core';
import { User } from '../user.service';
import { Event, EventService } from '../event.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent {
  @Input() friend: User = new User();
  event: Event = new Event();

  imageSource: string = "assets/images/happy.png";

  constructor(
    private eventService: EventService
  ) { }


  ngOnInit() {
    this.imageSource = this.getSourceImage(this.friend.Mood);
    // this.eventService.getLastEventsByUserId(this.friend.iduser).subscribe({
    //   next : (data) => {
    //     console.warn(data);
    //     this.event = data;
    //   },
    //   error : (error) => {
    //     console.log(error);
    //   }
    // });

  }

  friendClick() {
    console.warn("friend click");
  }

  getSourceImage(mood: number): string {
    if (mood <-90){
      return "assets/images/verryHappy.png";
    }
    if (mood <=0){
      return "assets/images/happy.png";
    }
    return `assets/images/sad${Math.ceil(mood/14)}.png`;
  }
}
