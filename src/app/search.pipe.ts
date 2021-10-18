import { Pipe, PipeTransform } from '@angular/core';
import { QuestionComponent } from './component/question/question.component';
import { Question } from './model/question.model';
import { QuestionStatus } from './model/question_status.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(questionList: QuestionStatus[], searchValue: string): any[] {
    if(!questionList|| !searchValue){
      return questionList;
    }
    console.log(searchValue);
    return questionList.filter(question=>
      question.question.question_description.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    )
  }

}
