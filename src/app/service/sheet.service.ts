import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Sheet } from '../model/sheet.model';

@Injectable({
  providedIn: 'root'
})
export class SheetService {

  baseUrl="https://ltet-backend.herokuapp.com/sheets/";
  // token!:string;
  constructor(private http:HttpClient,private store:Store<{sheet:Sheet[]}> ) {
      // this.getAccessToken();
    }
    getSheet():Observable<Sheet[]> {
      // let headers = new HttpHeaders({
      //   'Authorization': "Bearer "+ this.token});
      // let options = { headers: headers };
      return this.http.get<Sheet[]>(this.baseUrl);

    }

    // getAccessToken(){
    //   this.token=localStorage.getItem("access")||"";
    // }


}
