import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addRoom } from 'src/app/action/room.action';
import { initialSheets } from 'src/app/action/sheet.action';
import { Sheet } from 'src/app/model/sheet.model';
import { User } from 'src/app/model/user.model';
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
  user!:User;

  constructor( @Inject(MAT_DIALOG_DATA)public data: Dialog, private roomService:RoomService,private store:Store<{sheet:Sheet[],user:User}>, private dialogService:DialogService,private sheetService:SheetService, private router:Router, private currDialog:MatDialogRef<DialogComponent>) {
    this.store.select("user").subscribe(user=>{
      this.user= user;
    })
  }


  ngOnInit(): void {
  }

  enroll(){
    this.roomService.enrollSheet(this.data.id).subscribe(res=>{

      this.sheetService.getSheet().subscribe(sheets=>{
        this.store.dispatch(initialSheets({sheets}));
      })
      this.currDialog.close();
      if(this.data.createRoom){
        this.dialogService.confirmDialog({
          color:"green",
          id:this.data.id,
          message: `You are now enrolled in this sheet`,
          load:false,
          createRoom:true,
          enroll:false
        });
      }
      else{
        this.dialogService.confirmDialog({
          color:"green",
          message: `You are now enrolled in this sheet`,
          load:true,
          enroll:false
        });
      }
    


    }, err=>
    this.dialogService.confirmDialog({
      color:"red",
      message: `Something went wrong`,
      load:false,
      enroll:false
    }))
  }

  close(){
    this.currDialog.close();
    if(this.data.createRoom){
      this.roomService.createRoom(this.data.id,false).subscribe(
        (room) => {
          this.store.dispatch(addRoom({room}));
          let code:any = room.room_code;
          this.dialogService.confirmDialog({
            color: 'green',
            message: `Your room ${room.room_code} is created successfully`,
            load:false
          });
          this.router.navigate(["/room/"+room.room_code],{state:code});
        }
      );
      return;
    }
     else if(this.data.load){
        window.location.reload();
      }



  }
}


