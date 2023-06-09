
import { Component } from '@angular/core';
import { User} from '../user.service';
import {Input} from '@angular/core';
import { FriendsService, FriendMap } from '../friends.service';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dropdownuserlist',
  templateUrl: './dropdownuserlist.component.html',
  styleUrls: ['./dropdownuserlist.component.css']
})
export class DropdownuserlistComponent {
  @Input() users: User[] = [];
  @Input() user: User = new User();

  constructor(
    private friendsService: FriendsService,
    private router: Router,
  ){}

  // ngOnInit() {
  //   console.warn("dropdown user list init");
  //   console.warn(this.users);
  // }

  // ngOnChanges(){
  //   console.warn("dropdown user list changed");
  //   console.warn(this.users);
  //   this.ngOnInit();
  //   this.active = true;
  // }

  addFriend(friend: User): void {
    console.warn("adding friend");
    console.warn(friend);
    console.warn(friend.Name);
    this.friendsService.addFriend(this.user.iduser, friend.Name).subscribe({
      next : (data) => {
        console.warn("friend added");
        console.warn(data);
        this.router.navigate(['home'], { queryParams: { id: this.user.iduser } } );
        // this.active = true;
      },
      error : (error) => {
        console.log(error);
        // this.active = true;
      }
  });
  }
}
