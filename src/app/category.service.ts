import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from './constants';

export class Category {
  'idcategory': number;
  'iduser': number;
  'name': string;

  constructor(){
    this.idcategory = 0;
    this.iduser = 0;
    this.name = "";
  }
}


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http : HttpClient
  ) { }

  getCategoryById(userId:Number, catId: Number): Observable<Category>{

    return this.http.get<Category>(baseUrl+`/user/${userId}/category/${catId}`);
  }

}