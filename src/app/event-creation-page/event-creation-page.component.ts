import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { User, UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-creation-page',
  templateUrl: './event-creation-page.component.html',
  styleUrls: ['./event-creation-page.component.css']
})
export class EventCreationPageComponent {

  user: User = new User();
  active: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.warn('home init');
    // this.user = this.userService.getUserName();
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
}
