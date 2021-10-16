import { Pipe, PipeTransform } from '@angular/core';
import { QuestionStatus } from '../model/question_status.model';

@Pipe({
  name: 'searchQuestion'
})
export class SearchQuestionPipe implements PipeTransform {

  transform(questionList:QuestionStatus[],searchValue:string): any[] {
    if(!questionList|| !searchValue){
      return questionList;
    }
    return questionList.filter(question=>question.question.question_description.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }

}
