import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { removeUser } from 'src/app/action/user.action';
import { User } from 'src/app/model/user.model';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { LoginPageComponent } from '../login-page/login-page.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Input()selected="";
  user!:User;
  constructor(private store:Store<{user:User}>,private router:Router, private loginService:LoginServiceService, private dialog:MatDialog) {
    this.store.select("user").subscribe(user=>{
      this.user= user
    })

   }

  ngOnInit(): void {
  }

  logout(){
    this.loginService.logOut();
    this.store.dispatch(removeUser());
    this.router.navigate([""])
  }

  styleObject(): Object {

    return {
      color: '#00ff84',
     }


}
openLogin(){
  this.dialog.open(LoginPageComponent)
}



}
