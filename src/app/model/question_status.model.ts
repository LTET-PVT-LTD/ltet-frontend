import { Question } from "./question.model";
import { User } from "./user.model";

export interface QuestionStatus{
  id:number,
  user:User,
  question:Question,
  status:number

}
