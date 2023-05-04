import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { User, UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { Category, CategoryService } from '../category.service';

@Component({
  selector: 'app-event-creation-page',
  templateUrl: './event-creation-page.component.html',
  styleUrls: ['./event-creation-page.component.css']
})
export class EventCreationPageComponent {

  user: User = new User();
  category: Category = new Category();
  active: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    console.warn('home init');
    this.route.queryParams.subscribe((params) => {
      console.warn('params[] home')
      console.warn(params['id'])
      this.userService.getUserById(params['id']).subscribe({
        next: (data) => {
          this.user = data;
          console.warn('user');
          console.warn(typeof data);
          this.active = true;
        },
        error: (error) => {
          console.log('error');
          console.log(error);
        },
      });
    }
    );
  }

  onCategoryChange(category: Category): void {
    console.warn('category changed');
    console.warn(category);
    this.category = category;
  }
}
