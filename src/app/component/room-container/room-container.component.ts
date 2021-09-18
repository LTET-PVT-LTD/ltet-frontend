import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { initialRooms } from 'src/app/action/user_room.action';
import { LoaderService } from 'src/app/loader/loader.service';
import { Room } from 'src/app/model/room.model';
import { RoomService } from 'src/app/service/room.service';
const rooms = require("../../../assets/rooms.json");

@Component({
  selector: 'app-room-container',
  templateUrl: './room-container.component.html',
  styleUrls: ['./room-container.component.scss']
})
export class RoomContainerComponent implements OnInit {
  userRooms:Room[]=[];
  constructor(private store:Store<{userRoom:Room[]}>, private roomService:RoomService, public loaderService:LoaderService) {
    this.roomService.allRooms().subscribe(allRooms=>{
      let rooms:Room[]=[];
      for(let i=0;i<allRooms.length;i++){
        if(allRooms[i].is_private==false){
          rooms.push(allRooms[i]);
        }
      }
      this.store.dispatch(initialRooms({rooms}));
    });
    this.store.select("userRoom").subscribe(rooms=>{
      this.userRooms= rooms;
    })
  }

  ngOnInit(): void {

    // for(let room of rooms.rooms){
    //   console.log(room);
    //   let Room:Room={
    //     users_questions:room.users_questions,
    //     id:room.id,
    //     sheet:room.sheet,
    //     priviliged_room_users:room.priviliged_room_users,
    //     room_users:room.room_users,
    //     room_code:room.room_code
    //   }
    //   this.userRooms.push(Room);
    // }
  }

}
