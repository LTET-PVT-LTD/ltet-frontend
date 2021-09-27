import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cred } from 'src/app/model/crediential.model';
import { tap, mapTo, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../model/user.model';
import { Response } from '../model/response.model';
import { LoginResponse } from '../model/loginResponse.model';
import { DialogService } from './dialog.service';

HttpClient;

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  signUpUrl = 'https://ltet-backend.herokuapp.com/accounts/register/';
  loginUrl = 'https://ltet-backend.herokuapp.com/accounts/login/';
  token = '';

  currentUser!: Cred;

  constructor(private http: HttpClient, private dialogService:DialogService) {
    this.getToken();
  }

  generateToken(cred: Cred):Observable<LoginResponse>{
     return this.http.post<LoginResponse>(this.loginUrl, cred);

  }

  signUp(cred: Cred): Observable<Response> {
    return this.http.post<Response>(this.signUpUrl, cred);
  }

  logOut() {
    //  currentuser ko null krna h
    this.clearTokens();
    this.removeUserFromLocalStorage();
  }

  doLoginUser(tokens: LoginResponse) {
    this.storeToken(tokens);
  }

  login(): Observable<User> {
    let url = 'https://ltet-backend.herokuapp.com/accounts/user_details/';
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    let options = { headers: headers };
    return this.http.get<User>(url, options);
  }

  storeToken(tokens: any) {
    localStorage.setItem('access', tokens.tokens.access);
    localStorage.setItem('refresh', tokens.tokens.refresh);
    this.getToken();
  }

  setUserInLocalStorage(user:User){
    localStorage.setItem("user",JSON.stringify(user));
  }

  getUserFromLocalStorage(){
    let user = JSON.parse(localStorage.getItem("user")+"");
    if(user==""){
      return {
        email:"",
        id:""
      }
    }
    return user;
  }

  removeUserFromLocalStorage(){
    localStorage.removeItem("user");
  }

  clearTokens() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }

  getToken() {
    this.token = localStorage.getItem('access') || '';
  }
}
