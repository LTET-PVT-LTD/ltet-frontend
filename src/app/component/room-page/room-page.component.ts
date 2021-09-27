import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addRoom, removeRoom } from 'src/app/action/room.action';
import { LoaderService } from 'src/app/loader/loader.service';
import { Room } from 'src/app/model/room.model';
import { User } from 'src/app/model/user.model';
import { UserQuestion } from 'src/app/model/user_question.model';
import { DialogService } from 'src/app/service/dialog.service';
import { RoomService } from 'src/app/service/room.service';


@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss'],

})
export class RoomPageComponent implements OnInit,OnDestroy {
  room!:Room|any;
  code!:string|any;
  currUser!:User;
  users_question:UserQuestion[] = [];
  isLoading!:boolean;
  roomCode:any="";

  constructor(private router:Router,private store:Store<{room:Room, user:User}>, private roomService:RoomService, public loaderService:LoaderService, private activatedRoute:ActivatedRoute, private dialogService:DialogService){
    this.roomService.isRunning.next(true);
    this.activatedRoute.params.subscribe((param:Params) =>{
      this.code = param.code;
    });
    this.roomService.getRoom(this.code).subscribe(room=>{
      this.roomService.isRunning.next(false);
      this.store.dispatch(addRoom({room}));
    })
    this.roomService.isRunning.subscribe(res =>{
      this.isLoading= res;
    })

    this.store.select("room").subscribe(room=>{
      this.room= room;

      this.users_question.splice(0,this.users_question.length);
      if(room.users_questions!=undefined){
        for(let i=0;i<room.users_questions.length;i++){
          this.users_question.push(room.users_questions[i]);
        }

      }

    })
    this.store.select("user").subscribe(user=>{
      this.currUser= user;


    })
    this.roomCode =this.router.getCurrentNavigation()?.extras.state;


  }
  ngOnInit(){

   
  
    if(this.roomCode!=undefined){
      console.log(this.roomCode);
      this.roomService.joinRoom(this.roomCode).subscribe(room=>{
        this.store.dispatch(addRoom({room}));
        this.router.navigateByUrl("/room/"+room.room_code)
       
      },
      err=>{
       
       this.dialogService.confirmDialog({'color':"red","message":err.error.Error,load:false})
      });

    }
  }


  moveToInProgress(questionId:number,status:number){
    this.roomService.changeStatus(questionId,status).subscribe(res=>{

    })
  }
  moveToDone(questionId:number,status:number){
      this.roomService.changeStatus(questionId,status).subscribe(res=>{

    })
  }

  ngOnDestroy(){
    this.store.dispatch(removeRoom());
  }
  drop(event: CdkDragDrop<UserQuestion[]>) {
    moveItemInArray(this.users_question, event.previousIndex, event.currentIndex);
  }

}
