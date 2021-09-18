import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { initialSheets } from 'src/app/action/sheet.action';
import { Sheet } from 'src/app/model/sheet.model';
import { DialogService } from 'src/app/service/dialog.service';
import { RoomService } from 'src/app/service/room.service';
import { SheetService } from 'src/app/service/sheet.service';
import { Dialog } from "../../model/dialog.model";
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA)public data: Dialog, private roomService:RoomService,private store:Store<{sheet:Sheet[]}>, private dialogService:DialogService,private sheetService:SheetService, private router:Router) {

  }


  ngOnInit(): void {
  }

  enroll(){
    this.roomService.enrollSheet(this.data.id).subscribe(res=>{

      this.sheetService.getSheet().subscribe(sheets=>{
        this.store.dispatch(initialSheets({sheets}));

        this.router.navigateByUrl("/learning");
      })
      this.dialogService.confirmDialog({
        color:"green",
        message: `You are now enrolled in this sheet`
      });
    }, err=>
    this.dialogService.confirmDialog({
      color:"red",
      message: `Something went wrong`
    }))
  }

}
