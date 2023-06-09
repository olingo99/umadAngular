import { Component } from '@angular/core';
import { User, UserService} from '../user.service';
import {Input} from '@angular/core';
import { FriendsService} from '../friends.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthTokenService } from '../auth-token.service';

/*
Component used to handle the friend list, displays the list of friends of the user. Uses the Firend component to display the friends. This component is used in the home component
*/


@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent {
  @Input() user: User = new User();
  // test = new User();
  // friends: User[] = [this.test];
  friends: User[] = []; //List of friends of the user

  active : boolean = false; //Boolean used to know if the friends are loaded
  friendRequests: User[] = [];  //List of friend requests of the user
  requestVisible: boolean = false;  //Boolean used to know if the friend requests are visible


  suggestions: User[] = []; //List of suggestions of friends for the user, used to add friends. displayed in the dropdownuserlist component

  constructor(
    private friendsService: FriendsService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authTokenService: AuthTokenService
  ) { }


  ngOnInit() {
    this.requestVisible = +this.user.iduser == +this.authTokenService.getConnectedUser();   //Check if the friend requests are visible, they are only visible if the displayed user is the connected user
    this.friendsService.getFriends(this.user.iduser).subscribe({                            //Call the getFriends function of the friendsService
      next : (data) => {
        this.friends = data;                                                              //Set the friends list
        this.getRequests();                                                              //Get the friend requests
      },
      error : (error) => {
        this.friends = [];                                                              //Set the friends list to empty
        this.getRequests();                                                            //Get the friend requests
      }
    }
    );


  }

  ngOnChanges() { //Called when the user is changed
    this.ngOnInit();
  }

  //Function used to go to the add friend page, called when the add friend button is clicked
  goToAddFriend() {
    this.router.navigate(['/addFriend'], { queryParams: { id: this.user.iduser } });
  }


  //Function used to get the friend requests of the user
  getRequests():void {
    this.friendsService.getFriendRequests(this.user.iduser).subscribe({
      next : (data) => {
        this.friendRequests = data;    //Set the friend requests
        this.active = true;               //Set the friends as loaded, displaying the components
      },
      error : (error) => {
        this.friendRequests = [];      //Set the friend requests to empty
        this.active = true;            //Set the friends as loaded, displaying the components
      }
    });
  }

  //Function used to accept a friend request, called when the accept button is clicked on a friend request
  acceptFriendRequest(friendRequest: User):void{
    this.friendsService.acceptFriendRequest(this.user.iduser, friendRequest.iduser).subscribe({
      next : (data) => {
        this.ngOnInit();  //Reload the component, to update the friend requests
      },
      error : (error) => {
        console.log(error);
      }
    });
  }


  //Function used to decline a friend request, called when the decline button is clicked on a friend request
  declineFriendRequest(friendRequest:User):void{
    this.friendsService.declineFriendRequest(this.user.iduser, friendRequest.iduser).subscribe({
      next : (data) => {
        this.ngOnInit();  //Reload the component, to update the friend requests
      },
      error : (error) => {
        console.log(error);
      }
    });

  }



}
