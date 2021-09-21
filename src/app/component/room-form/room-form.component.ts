import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addRoom } from 'src/app/action/room.action';
import { Sheet } from 'src/app/model/sheet.model';

import { DialogService } from 'src/app/service/dialog.service';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss'],
})
export class RoomFormComponent implements OnInit {
  roomForm!: FormGroup;
  sheets!: Sheet[];

  constructor(
    private dialog: MatDialog,
    private store: Store<{ sheet: Sheet[] }>,
    private roomService: RoomService,
    private dialogService: DialogService,
    private router: Router
  ) {
    this.store.select('sheet').subscribe((sheets) => {
      this.sheets = sheets;
    });
  }

  ngOnInit(): void {
    this.roomForm = new FormGroup({
      sheetForm: new FormControl([Validators.required]),
    });
  }

  onSubmit() {
    if (this.roomForm.valid) {

      this.roomService.createRoom(this.roomForm.value.sheetForm.id,false).subscribe(
        (room) => {
          this.store.dispatch(addRoom({room}));
          this.dialog.closeAll();
          let code:any = room.room_code;
          this.dialogService.confirmDialog({
            color: 'green',
            message: `Your room ${room.room_code} is created successfully`,
            load:false
          });
          this.router.navigate(["/room/"+room.room_code],{state:code});
        },
        (error) => {
          this.dialog.closeAll();
          this.dialogService.confirmDialog({
            color:"red",
            message: `Please Enroll the ${this.roomForm.value.sheetForm.sheet_name} sheet first`,
            id:this.roomForm.value.sheetForm.id,
            load:false,
            createRoom:true,
            enroll:true
          });
        }
      );
    }
  }
}
