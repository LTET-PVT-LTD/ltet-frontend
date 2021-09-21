import { Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addRoom } from 'src/app/action/room.action';
import { initialSheets } from 'src/app/action/sheet.action';
import { removeUser } from 'src/app/action/user.action';
import { Sheet } from 'src/app/model/sheet.model';
import { User } from 'src/app/model/user.model';
import { DialogService } from 'src/app/service/dialog.service';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { RoomService } from 'src/app/service/room.service';
import { SheetService } from 'src/app/service/sheet.service';
import { EnrollComponent } from '../enroll/enroll.component';
import { InviteComponent } from '../invite/invite.component';
import { JoinRoomComponent } from '../join-room/join-room.component';
import { LoginPageComponent } from '../login-page/login-page.component';
import { RoomFormComponent } from '../room-form/room-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user!: User;
  @Input() title: String = '';
  id: any;
  sheets!:Sheet[];
  disable = false;

  constructor(
    private dialog: MatDialog,
    private store: Store<{ user: User, sheet:Sheet[] }>,
    private loginService: LoginServiceService,
    private activatedRoute: ActivatedRoute,
    private roomService: RoomService,
    private dialogService: DialogService,
    private router: Router,
    private sheetService:SheetService
  ) {
    this.store.select('user').subscribe((user) => {
      this.user = user;
    });

    this.store.select('sheet').subscribe((sheets=>{
      this.sheets= sheets;
    }));
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param: Params) => {
      this.id = param.id;
    });


    if((this.sheets.length>0) && (this.id!=undefined)){
      for(let i=0;i<this.sheets.length;i++){
        for(let j=0;j<this.sheets[i].enrolled_users_count;j++){

          if(this.sheets[i].id==this.id&&this.sheets[i].enrolled_users[j]==this.user.id){
            this.title= this.sheets[i].sheet_name;
            this.disable= true;

          }
        }
      }

    }
  }

  openLogin() {
    this.dialog.open(LoginPageComponent, {
      hasBackdrop: true,
    });
  }

  openLogout() {
    this.loginService.logOut();
    this.store.dispatch(removeUser());
  }

  openEnroll() {
    //   let dialogConfig = new MatDialogConfig();
    //   dialogConfig.position ={
    //      'top': '3rem',
    //       "right": '3rem'
    // }
    //   this.dialog.open(EnrollComponent,dialogConfig);
    this.roomService.enrollSheet(this.id).subscribe(
      (res) => {
        this.disable= true;
        this.sheetService.getSheet().subscribe(sheets=>{
          this.store.dispatch(initialSheets({sheets}));
        })

        this.dialogService.confirmDialog({
          color: 'green',
          message: `You are now enrolled in this sheet`,
          load:false
        });
      },
      (err) =>
        this.dialogService.confirmDialog({
          color: 'red',
          message: `Something went wrong`,
          load:false
        })
    );
  }
  openRoom() {


    this.roomService.createRoom(this.id,false).subscribe(
      (room) => {
        this.store.dispatch(addRoom({ room }));
        this.dialog.closeAll();
        let code:any = room.room_code;
        this.dialogService.confirmDialog({
          color: 'green',
          message: `Your room ${room.room_code} is created successfully`,
          load:false
        });
        this.router.navigate(['/room/' + room.room_code],{state:code});
      },
      (error) => {
        this.dialog.closeAll();
        this.dialogService.confirmDialog({
          color: 'red',
          message: `Please Enroll the sheet first`,
          id:this.id,
          load:false,
          enroll:true
        });
      }
    );
  }

  openRoomCard(){
    let dialogConfig = new MatDialogConfig();
      dialogConfig.position ={
         'top': '3rem',
          "right": '2rem'
    }
      this.dialog.open(RoomFormComponent,dialogConfig);
  }

  joinRoom() {

    let dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      top: '3rem',
      right: '2rem',
    };
    this.dialog.open(JoinRoomComponent, dialogConfig);
  }

  invite() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      top: '3rem',
      right: '2rem',
    };
    this.dialog.open(InviteComponent, dialogConfig);
  }

  disabled(){
    return {
      'background-color':'grey',
      'color':'white'
    }
  }
}
