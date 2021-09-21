import { trigger } from '@angular/animations';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/model/question.model';


@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss'],

})
export class SheetComponent implements OnInit {

  @Input() question!:Question;
  constructor() { }

  ngOnInit(): void {
  }

}




