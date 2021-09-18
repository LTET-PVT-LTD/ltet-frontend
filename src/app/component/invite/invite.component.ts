import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Room } from 'src/app/model/room.model';
import { DialogService } from 'src/app/service/dialog.service';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  inviteForm!:FormGroup;
  code!:string;

  constructor(private dialog:MatDialog, private roomService:RoomService,private router:Router,private dialogService:DialogService,private store:Store<{room:Room}>) {
    this.store.select('room').subscribe(room=>{
      this.code= room.room_code;
    })
  }

  ngOnInit(): void {
    this.inviteForm= new FormGroup({
      email: new FormControl("",[Validators.required,Validators.email])
    })
  }

  onSubmit(){
    if(this.inviteForm.valid){

      this.roomService.inviteRoom(this.inviteForm, this.code).subscribe(res=>{

        this.dialog.closeAll();
        this.dialogService.confirmDialog({color:"green",message:"Email sent successfully"});

      },
      err=>{
        this.dialog.closeAll();
       this.dialogService.confirmDialog({'color':"red","message":"You are alread invited this user"})
      });

    }
}
}
