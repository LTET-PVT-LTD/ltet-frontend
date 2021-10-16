import { Pipe, PipeTransform } from '@angular/core';
import { QuestionStatus } from '../model/question_status.model';

@Pipe({
  name: 'searchStatus'
})
export class SearchStatusPipe implements PipeTransform {

  transform(questionList:QuestionStatus[],searchValue:number|undefined): any[] {
    if(!questionList|| !searchValue){
      return questionList;
    }


      return questionList.filter(question=>question.status.find(ele=>ele==searchValue));


  }

}
