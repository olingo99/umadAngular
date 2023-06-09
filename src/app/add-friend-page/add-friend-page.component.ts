import { Component } from '@angular/core';
import { User, UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

/*
Component for the add firend page, contains the search bar and the list of suggestions
*/

@Component({
  selector: 'app-add-friend-page',
  templateUrl: './add-friend-page.component.html',
  styleUrls: ['./add-friend-page.component.css']
})
export class AddFriendPageComponent {

  user: User = new User();  //User to whom we want to add friends
  active: boolean = false;  //Boolean used to know if the user is loaded
  suggestions: User[] = []; //List of suggestions

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {  //Get the id of the user from the url 
      this.userService.getUserById(params['id']).subscribe({
        next: (data) => {
          this.user = data;
          this.active = true;

          this.searchSuggestions(''); //Get the suggestions, as the search string is empty, it will return all the users
        },
        error: (error) => {
          console.log('error');
          console.log(error);
        },
      });
    }
    );
  }

  //Function called every time the user changes the search string
  onSearchChange(searchValue: string): void {
    this.searchSuggestions(searchValue);
  }

  //Function called to get the suggestions
  searchSuggestions(searchValue: string): void {
    this.userService.searchUsers(searchValue).subscribe({
      next : (data) => {
        this.suggestions = data;
        this.suggestions = this.suggestions.filter(suggestion => suggestion.Name !== this.user.Name); //Remove the user from the suggestions
      },
      error : (error) => {
        console.log(error);
        this.suggestions = [];
      }
    });
  }
}
