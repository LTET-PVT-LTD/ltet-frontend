import { Pipe, PipeTransform } from '@angular/core';
import { QuestionStatus } from '../model/question_status.model';

@Pipe({
  name: 'searchCategory'
})
export class SearchCategoryPipe implements PipeTransform {

  transform(questionList:QuestionStatus[],searchValue:string): any[] {
    if(!questionList|| !searchValue){
      return questionList;
    }
    return questionList.filter(question=>question.question.category.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }
}
