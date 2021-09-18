import { Question } from "./question.model";
import { User } from "./user.model";

export interface Sheet{
  id:number,
  questions?:Question[],
  sheet_name: string,
  sheet_description: string,
  enrolled_users_count: number,
  enrolled_users:number[]
}
