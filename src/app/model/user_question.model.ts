import { QuestionStatus } from "./question_status.model";

export interface UserQuestion{
  user_id:number,
  user_email:string,
  questions:QuestionStatus[],
}
