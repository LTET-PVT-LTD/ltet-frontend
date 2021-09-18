import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { EnrollComponent } from 'src/app/component/enroll/enroll.component';
import { User } from 'src/app/model/user.model';
import { RoomFormComponent } from '../room-form/room-form.component';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export class SubHeaderComponent implements OnInit {
  user!:User;
  constructor(private dialog:MatDialog, private store:Store<{user:User}>) {
    this.store.select("user").subscribe(user=>{
      this.user= user;
    })
  }
  @Input() joinRoom!:boolean;

  ngOnInit(): void {
  }

  openRoom(){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.position ={
       'top': '3rem',
        "left": '2rem'
  }
    this.dialog.open(RoomFormComponent,dialogConfig);
  }

  openEnroll(){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.position ={
       'top': '3rem',
        "left": '2rem'
  }
    this.dialog.open(EnrollComponent,dialogConfig);
  }


}
