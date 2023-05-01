import { Component, ElementRef } from '@angular/core';
import {Input} from '@angular/core';
import { User, UserService} from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  @Input() user: User = new User();
  imageSource: string = "assets/images/happy.png";
  constructor(
    private userService: UserService,
    private elementRef : ElementRef) { }
  ngOnInit() {
    this.elementRef.nativeElement.style.setProperty('--progress', ((100-this.user.Mood)/2) + '%');
    this.imageSource = this.getSourceImage(this.user.Mood);
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
}
