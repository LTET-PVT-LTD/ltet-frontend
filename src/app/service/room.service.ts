import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { addRoom } from '../action/room.action';
import { QuestionStatus } from '../model/question_status.model';
import { Room } from '../model/room.model';
import { User } from '../model/user.model';
import { DialogService } from './dialog.service';


@Injectable({
  providedIn: 'root',
})
export class RoomService {

  baseUrl = "https://ltet-backend.herokuapp.com";
  createRoomUrl = 'https://ltet-backend.herokuapp.com/sheet_room/create/';
  enrollUrl = 'https://ltet-backend.herokuapp.com/sheets/enrollment/';
  joinRoomUrl = 'https://ltet-backend.herokuapp.com/sheet_room/join/';
  token!: string;
  isRunning = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient, private store:Store<{room:Room}>, private dialogService:DialogService) {
    this.getToken();
  }

  createRoom(id:any,is_private:boolean):Observable<Room> {
    this.getToken();
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    let options = { headers: headers };

    let sheet = new FormData();
    sheet.append('sheet_id', id);
    sheet.append('is_private', ""+is_private);


    return this.http.post<Room>(this.createRoomUrl, sheet, options);
  }

  enrollSheet(id:any) {
    this.getToken();
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    let sheet = new FormData();
    sheet.append('sheet_id', id);
    sheet.append('enrollment_type', 'enroll');

    let options = { headers: headers };

    return this.http.post(this.enrollUrl, sheet, options);
  }

  getToken() {
    this.token = localStorage.getItem('access') || '';
  }

  getRoom(roomCode:string|any):Observable<Room>{
    this.getToken();

    let url =`https://ltet-backend.herokuapp.com/sheet_room/details/${roomCode}/`
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    let options = { headers: headers };

    return this.http.get<Room>(url, options);
  }

  joinRoom(joinForm:FormGroup):Observable<Room>{
    this.getToken();
    let url ="https://ltet-backend.herokuapp.com/sheet_room/join/";
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    let room = new FormData();
    room.append('invite_code', joinForm.value.code);


    let options = { headers: headers };

    return this.http.post<Room>(url, room, options);
  }


  inviteRoom(inviteForm: FormGroup,code:string) {
    this.getToken();
    let url ="https://ltet-backend.herokuapp.com/sheet_room/invite/";
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    let users:string[]=[];
    users.push(inviteForm.value.email);
    let room = {
      'invite_code':code,
      'users':users
    }



    let options = { headers: headers };

    return this.http.post<Room>(url, room, options);
  }

  changeStatus(questionId:number,status:number):Observable<QuestionStatus>{
    this.getToken();
    let url ="https://ltet-backend.herokuapp.com/sheet_room/update_status/";
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    let room = new FormData();
    room.append("question_id",""+questionId);
    room.append("status",""+status);


    let options = { headers: headers };

    return this.http.post<QuestionStatus>(url, room, options);
   
  }

  allRooms():Observable<Room[]>{
    this.getToken();
    let url = `${this.baseUrl}/sheet_room/all/`;
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    let options = { headers: headers };

    return this.http.get<Room[]>(url, options);
  }

  myLearning(user:User,id:any){
    this.isRunning.next(true);

    let currRooms:Room[];
    var code="";

    this.allRooms().subscribe(room=>{
    currRooms= room;

    for(let i=0;i<currRooms.length;i++){
       for(let j =0;j<currRooms[i].priviliged_room_users.length;j++){

          if((currRooms[i].sheet.id==id)&&(currRooms[i].is_private==true)&&(currRooms[i].priviliged_room_users[j].email==user.email)){
             code=currRooms[i].room_code;

          }
       }
    };
    if(code!=""){

      return this.getRoom(code).subscribe(room=>{
        this.isRunning.next(false);
        this.store.dispatch(addRoom({room}))
      })
     }

     return  this.createRoom(id,true).subscribe(room=>{

      return this.getRoom(room.room_code).subscribe(room=>{
        this.isRunning.next(false);
        this.store.dispatch(addRoom({room}))
      })
     },err=>{
        this.isRunning.next(false);
        this.dialogService.confirmDialog({
          color:"red",
          message: `Please Enroll the  sheet first`,
          id:id,
          load:false,
          enroll:true
        });

     })



   });






  }





}
