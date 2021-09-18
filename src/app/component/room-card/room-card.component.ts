import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addRoom } from 'src/app/action/room.action';
import { Room } from 'src/app/model/room.model';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss']
})
export class RoomCardComponent implements OnInit {
 @Input() room!:Room;
  userList:string ="";
  constructor(private router:Router,private store:Store<{room:Room}>) { }

  ngOnInit(): void {
    for(let i=0;i<this.room.room_users.length;i++){

      this.userList+=this.room.room_users[i].email+' \n \n';
    }
  }

  enterRoom(){
    let code:any = this.room.room_code
    this.router.navigateByUrl("/room/"+this.room.room_code,{state:code})
  }

}
