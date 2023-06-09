import { Component, ElementRef } from '@angular/core';
import {Input} from '@angular/core';
import { User, UserService} from '../user.service';
import { Router } from '@angular/router';

/*
Component used to display the user data in the home page, contains the user name, the user mood and the user image changing depending on the mood. This component is used in the home page
*/


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  @Input() user: User = new User();                   //User to display
  @Input() connectedUser: User = new User();        //Connected user  
  imageSource: string = "assets/images/happy.png";  //Image to display

  constructor(
    private elementRef : ElementRef,
    private router: Router,
    private userService: UserService
    ) { }


  ngOnInit() {
    this.elementRef.nativeElement.style.setProperty('--progress', ((100+this.user.Mood)/2) + '%'); //Change the position of the indicator on the mood bar depending on the mood value
    this.imageSource = this.userService.getSourceImage(this.user.Mood); //Change the image depending on the mood value
  }

  ngOnChanges() {
    this.ngOnInit();  //Called when the user change
  }


  //Called when the user click on the add event button, redirect to the event creation page
  addEvent() {
    this.router.navigate(['/eventCreation'], { queryParams: { id: this.user.iduser } });
  }

  //Called when the user click on the see all events button, redirect to the all events page
  seeEvents() {
    this.router.navigate(['/allEvents'], { queryParams: { id: this.user.iduser } });
  }
}
