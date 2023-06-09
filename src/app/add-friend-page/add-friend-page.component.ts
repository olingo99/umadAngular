import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { User, UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { Category, CategoryService } from '../category.service';

@Component({
  selector: 'app-add-friend-page',
  templateUrl: './add-friend-page.component.html',
  styleUrls: ['./add-friend-page.component.css']
})
export class AddFriendPageComponent {

  user: User = new User();
  active: boolean = false;
  suggestions: User[] = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

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

          this.searchSuggestions('');
        },
        error: (error) => {
          console.log('error');
          console.log(error);
        },
      });
    }
    );
  }


  onSearchChange(searchValue: string): void {
    console.warn("searching for " + searchValue);
    this.searchSuggestions(searchValue);
  }

  searchSuggestions(searchValue: string): void {
    this.userService.searchUsers(searchValue).subscribe({
      next : (data) => {
        console.warn("here is the suggestion list")
        console.warn(data);
        this.suggestions = data;
        this.suggestions = this.suggestions.filter(suggestion => suggestion.Name !== this.user.Name);
      },
      error : (error) => {
        console.log(error);
        this.suggestions = [];
      }
    });
  }
}
