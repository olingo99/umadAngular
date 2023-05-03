import { Component, ElementRef } from '@angular/core';
import {Input} from '@angular/core';
import { User, UserService} from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  @Input() user: User = new User();
  @Input() connectedUser: User = new User();
  imageSource: string = "assets/images/happy.png";
  isAddEventActive: boolean = false;

  constructor(
    private userService: UserService,
    private elementRef : ElementRef,
    private router: Router ) { }


  ngOnInit() {
    console.warn("user component")
    console.warn(this.user);
    console.warn(this.user.Mood);
    this.elementRef.nativeElement.style.setProperty('--progress', ((100-this.user.Mood)/2) + '%');
    this.imageSource = this.getSourceImage(this.user.Mood);
    this.isAddEventActive = this.user != this.connectedUser;
  }

  ngOnChanges() {
    console.warn("user component")
    this.ngOnInit();
  }


  getSourceImage(mood: number): string {
    if (mood <-90){
      return "assets/images/verryHappy.png";
    }
    if (mood <=0){
      return "assets/images/happy.png";
    }
    return `assets/images/sad${Math.ceil(mood/14)}.png`;
  }

  addEvent() {
    // this.router.navigate(['/addEvent', this.user.Id]);
  }

  seeEvents() {
    // this.router.navigate(['/events', this.user.Id]);
  }
}
