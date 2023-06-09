import { Component } from '@angular/core';
import { User, UserService} from '../user.service';
import {Input} from '@angular/core';
import { FriendsService, FriendMap } from '../friends.service';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthTokenService } from '../auth-token.service';

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
  active : boolean = false;
  friendRequests: User[] = [];
  requestVisible: boolean = false;


  suggestions: User[] = [];
  isVisible: boolean = false;

  constructor(
    private friendsService: FriendsService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authTokenService: AuthTokenService
  ) { }

  friendForm = this.formBuilder.group({
    friendName: ''
  });

  ngOnInit() {
    this.requestVisible = +this.user.iduser == +this.authTokenService.getConnectedUser();
    this.friendsService.getFriends(this.user.iduser).subscribe({
      next : (data) => {
        console.warn("here is the friend list")
        console.warn(data);
        this.friends = data;
        // this.active = true;
        this.getRequests();
      },
      error : (error) => {
        console.log(error);
        this.friends = [];
        this.getRequests();
        // this.active = true;
      }
    }
    );


  }

  ngOnChanges() {
    console.warn("user component")
    this.ngOnInit();
  }

  // onSubmitFriendForm() {
  //   console.warn("friend form submitted");
  //   console.warn(this.friendForm.value);
  //   this.friendsService.addFriend(this.user.iduser, this.friendForm.value.friendName!).subscribe({
  //     next : (data) => {
  //       console.warn("here is the friend list")
  //       console.warn(data);
  //       // this.ngOnInit();
  //     },
  //     error : (error) => {
  //       console.log("error fiends");
  //       console.log(error);
  //     }
  //   });
  // }

  goToAddFriend() {
    this.router.navigate(['/addFriend'], { queryParams: { id: this.user.iduser } });
  }

  getRequests():void {
    console.warn("getting friend requests");
    this.friendsService.getFriendRequests(this.user.iduser).subscribe({
      next : (data) => {
        console.warn("here is the friend request list");
        console.warn(data);
        this.friendRequests = data;
        this.active = true;
      },
      error : (error) => {
        console.warn("here is the friend request list error");
        console.log(error);
        this.friendRequests = [];
        this.active = true;
      }
    });
  }

  acceptFriendRequest(friendRequest: User):void{
    this.friendsService.acceptFriendRequest(this.user.iduser, friendRequest.iduser).subscribe({
      next : (data) => {
        console.warn("accepeted friend request")
        console.warn(data);
        this.ngOnInit();
      },
      error : (error) => {
        console.log(error);
      }
    });
  }

  declineFriendRequest(friendRequest:User):void{
    this.friendsService.declineFriendRequest(this.user.iduser, friendRequest.iduser).subscribe({
      next : (data) => {
        console.warn("declined friend request")
        console.warn(data);
        this.ngOnInit();
      },
      error : (error) => {
        console.log(error);
      }
    });

  }

  onSearchChange(searchValue: string): void {
    console.warn("searching for " + searchValue);
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

  onFocusChange(e:boolean){
    this.isVisible = e;
  }
}
