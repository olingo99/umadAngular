import { Component } from '@angular/core';
import { User} from '../user.service';
import {Input} from '@angular/core';
import { FriendsService} from '../friends.service';
import { Router } from '@angular/router';

/*
Component used to display the list of friends suggeestions. Used to add friends
*/


@Component({
  selector: 'app-dropdownuserlist',
  templateUrl: './dropdownuserlist.component.html',
  styleUrls: ['./dropdownuserlist.component.css']
})
export class DropdownuserlistComponent {
  @Input() users: User[] = [];      //List of users to display
  @Input() user: User = new User(); //User to add friends to

  constructor(
    private friendsService: FriendsService,
    private router: Router,
  ){}

  //Function called when the add friend button is clicked, calls the addFriend function of the friendsService
  addFriend(friend: User): void {
    this.friendsService.addFriend(this.user.iduser, friend.Name).subscribe({
      next : (data) => {
        this.router.navigate(['home'], { queryParams: { id: this.user.iduser } } );
      },
      error : (error) => {
        console.log(error);
      }
  });
  }
}
