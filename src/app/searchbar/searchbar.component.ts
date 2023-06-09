import { Component } from '@angular/core';
import { User, UserService} from '../user.service';
import {Input, Output, EventEmitter} from '@angular/core';
import { FriendsService, FriendMap } from '../friends.service';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {

  @Output() searchTermChange = new EventEmitter<string>();

  constructor(
    private userService: UserService,
    private friendsService: FriendsService,
    private formBuilder: FormBuilder
  ) { }

  onInputChange(value: any){
    value = value.target.value;
    this.searchTermChange.emit(value);
  }

}
