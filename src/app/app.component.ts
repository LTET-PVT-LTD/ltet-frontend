import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { initialSheets } from './action/sheet.action';
import { addUser } from './action/user.action';
import { Sheet } from './model/sheet.model';
import { User } from './model/user.model';
import { LoginServiceService } from './service/login-service.service';
import { SheetService } from './service/sheet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LTET';
  constructor(private sheetService:SheetService, private store:Store<{sheet:Sheet[],user:User}>, private loginService:LoginServiceService){
    let user:User =this.loginService.getUserFromLocalStorage();
    if(user!=null){
      this.store.dispatch(addUser({user}));
    }


    this.sheetService.getSheet().subscribe(sheets=>{
      this.store.dispatch(initialSheets({sheets}));
    })
  }
}
