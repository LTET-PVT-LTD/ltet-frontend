import { AfterViewChecked } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { initialSheets } from 'src/app/action/sheet.action';
import { LoaderService } from 'src/app/loader/loader.service';
import { Sheet } from 'src/app/model/sheet.model';
import { User } from 'src/app/model/user.model';
import { user } from 'src/app/reducer/user.reducer';
import { SheetService } from 'src/app/service/sheet.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  sheets!:Sheet[]
  user!:User;
  redirect:any;
  constructor(private sheetService:SheetService,private store:Store<{sheet:Sheet[],user:User}>, private router:Router, public loaderService:LoaderService) {
    this.store.select("sheet").subscribe(sheets=>{
      this.sheets = sheets;
    })
    this.redirect = window.history.state;
    this.store.select("user").subscribe(user=>{
      this.user = user;
      
      if(this.user.email!=""&&this.user.is_verified==true&&this.redirect.redirect){
        this.router.navigateByUrl(this.redirect.redirect);
      }
    })
  

  }
  ngOnInit(): void {
    
   
  }







  moveToSheet(id:number,sheet:Sheet){
    this.router.navigateByUrl("/sheet/"+id,{state:sheet});
  }

}
