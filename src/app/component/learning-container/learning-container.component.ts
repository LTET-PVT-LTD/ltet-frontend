import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addRoom } from 'src/app/action/room.action';
import { initialSheets, removeSheet } from 'src/app/action/sheet.action';
import { initialRooms } from 'src/app/action/user_room.action';
import { LoaderService } from 'src/app/loader/loader.service';
import { Room } from 'src/app/model/room.model';
import { Sheet } from 'src/app/model/sheet.model';
import { User } from 'src/app/model/user.model';
import { DialogService } from 'src/app/service/dialog.service';
import { RoomService } from 'src/app/service/room.service';
import { SheetService } from 'src/app/service/sheet.service';

@Component({
  selector: 'app-learning-container',
  templateUrl: './learning-container.component.html',
  styleUrls: ['./learning-container.component.scss']
})
export class LearningContainerComponent implements OnInit {
  id:any;
  userRoom!:Room;
  user!:User;
  sheet!:Sheet;
  sheets:Sheet[]=[];
  isLoading= true;
  alreadySend=false;
  constructor(private sheetService:SheetService,private store:Store<{room:Room,user:User,sheet:Sheet[]}>, private roomService:RoomService,private activatedRoute:ActivatedRoute, private dialogService:DialogService, private router:Router, public loaderService:LoaderService) {

    this.roomService.allRooms().subscribe(rooms=>{
      this.isLoading=false;
      this.store.dispatch(initialRooms({rooms}));
    });
    this.store.select("room").subscribe(room=>{

      this.userRoom= room;
    })
    this.store.select("user").subscribe(user=>{
      this.user= user;

    })

      this.sheetService.getSheet().subscribe(sheets=>{

        // this.store.dispatch(removeSheet());

        this.store.dispatch(initialSheets({sheets}));
      })

    this.store.select("sheet").subscribe(sheets=>{

      this.sheets= sheets;
      this.loadSheet();

    })

  }

  ngOnInit(): void {


  }



  loadSheet(){
    this.activatedRoute.params.subscribe((param: Params) => {
      this.id = param.id;

      for(let i=0;i<this.sheets.length;i++){

        if(this.sheets[i].id==this.id){
          this.sheet= this.sheets[i];
          break;
        }
      }

      if(this.alreadySend==false){
        this.alreadySend= true;

        this.roomService.myLearning(this.user,this.id);
      }


    });
  }

}
