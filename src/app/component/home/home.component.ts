import { AfterViewChecked } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { initialSheets } from 'src/app/action/sheet.action';
import { LoaderService } from 'src/app/loader/loader.service';
import { Sheet } from 'src/app/model/sheet.model';
import { User } from 'src/app/model/user.model';
import { SheetService } from 'src/app/service/sheet.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  sheets!:Sheet[]
  constructor(private sheetService:SheetService,private store:Store<{sheet:Sheet[],user:User}>, private router:Router, public loaderService:LoaderService) {
    this.store.select("sheet").subscribe(sheets=>{
      this.sheets = sheets;
    })

    this.store.select("user").subscribe(user=>{
      console.log(user);
    })


  }
  ngOnInit(): void {

  }







  moveToSheet(id:number,sheet:Sheet){
    this.router.navigateByUrl("/sheet/"+id,{state:sheet});
  }

}
