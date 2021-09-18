import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoaderService } from 'src/app/loader/loader.service';
import { Sheet } from 'src/app/model/sheet.model';
import { User } from 'src/app/model/user.model';

import { SheetService } from 'src/app/service/sheet.service';

@Component({
  selector: 'app-my-learning',
  templateUrl: './my-learning.component.html',
  styleUrls: ['./my-learning.component.scss']
})
export class MyLearningComponent implements OnInit {
  id:any;

  sheets!:Sheet[]
  constructor(private sheetService:SheetService,private store:Store<{sheet:Sheet[],user:User}>, private router:Router,private activatedRoute:ActivatedRoute, public loaderService:LoaderService) {
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
    console.log(id);
    console.log(sheet);
    this.router.navigateByUrl("/learning/"+id);
  }
}
