import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addRoom } from 'src/app/action/room.action';
import { Room } from 'src/app/model/room.model';
import { Sheet } from 'src/app/model/sheet.model';
import { DialogService } from 'src/app/service/dialog.service';
import { RoomService } from 'src/app/service/room.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss']
})
export class JoinRoomComponent implements OnInit {
  joinForm!:FormGroup;

  constructor(private dialog:MatDialog, private roomService:RoomService,private router:Router,private dialogService:DialogService, private store:Store<{room:Room}>) { }

  ngOnInit(): void {
    this.joinForm= new FormGroup({
      code: new FormControl("",[Validators.required])
    })
  }

  onSubmit(){
    if(this.joinForm.valid){
      this.roomService.joinRoom(this.joinForm).subscribe(room=>{
        this.store.dispatch(addRoom({room}));
        this.router.navigateByUrl("/room/"+room.room_code)
        this.dialog.closeAll();
      },
      err=>{
       this.dialogService.confirmDialog({'color':"red","message":"You are already present in this room"})
      });

    }
}

}
