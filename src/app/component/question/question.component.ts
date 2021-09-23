import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

import { Question } from 'src/app/model/question.model';
import { QuestionStatus } from 'src/app/model/question_status.model';
import { UserQuestion } from 'src/app/model/user_question.model';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],

})
export class QuestionComponent implements OnInit {
  @Input() question!: QuestionStatus;
  strike = 1;
  alreadyClicked = false;

  @Input()personal!:boolean;

  constructor(private roomService: RoomService) {
    setTimeout(() => {
      this.strike = this.question.status;
    }, 50);
  }

  ngOnInit(): void {}

  moveToDone(questionId: number, status: number) {
    if (this.alreadyClicked == false) {
      this.alreadyClicked = true;
      this.statusChange(status);
      this.roomService.changeStatus(questionId, this.strike).subscribe(
        (res) => {
          console.log(res);
          this.alreadyClicked = false;
        },
        (err) => {
          this.statusChange(status);
          this.alreadyClicked = false;
        }
      );
    }
  }

  moveToFlag(questionId: number, status: number) {
    if (this.alreadyClicked == false) {
      this.alreadyClicked = true;
      this.statusChange(status);
      this.roomService.changeStatus(questionId, this.strike).subscribe(
        (res) => {

          this.alreadyClicked = false;
        },
        (err) => {
          this.statusChange(status);
          this.alreadyClicked = false;
        }
      );
    }
  }

  statusChange(status:number) {
    if(status==1&&this.strike==1){
      this.strike=3;
    }
    else if(status==3&&this.strike==3){
      this.strike=1;
    }
    else if(status==2&&this.strike==2){
      this.strike= 1;
    }
    else{
      this.strike=status
    }

  }

  styleObject() {
    return {
      'text-decoration': 'line-through',

    };
  }

  colorFill(){
    return {
      'color': '#00ff84',
    };
  }
  hello(){
    console.log("hello");
  }
}
