import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { initialSheets } from 'src/app/action/sheet.action';
import { DialogService } from 'src/app/service/dialog.service';
import { SheetService } from 'src/app/service/sheet.service';
import { Sheet } from '../../model/sheet.model';
import { RoomService } from '../../service/room.service';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.scss']
})
export class EnrollComponent implements OnInit {
  enrollForm!:FormGroup;
  sheets!: Sheet[];

  constructor(private dialog:MatDialog, private store:Store<{sheet:Sheet[]}>, private roomService:RoomService,private dialogService:DialogService, private sheetService:SheetService) {
    this.store.select("sheet").subscribe((sheets)=>{
      this.sheets = sheets;
    })
  }

  ngOnInit(): void {
    this.enrollForm= new FormGroup({
      sheetForm: new FormControl([Validators.required])
    })
  }



  onSubmit(){
    if(this.enrollForm.valid){
      this.dialog.closeAll();
      this.roomService.enrollSheet(this.enrollForm.value.sheetForm.id).subscribe(res=>{

        this.sheetService.getSheet().subscribe(sheets=>{
          this.store.dispatch(initialSheets({sheets}));
        })
        this.dialogService.confirmDialog({
          color:"green",
          message: `You are now enrolled in this sheet`,
          load:false
        })
      }, err=>
      this.dialogService.confirmDialog({
        color:"red",
        message: `Something went wrong`,
        load:false
      }))
    }
}
}
