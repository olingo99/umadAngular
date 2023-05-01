import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { User, UserService} from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user: User = new User();
  
  constructor(private userService: UserService) { }
  //on init
  ngOnInit(): void {
    this.user = this.userService.getUserName();
  }
}
