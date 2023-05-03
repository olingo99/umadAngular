import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from './constants';


export class Event {
  'idevent': number;
  'Name': string;
  'iduser': number;
  'Weight': number;
  'Date': Date;
  'idcategory': number;


  constructor(){
    this.idevent = 0;
    this.Name = "";
    this.iduser = 0;
    this.Weight = 0;
    this.Date = new Date();
    this.idcategory = 0;
  }
}


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient
  ) { }

  getTodayEventsByUserId(iduser: number): Observable<Event[]> {
    console.log("getTodayEventsByUserId");
    console.log(baseUrl+`/user/${iduser}/events`);
    return this.http.get<Event[]>(baseUrl+`/user/${iduser}/events`);
  }

  getLastEventsByUserId(iduser: number): Observable<Event> {
    return this.http.get<Event>(baseUrl+`/user/${iduser}/lastevent`);
  }

}
