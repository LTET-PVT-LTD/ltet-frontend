import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {
  code!:any;
  user!:User;

  constructor(private activatedRouter:ActivatedRoute, private store:Store<{user:User}>, private router:Router) {
    this.code = this.activatedRouter.snapshot.params.code;
    this.store.select("user").subscribe((user:User)=>{
      this.user = user;
    })
   }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin(){
    if(this.user.email==""){
      this.router.navigateByUrl("",{ state: { redirect: this.router.url } });
    }
    else{
      
      this.router.navigateByUrl("room/"+this.code,{state:this.code});
    }
  }

}
