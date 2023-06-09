import { Component } from '@angular/core';
import { User, UserService} from '../user.service';
import {Input} from '@angular/core';
import { FriendsService, FriendMap } from '../friends.service';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  @Input() user: User = new User();
  suggestions: User[] = [];
  constructor(
    private userService: UserService,
    private friendsService: FriendsService,
    private formBuilder: FormBuilder
  ) { }

  friendForm = this.formBuilder.group({
    friendName: ''
  });

  ngOnInit() {
    this.userService.searchUsers("").subscribe({
      next : (data) => {
        console.warn("here is the suggestion list")
        console.warn(data);
        this.suggestions = data;
      },
      error : (error) => {
        console.log(error);
        this.suggestions = [];
      }
    });
  }

  onSubmitFriendForm() {
    console.warn("friend form submitted");
    console.warn(this.friendForm.value);
    this.friendsService.addFriend(this.user.iduser, this.friendForm.value.friendName!).subscribe({
      next : (data) => {
        console.warn("here is the friend list")
        console.warn(data);
        // this.ngOnInit();
      },
      error : (error) => {
        console.log("error fiends");
        console.log(error);
      }
    });
  }

  onInputChange(value: any){
    value = value.target.value;
    console.warn("input change");
    console.warn(value);
    this.userService.searchUsers(value).subscribe({
      next : (data) => {
        console.warn("here is the suggestion list")
        console.warn(data);
        this.suggestions = data;
      },
      error : (error) => {
        console.log(error);
        this.suggestions = [];
      }
    });
  }
}
