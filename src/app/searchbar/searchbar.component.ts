import { Component } from '@angular/core';
import {Output, EventEmitter} from '@angular/core';

/*
Component used to display a search bar.
*/



@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {

  @Output() searchTermChange = new EventEmitter<string>();  //Event emitter used to send the search term to the parent component

  constructor(
  ) { }

  //Send the search term to the parent component every time the input change
  onInputChange(value: any){
    value = value.target.value;
    this.searchTermChange.emit(value);
  }

}
