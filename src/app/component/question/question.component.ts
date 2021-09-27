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
  strike = false;
  flag= false;
  alreadyClicked = false;

  @Input()personal!:boolean;

  constructor(private roomService: RoomService) {
    setTimeout(() => {
      // this.strike = this.question.status;
      for(let i of this.question.status){
        if(i==3){
          this.strike=true;
        }
        if(i==2){
          this.flag=true;
        }
      }
    }, 50);
  }

  ngOnInit(): void {}

  moveToDone(questionId: number, status: number) {
    if (this.alreadyClicked == false) {
      this.alreadyClicked = true;
      this.statusChange(status);
      this.roomService.changeStatus(questionId,  this.valueChecker()).subscribe(
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
      this.roomService.changeStatus(questionId, this.valueChecker()).subscribe(
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
    if(status==1&&this.strike==false){
      this.strike=true;
    }
    else if(status==3&&this.strike==true){
      this.strike=false;
    }
    else if(status==2&&this.flag==true){
      this.flag= false;
    }
    else if(status==2){
      this.flag = true;
    }
    else if(status==3){
      this.strike= true;
    }

  }

  valueChecker(){
    let arr=[];
    if(this.strike==true){
      arr.push(3);
    }
    else{
      arr.push(1);
    }
    if(this.flag==true) arr.push(2);
    return arr;
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
