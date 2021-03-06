import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addRoom, removeRoom } from 'src/app/action/room.action';
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
  styleUrls: ['./learning-container.component.scss'],
  animations:[
    trigger('rightToLeft',[

      transition(':enter', [
        query(':enter', [
          style({"transform":"translateX(100%)"}),
            stagger('300ms', [
              animate('500ms ease',   style({"transform":"translateX(0)",}),
              )
            ])
        ])
    ])
    ])
  ]

})
export class LearningContainerComponent implements OnInit, OnDestroy {
  id: any;
  userRoom!: Room;
  user!: User;
  sheet!: Sheet;
  sheets: Sheet[] = [];
  isLoading!: boolean;
  alreadySend = false;
  searchQuestion="";
  selectedCategory!:string;
  selectedStatus!:{
    num:number,
    word:string
  };
  categories=["Array","Graph"];
  status=[{num:1,word:"InComplete"},{num:2,word:"Favourite"},{num:3,word:"Done"}]
  constructor(
    private sheetService: SheetService,
    private store: Store<{ room: Room; user: User; sheet: Sheet[] }>,
    private roomService: RoomService,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private router: Router,
    public loaderService: LoaderService
  ) {

  }
  ngOnDestroy(): void {
   this.store.dispatch(removeRoom());
  }

  ngOnInit(): void {
    this.store.select('room').subscribe((room) => {
      this.userRoom = room;
    });
    this.store.select('user').subscribe((user) => {
      this.user = user;
    });
    this.roomService.isRunning.subscribe((res) => {
      this.isLoading = res;
    });

    this.store.select('sheet').subscribe((sheets) => {
      this.sheets = sheets;
      this.loadSheet();
    });
    this.roomService.allRooms().subscribe((rooms) => {
      this.store.dispatch(initialRooms({ rooms }));
    });

    this.sheetService.getSheet().subscribe((sheets) => {
      // this.store.dispatch(removeSheet());
      this.store.dispatch(initialSheets({ sheets }));
    });


  }

  loadSheet() {
    this.activatedRoute.params.subscribe((param: Params) => {
      this.id = param.id;

      for (let i = 0; i < this.sheets.length; i++) {
        if (this.sheets[i].id == this.id) {
          this.sheet = this.sheets[i];
          break;
        }
      }

      if (this.alreadySend == false) {
        this.alreadySend = true;

        this.roomService.myLearning(this.user, this.id);
      }
    });
  }

}
