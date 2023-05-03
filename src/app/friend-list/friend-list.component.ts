import { Component } from '@angular/core';
import { User} from '../user.service';
import {Input} from '@angular/core';
import { FriendsService } from '../friends.service';


@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent {
  // friends: string[] = ["friend1", "friend2", "friend3"];
  @Input() user: User = new User();
  test = new User();
  friends: User[] = [this.test];

  constructor(
    private friendsService: FriendsService
  ) { }

  ngOnInit() {
    this.friendsService.getFriends(this.user.iduser).subscribe({
      next : (data) => {
        console.warn(data);
        this.friends = data;
      },
      error : (error) => {
        console.log(error);
      }
    }
    );
  }
}
